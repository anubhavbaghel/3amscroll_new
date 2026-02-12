import { Footer } from "@/components/layout/Footer";
import { TeamGrid } from "@/components/about/TeamGrid";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-black">

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
