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
                    We may collect personal information such as your name, email address, and profile information when you register an account.
                </p>

                <h2>2. How We Use Your Information</h2>
                <p>
                    We use your information to provide and improve our services, personalize your experience, and communicate with you.
                </p>

                <h2>3. Data Security</h2>
                <p>
                    We implement appropriate security measures to protect your personal data from unauthorized access or disclosure.
                </p>

                <h2>4. Contact Us</h2>
                <p>
                    If you have any questions about this Privacy Policy, please contact us.
                </p>
            </div>
        </div>
    );
}
