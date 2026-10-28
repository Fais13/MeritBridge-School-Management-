import "./globals.css";

export const metadata = { title: "SMS Cameroun" };

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body className="bg-slate-50 text-slate-800">{children}</body>
    </html>
  );
}
