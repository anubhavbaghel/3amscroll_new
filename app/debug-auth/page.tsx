import { createClient } from "@/lib/supabase/server";

export default async function DebugAuthPage() {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    let profile = null;
    let profileError = null;

    if (user) {
        const response = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();

        profile = response.data;
        profileError = response.error;
    }

    return (
        <div className="p-8 font-mono text-sm">
            <h1 className="text-xl font-bold mb-4">Auth Debugger</h1>

            <div className="mb-8">
                <h2 className="font-bold">Auth User</h2>
                <pre className="bg-gray-100 p-4 rounded overflow-auto">
                    {JSON.stringify({ user, authError }, null, 2)}
                </pre>
            </div>

            <div>
                <h2 className="font-bold">Profile Data</h2>
                <pre className="bg-gray-100 p-4 rounded overflow-auto">
                    {JSON.stringify({ profile, profileError }, null, 2)}
                </pre>
            </div>
        </div>
    );
}
