const https = require('https');
const fs = require('fs');
const path = require('path');

// Extract API Key from .env.local
const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/GOOGLE_GEMINI_API_KEY=(.*)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null;

console.log("Testing Gemini Key:", apiKey ? "Found" : "Missing");

if (!apiKey) process.exit(1);

async function testEndpoint(version, model) {
    console.log(`\nTesting version: ${version}, model: ${model}`);
    const data = JSON.stringify({
        contents: [{ parts: [{ text: "say test" }] }]
    });

    const options = {
        hostname: 'generativelanguage.googleapis.com',
        port: 443,
        path: `/${version}/models/${model}:generateContent?key=${apiKey}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        }
    };

    return new Promise((resolve) => {
        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (d) => body += d);
            res.on('end', () => {
                console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
                if (res.statusCode !== 200) {
                    console.log("Error Body:", body);
                } else {
                    console.log("Success!");
                }
                resolve(res.statusCode);
            });
        });
        req.on('error', (e) => {
            console.error("Request Error:", e.message);
            resolve(500);
        });
        req.write(data);
        req.end();
    });
}

async function runTests() {
    await testEndpoint('v1', 'gemini-1.5-flash');
    await testEndpoint('v1beta', 'gemini-1.5-flash');
    await testEndpoint('v1beta', 'gemini-pro');
}

runTests();
