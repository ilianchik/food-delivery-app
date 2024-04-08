import { AppProvider } from "@/components/AppContext";
import Header from "@/components/layout/Header";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import TanstackProvider from "@/components/TanstackProvider";

const outfit = Outfit({ subsets: ["latin"], weight: ["400", "500", "700"] });

export const metadata = {
  title: "YumYard",
  description: "Order food with YumYard!",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className="scroll-smooth custom-scrollbar overflow-x-hidden"
    >
      <body className={outfit.className}>
        <main className="max-w-7xl mx-auto p-4 h-screen grid grid-rows-[auto_1fr_auto]">
          <TanstackProvider>
            <AppProvider>
              <Toaster />
              <Header />
              <div className="max-w-7xl">{children}</div>
              <footer className="border-t p-8 text-sm md:text-base text-center text-gray-500 mt-8 md:mt-16">
                &copy; 2024 All rights reserved
              </footer>
            </AppProvider>
          </TanstackProvider>
        </main>
      </body>
    </html>
  );
}
