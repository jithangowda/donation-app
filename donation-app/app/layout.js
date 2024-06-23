import { Epilogue } from "next/font/google";
import "./globals.css";
import Provider from "./Provider";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

const epilogue = Epilogue({ subsets: ["latin"] });

export const metadata = {
  title: "donation-app",
  description: "6th Sem MiniProject",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={` ${epilogue.className}  ${
            process.env.NODE_ENV == "development" ? "debug-screens" : ""
          }`} //only during development it will show debug screen at bottom left
        >
          <Provider>{children}</Provider>
        </body>
      </html>
    </ClerkProvider>
  );
}
