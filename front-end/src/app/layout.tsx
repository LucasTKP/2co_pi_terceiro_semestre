import '../../style/globals.css'
import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import NextAuthConfig from './(PageInitial)/nextAuthConfig'
import User from './context/user'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
})

const poppins = Poppins({
  display: "auto",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: 'Organize suas tarefas',
  description: 'Organize suas tarefas',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body className={`${inter.variable} ${poppins.variable} font-inter text-white`}>
        <User>
          <NextAuthConfig>
            {children}
          </NextAuthConfig>
        </User>
      </body>
    </html>
  )
}
