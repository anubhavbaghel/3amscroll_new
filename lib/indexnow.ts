const HOST = "3amscroll.com";
const KEY = "36042a057af34398a3d0e28c15b48138";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

export async function submitToIndexNow(urls: string[]) {
    try {
        const response = await fetch("https://www.bing.com/indexnow", {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                host: HOST,
                key: KEY,
                keyLocation: KEY_LOCATION,
                urlList: urls,
            }),
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error(`IndexNow submission failed: ${response.status} ${errorText}`);
            return { success: false, status: response.status };
        }

        console.log(`IndexNow submission successful for ${urls.length} URLs`);
        return { success: true };
    } catch (error) {
        console.error("Error submitting to IndexNow:", error);
        return { success: false, error };
    }
}
