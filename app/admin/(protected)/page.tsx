import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function AdminPage() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    // Fetch all articles (including drafts) order by created_at desc
    const { data: articles, error } = await supabase
        .from("articles")
        .select("*")
        .order("created_at", { ascending: false });

    if (error) {
        console.error("Error fetching admin articles:", error);
        return <div className="p-8">Error loading articles.</div>;
    }

    // Server Actions for Publishing/Deleting
    async function updateStatus(formData: FormData) {
        "use server";
        const id = formData.get("id") as string;
        const status = formData.get("status") as string;

        const supabase = await createClient();
        await supabase.from("articles").update({ status }).eq("id", id);
        revalidatePath("/admin");
        revalidatePath("/");
    }

    async function deleteArticle(formData: FormData) {
        "use server";
        const id = formData.get("id") as string;

        const supabase = await createClient();
        await supabase.from("articles").delete().eq("id", id);
        revalidatePath("/admin");
        revalidatePath("/");
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-black py-8">
            <div className="max-w-7xl mx-auto px-4 lg:px-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Content Dashboard</h1>
                        <div className="text-sm text-gray-500 mt-1">
                            Logged in as: {user.email}
                        </div>
                    </div>
                    <Link
                        href="/admin/articles/new"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Create New Article
                    </Link>
                </div>

                {/* Mobile Card View */}
                <div className="grid grid-cols-1 gap-4 md:hidden">
                    {articles?.map((article) => (
                        <div key={article.id} className="bg-white dark:bg-gray-900 shadow rounded-lg p-4 space-y-4">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className="flex-shrink-0 h-12 w-12 relative rounded overflow-hidden">
                                        <Image src={article.cover_image} alt="" fill className="object-cover" />
                                    </div>
                                    <div>
                                        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1" title={article.title}>
                                            {article.title}
                                        </div>
                                        <div className="text-xs text-gray-500">
                                            {new Date(article.created_at).toLocaleDateString()}
                                        </div>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${article.status === 'published'
                                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                    }`}>
                                    {article.status || 'published'}
                                </span>
                            </div>

                            <div className="text-sm text-gray-500">
                                <span className="font-medium">Category:</span> {article.category}
                            </div>

                            <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-800 pt-4">
                                <div className="flex items-center gap-3">
                                    <Link href={`/article/${article.slug}`} className="text-indigo-600 hover:text-indigo-900 text-sm" target="_blank">
                                        View
                                    </Link>
                                    <Link href={`/admin/articles/${article.id}/edit`} className="text-blue-600 hover:text-blue-900 text-sm">
                                        Edit
                                    </Link>
                                </div>

                                <div className="flex items-center gap-2">
                                    <form action={updateStatus}>
                                        <input type="hidden" name="id" value={article.id} />
                                        <input type="hidden" name="status" value={article.status === 'published' ? 'draft' : 'published'} />
                                        <button
                                            type="submit"
                                            className={`text-xs px-3 py-1 rounded border ${article.status === 'published'
                                                ? 'border-yellow-500 text-yellow-600 hover:bg-yellow-50'
                                                : 'border-green-500 text-green-600 hover:bg-green-50'
                                                }`}
                                        >
                                            {article.status === 'published' ? 'Unpublish' : 'Publish'}
                                        </button>
                                    </form>

                                    <form action={deleteArticle}>
                                        <input type="hidden" name="id" value={article.id} />
                                        <button type="submit" className="text-red-600 hover:text-red-900 text-sm">
                                            Delete
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Desktop Table View */}
                <div className="hidden md:block bg-white dark:bg-gray-900 rounded-lg shadow overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Status
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Article
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date
                                </th>
                                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                            {articles?.map((article) => (
                                <tr key={article.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${article.status === 'published'
                                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                            }`}>
                                            {article.status || 'published'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0 h-10 w-10 relative rounded overflow-hidden">
                                                <Image src={article.cover_image} alt="" fill className="object-cover" />
                                            </div>
                                            <div className="ml-4">
                                                <div className="text-sm font-medium text-gray-900 dark:text-gray-100 line-clamp-1 max-w-xs" title={article.title}>
                                                    {article.title}
                                                </div>
                                                <div className="text-sm text-gray-500 truncate max-w-xs">
                                                    {article.slug}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {article.category}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {new Date(article.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <div className="flex items-center justify-end gap-2">
                                            {/* Toggle Publish */}
                                            <form action={updateStatus}>
                                                <input type="hidden" name="id" value={article.id} />
                                                <input type="hidden" name="status" value={article.status === 'published' ? 'draft' : 'published'} />
                                                <button
                                                    type="submit"
                                                    className={`text-xs px-3 py-1 rounded border ${article.status === 'published'
                                                        ? 'border-yellow-500 text-yellow-600 hover:bg-yellow-50'
                                                        : 'border-green-500 text-green-600 hover:bg-green-50'
                                                        }`}
                                                >
                                                    {article.status === 'published' ? 'Unpublish' : 'Publish'}
                                                </button>
                                            </form>

                                            {/* Preview Link */}
                                            <Link href={`/article/${article.slug}`} className="text-indigo-600 hover:text-indigo-900 px-2" target="_blank">
                                                View
                                            </Link>

                                            {/* Edit Link */}
                                            <Link href={`/admin/articles/${article.id}/edit`} className="text-blue-600 hover:text-blue-900 px-2">
                                                Edit
                                            </Link>

                                            {/* Delete */}
                                            <form action={deleteArticle}>
                                                <input type="hidden" name="id" value={article.id} />
                                                <button type="submit" className="text-red-600 hover:text-red-900 px-2">
                                                    Delete
                                                </button>
                                            </form>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
