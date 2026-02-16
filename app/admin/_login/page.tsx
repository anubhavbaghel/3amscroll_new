import { login } from "../../auth/actions";
import Link from "next/link";

export default async function AdminLoginPage({ searchParams }: { searchParams?: Promise<{ error?: string }> }) {
    // Await searchParams as per Next.js 15
    const params = searchParams ? await searchParams : {};
    const error = params.error;

    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2 bg-gray-900">
            <div className="w-full max-w-md space-y-8 px-4">
                <div className="text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white">
                        Admin Access
                    </h2>
                    <p className="mt-2 text-sm text-gray-400">
                        Secure area. Authorized personnel only.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-900/50 border border-red-900 text-red-200 p-3 rounded-md text-sm text-center">
                        {error}
                    </div>
                )}

                <form className="mt-8 space-y-6">
                    <input type="hidden" name="redirectTo" value="/admin" />

                    <div className="-space-y-px rounded-md shadow-sm">
                        <div>
                            <label htmlFor="email-address" className="sr-only">
                                Email address
                            </label>
                            <input
                                id="email-address"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                className="relative block w-full rounded-t-md border-0 py-1.5 bg-gray-800 text-white ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                placeholder="Admin Email"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="relative block w-full rounded-b-md border-0 py-1.5 bg-gray-800 text-white ring-1 ring-inset ring-gray-700 placeholder:text-gray-500 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 px-3"
                                placeholder="Password"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <button
                            formAction={login}
                            className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Enter Dashboard
                        </button>
                        <Link href="/" className="text-center text-sm text-gray-500 hover:text-gray-400">
                            Back to Site
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
