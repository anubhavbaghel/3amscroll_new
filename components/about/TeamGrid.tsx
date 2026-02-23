import Link from "next/link";
import Image from "next/image";
import { createPublicClient } from "@/lib/supabase/server";

export async function TeamGrid() {
    const supabase = createPublicClient();

    const { data } = await supabase
        .from("profiles")
        .select("*")
        .limit(6);

    const team = data || [];


    return (
        <section className="py-24 relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-20 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-medium text-purple-600 dark:text-purple-400 mb-6">
                        <span>The Collective</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Meet the Team</h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        The voices behind the scroll. We're a diverse group of creators, techies, and culture enthusiasts who never sleep.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {team.map((member, i) => (
                        <Link
                            href={`/author/${member!.id}`}
                            key={member!.id}
                            className="group relative bg-white/50 dark:bg-dark-surface/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-200 dark:border-white/10 hover:border-brand/50 dark:hover:border-brand/50 hover:shadow-2xl hover:shadow-brand/5 transition-all duration-500 overflow-hidden"
                            style={{ animationDelay: `${i * 100}ms` }}
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-brand/0 to-brand/0 group-hover:from-brand/5 group-hover:to-purple-500/5 transition-colors duration-500" />

                            <div className="relative z-10 flex flex-col items-center text-center">
                                <div className="relative w-28 h-28 mb-6">
                                    <div className="absolute inset-0 bg-gradient-to-br from-brand to-purple-500 rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500" />
                                    <Image
                                        src={member!.avatar}
                                        alt={member!.name}
                                        fill
                                        className="rounded-full object-cover border-4 border-white dark:border-dark-bg group-hover:scale-105 transition-transform duration-500 relative z-10"
                                    />
                                </div>

                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-brand transition-colors duration-300">
                                    {member!.name}
                                </h3>
                                <p className="text-sm font-medium text-brand dark:text-blue-400 mb-6 uppercase tracking-wider">
                                    {member!.role || "Contributor"}
                                </p>

                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-3">
                                    {member!.bio}
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
