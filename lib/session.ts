import { IronSession, SessionOptions } from "iron-session";

export interface SessionData {
  csrfToken?: string;
  code?: string;
}

export const sessionOptions: SessionOptions = {
  password: process.env.SESSION_PASSWORD!,
  cookieName: "session",
  cookieOptions: {
    secure: process.env.NODE_ENV === "production",
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60,
  },
};

export async function clearSession(session: IronSession<SessionData>) {
  session.code = undefined;
  session.csrfToken = undefined;
  await session.save();
}