import { Footer } from "@/components/layout/Footer";
import { Metadata } from "next";
import { Zap, Rocket, Users, Shield, Eye, Flame, X } from "lucide-react";

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

                {/* Our Story Section */}
                <section className="py-24 border-t border-gray-100 dark:border-white/5 relative bg-gray-50/30 dark:bg-white/[0.02]">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex flex-col md:flex-row gap-12 items-center">
                            <div className="flex-1 space-y-6">
                                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">How it started.</h2>
                                <div className="space-y-4 text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                                    <p>
                                        It began exactly as you&apos;d expect: diving down a digital rabbit hole at 3:00 AM. We realized that the internet had become incredibly noisy, filled with clickbait, corporate jargon, and endless algorithmic fluff.
                                    </p>
                                    <p>
                                        We didn&apos;t just want to endlessly scroll anymore; we wanted to consume content that actually respected our intelligence and matched our pace.
                                    </p>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        So, we built the sanctuary we couldn&apos;t find.
                                    </p>
                                    <p>
                                        3AM SCROLL is for the makers, the nocturnal thinkers, and the permanently curious. We filter out the static so you can focus on the signal.
                                    </p>
                                </div>
                            </div>

                            <div className="flex-1 relative w-full aspect-square md:aspect-auto md:h-[400px] rounded-3xl overflow-hidden shadow-2xl shadow-brand/10 border border-white/10 group">
                                <div className="absolute inset-0 bg-gradient-to-br from-brand/20 to-purple-600/20 mix-blend-overlay z-10" />
                                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500 z-0" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-24 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Built Different</h2>
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                                We&apos;re ripping up the playbook of traditional media to bring you news you actually care about.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {[
                                {
                                    title: "Unfiltered",
                                    desc: "No corporate fluff. We speak your language and cover stories with the authenticity you deserve.",
                                    bg: "bg-blue-500/10",
                                    border: "hover:border-blue-500/30",
                                    glow: "group-hover:bg-blue-500/10",
                                    icon: <Zap className="w-6 h-6 text-blue-500" />
                                },
                                {
                                    title: "Future-Focused",
                                    desc: "From AI to climate tech, we're obsessed with what's next and how it shapes our reality.",
                                    bg: "bg-purple-500/10",
                                    border: "hover:border-purple-500/30",
                                    glow: "group-hover:bg-purple-500/10",
                                    icon: <Rocket className="w-6 h-6 text-purple-500" />
                                },
                                {
                                    title: "Community-Driven",
                                    desc: "We're not just a platform; we're a collective. Your voice shapes exactly what we cover.",
                                    bg: "bg-brand/10",
                                    border: "hover:border-brand/30",
                                    glow: "group-hover:bg-brand/10",
                                    icon: <Users className="w-6 h-6 text-brand" />
                                }
                            ].map((val, i) => (
                                <div key={i} className={`group relative p-8 rounded-3xl bg-gray-50/50 dark:bg-dark-surface/50 border border-gray-100 dark:border-white/5 ${val.border} transition-all duration-300 overflow-hidden`}>
                                    <div className={`absolute inset-0 transition-colors duration-500 ${val.glow} opacity-0 group-hover:opacity-100`} />
                                    <div className="relative z-10">
                                        <div className={`w-14 h-14 rounded-2xl ${val.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                            {val.icon}
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

                {/* The Manifesto Section */}
                <section className="py-24 relative">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">The Manifesto</h2>
                            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg">
                                We drew a line in the digital sand. Here is exactly what we stand for.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {/* What we believe */}
                            <div className="p-8 md:p-12 rounded-3xl bg-gray-50 dark:bg-dark-surface/30 border border-gray-100 dark:border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <Flame className="w-24 h-24 text-brand" />
                                </div>
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
                                    <Shield className="w-6 h-6 text-brand" />
                                    We Believe In
                                </h3>
                                <ul className="space-y-4 text-gray-600 dark:text-gray-400 text-lg relative z-10">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2.5 flex-shrink-0" />
                                        <span>Deep dives over surface-level skimming.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2.5 flex-shrink-0" />
                                        <span>Authentic voices, not perfectly polished PR speak.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2.5 flex-shrink-0" />
                                        <span>Respecting your time and your intelligence.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2.5 flex-shrink-0" />
                                        <span>Building a community of curious, nocturnal thinkers.</span>
                                    </li>
                                </ul>
                            </div>

                            {/* What we reject */}
                            <div className="p-8 md:p-12 rounded-3xl bg-gray-50 dark:bg-dark-surface/30 border border-gray-100 dark:border-white/5 relative overflow-hidden group">
                                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                                    <X className="w-24 h-24 text-red-500" />
                                </div>
                                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-red-500">
                                    <Eye className="w-6 h-6" />
                                    We Reject
                                </h3>
                                <ul className="space-y-4 text-gray-600 dark:text-gray-400 text-lg relative z-10">
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 flex-shrink-0" />
                                        <span>Rage-bait algorithms designed to make you angry.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 flex-shrink-0" />
                                        <span>Clickbait headlines that don&apos;t deliver.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 flex-shrink-0" />
                                        <span>Mindless, doom-scrolling content loops.</span>
                                    </li>
                                    <li className="flex items-start gap-3">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2.5 flex-shrink-0" />
                                        <span>Corporate jargon and sponsored stealth-ads.</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* The Process Section */}
                <section className="py-24 border-t border-gray-100 dark:border-white/5 relative bg-gradient-to-b from-transparent to-gray-50/50 dark:to-brand/5">
                    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand/10 text-brand mb-8">
                            <Eye className="w-8 h-8" />
                        </div>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-8">Our Process is Simple.</h2>
                        <div className="text-lg md:text-xl text-gray-600 dark:text-gray-400 leading-relaxed space-y-6 max-w-3xl mx-auto">
                            <p>
                                We don&apos;t use automated bots to scrape the internet. Every single article, guide, and story you see on 3AM SCROLL has been read, vetted, and hand-selected by a human who cares about the culture just as much as you do.
                            </p>
                            <p className="font-medium text-gray-900 dark:text-white">
                                If we wouldn&apos;t send it to our own group chat at 3:00 AM, we won&apos;t put it on the site.
                            </p>
                            <p>
                                Welcome to the sanctuary.
                            </p>
                        </div>
                    </div>
                </section>

            </main>

            <Footer />
        </div>
    );
}
