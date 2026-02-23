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
            {/* Ambient Background Glows */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-brand/10 dark:bg-brand/20 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none opacity-50 dark:opacity-30" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full mix-blend-multiply dark:mix-blend-screen pointer-events-none" />

            <main className="relative z-10">
                {/* Hero Section */}
                <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 text-center max-w-5xl mx-auto">
                    <div className="animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-medium text-brand dark:text-blue-400 mb-8">
                            <span>Our Story</span>
                        </div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 font-display leading-[1.1]">
                            We are <br className="hidden md:block" />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand to-purple-600 dark:to-purple-400">
                                3AM SCROLL.
                            </span>
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
                            A digital sanctuary for the sleepless generation. We curate the internet&apos;s noise into signals that matter.
                        </p>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-24 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Built Different</h2>
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                                We're ripping up the playbook of traditional media to bring you news you actually care about.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Unfiltered",
                                    desc: "No corporate fluff. We speak your language and cover stories with the authenticity you deserve.",
                                    bg: "bg-blue-500/10",
                                    border: "hover:border-blue-500/30",
                                    glow: "group-hover:bg-blue-500/10"
                                },
                                {
                                    title: "Future-Focused",
                                    desc: "From AI to climate tech, we're obsessed with what's next and how it shapes our reality.",
                                    bg: "bg-purple-500/10",
                                    border: "hover:border-purple-500/30",
                                    glow: "group-hover:bg-purple-500/10"
                                },
                                {
                                    title: "Community-Driven",
                                    desc: "We're not just a platform; we're a collective. Your voice shapes exactly what we cover.",
                                    bg: "bg-brand/10",
                                    border: "hover:border-brand/30",
                                    glow: "group-hover:bg-brand/10"
                                }
                            ].map((val, i) => (
                                <div key={i} className={`group relative p-8 rounded-3xl bg-gray-50/50 dark:bg-dark-surface/50 border border-gray-100 dark:border-white/5 ${val.border} transition-all duration-300 overflow-hidden`}>
                                    <div className={`absolute inset-0 transition-colors duration-500 ${val.glow} opacity-0 group-hover:opacity-100`} />
                                    <div className="relative z-10">
                                        <div className={`w-14 h-14 rounded-2xl ${val.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            <div className="w-6 h-6 bg-current opacity-50 rounded-lg" />
                                        </div>
                                        <h3 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">{val.title}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-lg">
                                            {val.desc}
                                        </p>
                                    </div>
                                </div>
                            ))}
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
