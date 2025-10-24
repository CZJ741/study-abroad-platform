import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans, Roboto } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/auth-provider"

const notoSans = Noto_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-noto-sans",
  weight: ["400", "600", "700"],
})

const roboto = Roboto({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-roboto",
  weight: ["400", "500", "700"],
})

export const metadata: Metadata = {
  title: "Study in China - Find Your Perfect Chinese Education",
  description:
    "Discover courses, universities, scholarships and guidance for studying in China. Your gateway to Chinese education opportunities.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${notoSans.variable} ${roboto.variable} antialiased`}>
      <body className="font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
