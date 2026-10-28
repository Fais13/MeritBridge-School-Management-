import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-amber-50">
      <div className="text-center max-w-2xl p-8">
        <h1 className="text-5xl font-bold text-primary mb-4">SMS Cameroun</h1>
        <p className="text-xl text-slate-600 mb-8">Système de Gestion Scolaire · School Management System</p>
        <div className="flex gap-4 justify-center">
          <Link href="/login" className="btn btn-primary">Se connecter</Link>
          <Link href="/register" className="btn btn-outline">Créer un compte</Link>
        </div>
      </div>
    </div>
  );
}
