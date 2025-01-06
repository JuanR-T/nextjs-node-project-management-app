import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { DashboardWrapper } from "./dashboardWrapper";
import "./globals.css";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MindHive",
  description: "MindHive is a project management app",
  icons: "https://project-management-mind-hive-s3-images.s3.eu-west-3.amazonaws.com/logo.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={inter.className}
      >
        <DashboardWrapper>
          {children}
        </DashboardWrapper>
      </body>
    </html>
  );
}
