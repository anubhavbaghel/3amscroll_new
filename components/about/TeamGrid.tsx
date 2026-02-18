import Link from "next/link";
import Image from "next/image";
import { getAuthor } from "@/lib/data";

const TEAM_IDS = ["711d5fbc-e448-433e-b873-1382dfa54823"]; // Add more real UUIDs as needed

export async function TeamGrid() {
    const teamResults = await Promise.all(TEAM_IDS.map(id => getAuthor(id)));
    const team = teamResults.filter(Boolean);

    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-900/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl font-bold mb-4">Meet the Team</h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        The voices behind the scroll. We&apos;re a diverse group of creators, techies, and culture enthusiasts.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {team.map((member) => (
                        <Link
                            href={`/author/${member!.id}`}
                            key={member!.id}
                            className="group bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:border-blue-500/30 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-16 flex-shrink-0">
                                    <Image
                                        src={member!.avatar}
                                        alt={member!.name}
                                        fill
                                        className="rounded-full object-cover group-hover:scale-105 transition-transform"
                                    />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                        {member!.name}
                                    </h3>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        {member!.role || "Contributor"}
                                    </p>
                                </div>
                            </div>
                            <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                                {member!.bio}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}
