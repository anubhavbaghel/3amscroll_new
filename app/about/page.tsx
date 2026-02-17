import { Footer } from "@/components/layout/Footer";
import { TeamGrid } from "@/components/about/TeamGrid";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us - Meet the Team",
    description: "We are 3AM SCROLL - a digital sanctuary for the sleepless generation. Learn about our mission to curate the internet's noise into signals that matter for Gen Z.",
    openGraph: {
        title: "About 3AM SCROLL - Meet the Team",
        description: "A digital sanctuary for the sleepless generation. We curate the internet's noise into signals that matter.",
        url: "https://3amscroll.com/about",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "About 3AM SCROLL - Meet the Team",
        description: "A digital sanctuary for the sleepless generation. We curate the internet's noise into signals that matter.",
    },
    alternates: {
        canonical: "https://3amscroll.com/about",
    },
};

export default function AboutPage() {
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "What is 3AM SCROLL?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "3AM SCROLL is a digital sanctuary for the sleepless generation. We curate the internet's noise into signals that matter, providing news, articles, and stories specifically for Gen Z."
                }
            },
            {
                "@type": "Question",
                "name": "What makes 3AM SCROLL different?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We're unfiltered, future-focused, and community-driven. We speak your language and cover stories with the authenticity Gen Z deserves, from AI to climate tech and everything in between."
                }
            },
            {
                "@type": "Question",
                "name": "What topics does 3AM SCROLL cover?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We cover tech, gaming, finance, lifestyle, travel, entertainment, creative content, world news, and career advice - all with a Gen Z perspective."
                }
            }
        ]
    };

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <main>
                {/* Hero Section */}
                <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 text-center max-w-4xl mx-auto">
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 font-display">
                        We are <span className="text-blue-600 dark:text-blue-500">3AM SCROLL</span>.
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed">
                        A digital sanctuary for the sleepless generation. We curate the internet&apos;s noise into signals that matter.
                    </p>
                </section>

                {/* Values Section */}
                <section className="py-20 border-t border-gray-100 dark:border-gray-900">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Unfiltered</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    No corporate fluff. We speak your language and cover stories with the authenticity you deserve.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Future-Focused</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    From AI to climate tech, we&apos;re obsessed with what&apos;s next and how it shapes our reality.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-4">Community-Driven</h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    We&apos;re not just a platform; we&apos;re a collective. Your voice shapes what we cover.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <TeamGrid />
            </main>

            <Footer />
        </div>
    );
}
