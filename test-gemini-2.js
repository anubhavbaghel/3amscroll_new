const https = require('https');
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env.local');
const envContent = fs.readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/GOOGLE_GEMINI_API_KEY=(.*)/);
const apiKey = apiKeyMatch ? apiKeyMatch[1].trim() : null;

if (!apiKey) process.exit(1);

async function testModel(model) {
    console.log(`Testing model: ${model}`);
    const data = JSON.stringify({
        contents: [{ parts: [{ text: "say test" }] }]
    });

    const options = {
        hostname: 'generativelanguage.googleapis.com',
        port: 443,
        path: `/v1beta/models/${model}:generateContent?key=${apiKey}`,
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
                if (res.statusCode === 200) {
                    console.log("Success!");
                }
                resolve();
            });
        });
        req.on('error', (e) => resolve());
        req.write(data);
        req.end();
    });
}

testModel('gemini-2.0-flash');
