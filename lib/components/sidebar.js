"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase";

const items = [
  { href: "/dashboard", label: "Tableau de bord", icon: "📊" },
  { href: "/dashboard/students", label: "Élèves", icon: "🎓" },
  { href: "/dashboard/classes", label: "Classes", icon: "🏫" },
  { href: "/dashboard/announcements", label: "Annonces", icon: "📢" },
];

export default function Sidebar({ role }) {
  const path = usePathname();
  const router = useRouter();
  const supabase = createClient();
  async function logout() {
    await supabase.auth.signOut();
    router.push("/login");
  }
  return (
    <aside className="w-64 bg-primary text-white min-h-screen p-4 flex flex-col">
      <div className="mb-8">
        <h2 className="text-xl font-bold">SMS Cameroun</h2>
        <p className="text-xs text-teal-200 mt-1">{role}</p>
      </div>
      <nav className="flex-1 space-y-1">
        {items.map((i) => (
          <Link key={i.href} href={i.href}
            className={"block px-3 py-2 rounded-lg text-sm " + (path === i.href ? "bg-teal-700" : "hover:bg-teal-700/50")}>
            <span className="mr-2">{i.icon}</span>{i.label}
          </Link>
        ))}
      </nav>
      <button onClick={logout} className="text-sm text-teal-200 hover:text-white mt-4">← Déconnexion</button>
    </aside>
  );
}
