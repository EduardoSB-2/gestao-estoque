import "./globals.css";

export const metadata = {
  title: "Gestão de Estoque",
  description: "Sistema de organização de estoque",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <div className="app-wrapper">
          <header style={{ padding: 12, borderBottom: "1px solid #eee" }}>
            <h1>Gestão de Estoque</h1>
          </header>
          <main style={{ padding: 16 }}>{children}</main>
        </div>
      </body>
    </html>
  );
}
