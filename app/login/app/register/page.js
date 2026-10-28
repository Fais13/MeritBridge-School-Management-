"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Register() {
  const [form, setForm] = useState({ full_name: "", email: "", password: "", role: "admin" });
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");
  const router = useRouter();
  const supabase = createClient();

  async function submit(e) {
    e.preventDefault(); setError(""); setMsg("");
    const { data, error } = await supabase.auth.signUp({ email: form.email, password: form.password });
    if (error) return setError(error.message);
    if (data.user) {
      await supabase.from("users").insert({
        id: data.user.id, full_name: form.full_name, email: form.email, role: form.role,
      });
    }
    setMsg("Compte créé.");
    router.push("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={submit} className="card w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center text-primary">Créer un compte</h1>
        {error && <div className="bg-red-50 text-red-700 p-3 rounded text-sm">{error}</div>}
        {msg && <div className="bg-green-50 text-green-700 p-3 rounded text-sm">{msg}</div>}
        <div><label className="label">Nom complet</label>
          <input required className="input" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} /></div>
        <div><label className="label">Email</label>
          <input type="email" required className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
        <div><label className="label">Mot de passe</label>
          <input type="password" required minLength={6} className="input" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} /></div>
        <div><label className="label">Rôle</label>
          <select className="input" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
            <option value="admin">Administrateur</option>
            <option value="teacher">Enseignant</option>
            <option value="accountant">Comptable</option>
            <option value="parent">Parent</option>
            <option value="student">Élève</option>
          </select></div>
        <button className="btn btn-primary w-full">S'inscrire</button>
      </form>
    </div>
  );
}
