import GoogleProvider from "next-auth/providers/google";
import connectDB from "@/config/database";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    })
  ],
  callbacks: {
    // Invoked on successful signin
    async signIn({ profile }) {
      console.log("signed In");
      await connectDB();
      const userExists = await User.findOne({ email: profile.email });
      if (!userExists) {
        // Truncate user name if too long
        const username = profile.name.slice(0, 20);

        console.log("Creating User");

        await User.create({
          email: profile.email,
          username,
          image: profile.picture
        });
      }

      console.log("auth Options about to return true")

      return true;
    },

    // Modifies the session object
    async session( { session }) {
      const user = await User.findOne({ email: session.user.email });
      session.user.id = user._id.toString();
      return session;
    }
  }
};

