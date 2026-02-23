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

async function listModels() {
    console.log(`\nListing models...`);
    const options = {
        hostname: 'generativelanguage.googleapis.com',
        port: 443,
        path: `/v1beta/models?key=${apiKey}`,
        method: 'GET'
    };

    return new Promise((resolve) => {
        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (d) => body += d);
            res.on('end', () => {
                console.log(`Status: ${res.statusCode} ${res.statusMessage}`);
                if (res.statusCode === 200) {
                    const data = JSON.parse(body);
                    data.models.forEach(m => console.log(`- ${m.name} (${m.displayName})`));
                } else {
                    console.log("Error Body:", body);
                }
                resolve();
            });
        });
        req.on('error', (e) => {
            console.error("Request Error:", e.message);
            resolve();
        });
        req.end();
    });
}

listModels();
