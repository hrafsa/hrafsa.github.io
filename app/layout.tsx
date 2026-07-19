import type { Metadata } from "next";
import { Archivo_Black, IBM_Plex_Sans, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./tailwind.css";

const archivoBlack = Archivo_Black({
  variable: "--font-archivo-black",
  subsets: ["latin"],
  weight: "400",
});

const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hashemi Rafsa Alfatih | Web Developer",
  description: "Portfolio of Hashemi Rafsa Alfatih, a web developer based in Jakarta, Indonesia.",
};

const themeInitializer = `
  (() => {
    try {
      const saved = localStorage.getItem("portfolio-theme");
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const theme = saved === "light" || saved === "dark" ? saved : systemDark ? "dark" : "light";
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme;
    } catch (_) {
      document.documentElement.dataset.theme = "light";
      document.documentElement.style.colorScheme = "light";
    }
  })();
`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${archivoBlack.variable} ${ibmPlexSans.variable} ${jetBrainsMono.variable}`}
    >
      <body>
        <Script id="theme-initializer" strategy="beforeInteractive">
          {themeInitializer}
        </Script>
        {children}
      </body>
    </html>
  );
}
