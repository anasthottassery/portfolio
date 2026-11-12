import ThemeRegistry from "@/components/themeRegistry";
import "./globals.css";
import NavbarLoader from "@/components/NavbarLoader";
// import DevHumorDialog from "@/components/DevHumorDialog";
import SmoothScroll from "@/components/SmoothScroll";


export const metadata = {
  metadataBase: new URL("https://anasthottassery.dev"),

  title: "Mohammed Anas Thottassery | Software Developer",

  description:
    "Explore the portfolio of Mohammed Anas Thottassery, a software developer building full-stack web applications with React, Next.js, Node.js, and MongoDB.",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    title: "Mohammed Anas Thottassery | Software Developer",
    description:
      "Explore my projects, technical skills, and experience in full-stack web development.",
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
            {/* <DevHumorDialog /> */}
            <NavbarLoader />
            <main>{children}</main>
          </ThemeRegistry>
        </SmoothScroll>
      </body>
    </html>
  );
}