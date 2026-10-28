"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function NewStudent() {
  const [form, setForm] = useState({ full_name: "", date_of_birth: "", gender: "male", parent_phone: "", address: "", medical_info: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function submit(e) {
    e.preventDefault(); setLoading(true); setError("");
    const student_number = "STU-" + Date.now().toString().slice(-8);
    const { error } = await supabase.from("students").insert({ ...form, student_number });
    setLoading(false);
    if (error) return setError(error.message);
    router.push("/dashboard/students");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="card max-w-2xl space-y-4">
      <h1 className="text-2xl font-bold">Nouvel élève</h1>
      {error && <div className="bg-red-50 text-red-700 p-3 rounded text-sm">{error}</div>}
      <div><label className="label">Nom complet *</label>
        <input required className="input" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></div>
      <div className="grid grid-cols-2 gap-4">
        <div><label className="label">Date de naissance</label>
          <input type="date" className="input" value={form.date_of_birth} onChange={(e) => setForm({ ...form, date_of_birth: e.target.value })} /></div>
        <div><label className="label">Genre</label>
          <select className="input" value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })}>
            <option value="male">Masculin</option><option value="female">Féminin</option>
          </select></div>
      </div>
      <div><label className="label">Téléphone parent</label>
        <input className="input" value={form.parent_phone} onChange={(e) => setForm({ ...form, parent_phone: e.target.value })} /></div>
      <div><label className="label">Adresse</label>
        <input className="input" value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} /></div>
      <div><label className="label">Infos médicales</label>
        <textarea className="input" rows={2} value={form.medical_info} onChange={(e) => setForm({ ...form, medical_info: e.target.value })} /></div>
      <div className="flex gap-3">
        <button disabled={loading} className="btn btn-primary">{loading ? "Enregistrement..." : "Enregistrer"}</button>
        <button type="button" onClick={() => router.back()} className="btn btn-outline">Annuler</button>
      </div>
    </form>
  );
}
