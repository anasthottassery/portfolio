import ThemeRegistry from "@/components/themeRegistry";
import "./globals.css";
import NavbarLoader from "@/components/NavbarLoader";
import SmoothScroll from "@/components/SmoothScroll";


export const metadata = {
  metadataBase: new URL("https://anasthottassery.dev"),

  title: "Mohammed Anas Thottassery | Software Developer",

  description:
    "Explore the portfolio of Mohammed Anas Thottassery, a software developer building web and native applications, exploring software systems, and solving practical engineering problems.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Mohammed Anas Thottassery | Software Developer",
    description:
      "Explore my projects, technical work, and journey in software development — from building applications to exploring the engineering behind them.",
    url: "https://anasthottassery.dev",
    siteName: "Mohammed Anas Thottassery",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SmoothScroll>
          <ThemeRegistry>
            <NavbarLoader />
            <main>{children}</main>
          </ThemeRegistry>
        </SmoothScroll>
      </body>
    </html>
  );
}