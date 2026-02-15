"use client";

import { Turnstile } from "@marsidev/react-turnstile";
import { useState } from "react";

export function TurnstileWidget() {
    const [token, setToken] = useState<string>("");

    return (
        <div className="hidden">
            <input type="hidden" name="turnstileToken" value={token} />
            <Turnstile
                siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
                onSuccess={(token) => setToken(token)}
                onError={() => setToken("")}
                onExpire={() => setToken("")}
                options={{
                    theme: "auto",
                    size: "invisible",
                }}
            />
        </div>
    );
}
