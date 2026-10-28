import { createServerSupabase } from "@/lib/supabase-server";
import Link from "next/link";

export default async function StudentsPage() {
  const supabase = createServerSupabase();
  const { data: students } = await supabase.from("students").select("*, classes(name)").order("created_at", { ascending: false });
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Élèves</h1>
        <Link href="/dashboard/students/new" className="btn btn-primary">+ Nouvel élève</Link>
      </div>
      <div className="card overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left border-b">
            <tr><th className="py-2">ID</th><th>Nom</th><th>Classe</th><th>Parent</th><th>Statut</th><th></th></tr>
          </thead>
          <tbody>
            {students?.map((s) => (
              <tr key={s.id} className="border-b last:border-0">
                <td className="py-2 font-mono text-xs">{s.student_number}</td>
                <td>{s.full_name}</td>
                <td>{s.classes?.name ?? "—"}</td>
                <td>{s.parent_phone ?? "—"}</td>
                <td><span className="px-2 py-1 rounded text-xs bg-green-50 text-green-700">{s.status}</span></td>
                <td><Link href={"/dashboard/students/" + s.id} className="text-primary">Voir</Link></td>
              </tr>
            ))}
            {!students?.length && <tr><td colSpan="6" className="py-8 text-center text-slate-500">Aucun élève enregistré.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
