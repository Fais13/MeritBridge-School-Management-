import { createServerSupabase } from "@/lib/supabase-server";

export default async function DashboardPage() {
  const supabase = createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from("users").select("*, schools(*)").eq("id", user.id).single();
  const [{ count: students }, { count: classes }, { count: announcements }] = await Promise.all([
    supabase.from("students").select("*", { count: "exact", head: true }),
    supabase.from("classes").select("*", { count: "exact", head: true }),
    supabase.from("announcements").select("*", { count: "exact", head: true }),
  ]);
  const cards = [
    { label: "Élèves", value: students ?? 0, color: "bg-teal-500" },
    { label: "Classes", value: classes ?? 0, color: "bg-amber-500" },
    { label: "Annonces", value: announcements ?? 0, color: "bg-blue-500" },
    { label: "Statut", value: profile.schools?.subscription_status ?? "—", color: "bg-purple-500" },
  ];
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Bienvenue, {profile.full_name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="card">
            <div className={"w-12 h-12 rounded-lg mb-3 " + c.color} />
            <p className="text-slate-500 text-sm">{c.label}</p>
            <p className="text-3xl font-bold">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
