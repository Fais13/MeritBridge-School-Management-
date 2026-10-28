import { createServerSupabase } from "@/lib/supabase-server";

export default async function AnnouncementsPage() {
  const supabase = createServerSupabase();
  const { data } = await supabase.from("announcements").select("*").order("created_at", { ascending: false });
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Annonces</h1>
      <div className="space-y-3">
        {data?.map((a) => (
          <div key={a.id} className="card">
            <h3 className="font-semibold">{a.title}</h3>
            <p className="text-sm text-slate-600 mt-1">{a.body}</p>
            <p className="text-xs text-slate-400 mt-2">{new Date(a.created_at).toLocaleString("fr-FR")}</p>
          </div>
        ))}
        {!data?.length && <p className="text-slate-500">Aucune annonce.</p>}
      </div>
    </div>
  );
}
