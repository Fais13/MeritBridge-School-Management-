"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(""); setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) return setError(error.message);
    router.push("/dashboard");
    router.refresh();
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="card w-full max-w-md space-y-4">
        <h1 className="text-2xl font-bold text-center text-primary">Connexion</h1>
        {error && <div className="bg-red-50 text-red-700 p-3 rounded text-sm">{error}</div>}
        <div><label className="label">Email</label>
          <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="input" /></div>
        <div><label className="label">Mot de passe</label>
          <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="input" /></div>
        <button disabled={loading} className="btn btn-primary w-full">{loading ? "Connexion..." : "Se connecter"}</button>
        <p className="text-sm text-center">Pas de compte ? <Link href="/register" className="text-primary font-medium">S'inscrire</Link></p>
      </form>
    </div>
  );
          }
