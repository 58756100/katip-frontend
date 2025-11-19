// app/(public)/layout.tsx
import Navbar from "@/components/website/NavbarComponent";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar /> {/* ⬅️ Navbar goes here */}
        {children}
      </body>
    </html>
  );
}
