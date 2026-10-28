import { createServerSupabase } from "@/lib/supabase-server";
import { notFound } from "next/navigation";

export default async function StudentProfile({ params }) {
  const supabase = createServerSupabase();
  const { data: s } = await supabase.from("students").select("*, classes(name)").eq("id", params.id).single();
  if (!s) notFound();
  return (
    <div className="card max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">{s.full_name}</h1>
      <dl className="grid grid-cols-2 gap-4 text-sm">
        <div><dt className="text-slate-500">ID</dt><dd className="font-mono">{s.student_number}</dd></div>
        <div><dt className="text-slate-500">Classe</dt><dd>{s.classes?.name ?? "—"}</dd></div>
        <div><dt className="text-slate-500">Date de naissance</dt><dd>{s.date_of_birth ?? "—"}</dd></div>
        <div><dt className="text-slate-500">Genre</dt><dd>{s.gender}</dd></div>
        <div><dt className="text-slate-500">Téléphone parent</dt><dd>{s.parent_phone ?? "—"}</dd></div>
        <div><dt className="text-slate-500">Adresse</dt><dd>{s.address ?? "—"}</dd></div>
        <div><dt className="text-slate-500">Statut</dt><dd>{s.status}</dd></div>
        <div><dt className="text-slate-500">Admission</dt><dd>{s.admission_date}</dd></div>
      </dl>
    </div>
  );
}
