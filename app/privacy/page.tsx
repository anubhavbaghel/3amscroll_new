export const metadata = {
    title: "Privacy Policy | 3AM SCROLL",
    description: "Privacy Policy for 3AM SCROLL.",
};

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black pt-24 pb-20">
            <div className="max-w-3xl mx-auto px-4 py-8 prose dark:prose-invert">
                <h1 className="font-display">Privacy Policy</h1>
                <p className="lead">Last updated: {new Date().toLocaleDateString()}</p>

                <p>
                    Welcome to 3AM SCROLL. We respect your privacy and are committed to protecting your personal data.
                </p>

                <h2>1. Information We Collect</h2>
                <p>
                    We collect information you provide directly to us (e.g., account registration) and information through your use of the site (e.g., Google Analytics). This may include:
                </p>
                <ul>
                    <li>Name and email address</li>
                    <li>Profile metadata and preferences</li>
                    <li>Usage data and device information</li>
                </ul>

                <h2>2. How We Use and Share Data</h2>
                <p>
                    We use your data to maintain the service and personalize your feed. We do not sell your personal data. We may share anonymized usage stats with third-party service providers like Supabase and Google Analytics.
                </p>

                <h2>3. Your Rights</h2>
                <p>
                    You have the right to access, update, or delete your personal information at any time through your account settings.
                </p>

                <h2>4. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us.
                </p>
            </div>
        </div>
    );
}
