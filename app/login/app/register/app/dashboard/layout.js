import { createServerSupabase } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout({ children }) {
  const supabase = createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/login");
  const { data: profile } = await supabase.from("users").select("*, schools(*)").eq("id", user.id).single();
  if (!profile) redirect("/register");
  return (
    <div className="flex min-h-screen">
      <Sidebar role={profile.role} />
      <main className="flex-1 p-6 overflow-auto">{children}</main>
    </div>
  );
}
