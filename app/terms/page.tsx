export const metadata = {
    title: "Terms of Service | 3AM SCROLL",
    description: "Terms of Service for 3AM SCROLL.",
};

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black pt-24 pb-20">
            <div className="max-w-3xl mx-auto px-4 py-8 prose dark:prose-invert">
                <h1 className="font-display">Terms of Service</h1>
                <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

                <p>
                    Please read these Terms of Service carefully before using 3AM SCROLL.
                </p>

                <h2>1. Acceptance of Terms</h2>
                <p>
                    3AM SCROLL provides a platform for news and community-driven content. By creating an account or browsing the site, you acknowledge that you have read, understood, and agreed to be bound by these Terms of Service.
                </p>

                <h2>2. User Content & Conduct</h2>
                <p>
                    You are responsible for any content you post. We reserve the right to remove content that violates our community standards, including but not limited to harassment, hate speech, or intellectual property infringement.
                </p>

                <h2>3. Intellectual Property</h2>
                <p>
                    The design, logo, and original content of 3AM SCROLL are protected by copyright and trademark laws. User-submitted content remain the property of their respective authors.
                </p>

                <h2>4. Limitation of Liability</h2>
                <p>
                    3AM SCROLL is provided "as is" without any warranties. We are not liable for any damages arising from your use of the service.
                </p>
            </div>
        </div>
    );
}
