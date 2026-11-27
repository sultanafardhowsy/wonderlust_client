import "@fontsource-variable/josefin-sans";
import "@fontsource-variable/inter";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";

export const metadata = {
  title: {
    default: "Wanderlust — Discover Your Next Adventure",
    template: "%s | Wanderlust",
  },
  description:
    "Explore breathtaking destinations and book curated travel experiences with Wanderlust.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
