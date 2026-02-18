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
                    By accessing or using our service, you agree to be bound by these Terms. If you disagree with any part of the terms, you may not access the service.
                </p>

                <h2>2. User Content</h2>
                <p>
                    You retain ownership of the content you post, but you grant us a license to use, reproduce, and display it in connection with the service.
                </p>

                <h2>3. Prohibited Conduct</h2>
                <p>
                    You agree not to use the service for any unlawful purpose or to violate any laws in your jurisdiction.
                </p>

                <h2>4. Termination</h2>
                <p>
                    We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever.
                </p>
            </div>
        </div>
    );
}
