import { Inter } from "next/font/google";
import "./globals.css";
import ChatWidget from "../components/ChatWidget";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Darren D. Tan | GenAI Systems Engineer & Business Analytics",
  description: "Portfolio of Darren D. Tan, bridging project experience with AIML in Cloud Ops.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} antialiased h-full`}>
      <body className="min-h-full flex flex-col">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
