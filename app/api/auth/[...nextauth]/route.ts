import NextAuth from 'next-auth'
import { NextAuthOptions } from 'next-auth'

const authOptions: NextAuthOptions = {
  providers: [],
  pages: {
    signIn: '/',
    error: '/',
  },
  callbacks: {
    async session({ session }) {
      return session
    },
    async jwt({ token }) {
      return token
    },
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET || 'fallback-secret',
}

const handler = NextAuth(authOptions)

// Required for static export
export async function generateStaticParams() {
  return []
}

export { handler as GET, handler as POST }
