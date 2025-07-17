import environment from "@/config/environment";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWTExtended, SessionExtended, UserExtended } from "@/types/Auth";
import authServices from "@/services/auth.service";

export default NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  secret: environment.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        identifier: { label: "identifier", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(
        credentials: Record<"identifier" | "password", string> | undefined,
      ): Promise<UserExtended | null> {
        const { identifier, password } = credentials as {
          identifier: string;
          password: string;
        };

        // 1. Login untuk mendapatkan token
    const loginRes = await fetch(environment.API_URL + "/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    if (!loginRes.ok) {
      const error = await loginRes.json();
      throw new Error(error.message || "Login failed");
    }

    const { token, user } = await loginRes.json();

    // 2. Return object sesuai kebutuhan NextAuth
    return {
      id: user._id,
      email: user.email,
      role: user.role,
      accessToken: token, // Wajib ada
      name: user.fullName // Optional
    };

        // const result = await authServices.login({
        //   identifier,
        //   password,
        // });

        // const accessToken = result.data.data;

        // const me = await authServices.getProfileWithToken(accessToken);
        // const user = me.data.data;

        // if (
        //   accessToken &&
        //   result.status === 200 &&
        //   user._id &&
        //   me.status === 200
        // ) {
        //   user.accessToken = accessToken;
        //   return user;
        // } else {
        //   return null;
        // }
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
    }: {
      token: JWTExtended;
      user: UserExtended | null;
    }) {
      if (user) {
        // token.user = user;
        token.accessToken = user.accessToken;
      token.role = user.role;
      }

      return token;
    },
    async session({
      session,
      token,
    }: {
      session: SessionExtended;
      token: JWTExtended;
    }) {
      session.user = token.user;
      session.accessToken = token.user?.accessToken;
      return session;
    },
  },
});
