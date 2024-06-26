import { SessionOptions } from "iron-session";

export interface SessionData {
  userId?: string;
  username?: string;
  name?: string;
  surname?: string;
  img?: string;
  isLoggedIn: boolean;
}

export const defaultSession: SessionData = {
  isLoggedIn: false,
};

export const sessionOptions: SessionOptions = {
  // You need to create a secret key at least 32 characters long.
  password: process.env.SECRET_KEY!,
  cookieName: "CSdaniella",
  cookieOptions: {
    httpOnly: true,
    // Secure only works in `https` environments. So if the environment is `https`, it'll return true.
    // secure: process.env.NODE_ENV === "production",
    secure: false
  },
};