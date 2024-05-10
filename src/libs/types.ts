type User = {
  id: string;
  name?: string | null;
  email?: string | null;
  emailVerified?: Date | null;
  image?: string | null;
  accounts: Account[];
  sessions: Session[];
  matches: Match[];
}

type Match = {
  id: string;
  userId: string;
  createdAt: Date;
  Seed?: string | null;
  user: User;
  matchPins: MatchPin[];
}

type MatchPin = {
  id: string;
  matchId: string;
  visited?: boolean | null;
  latitude?: number | null;
  longitude?: number | null;
  targetImage?: string | null;
  takePhoto?: string | null;
  match: Match;
}

type Account = {
  id: string;
  userId: string;
  type: string;
  provider: string;
  providerAccountId: string;
  refresh_token?: string | null;
  access_token?: string | null;
  expires_at?: number | null;
  token_type?: string | null;
  scope?: string | null;
  id_token?: string | null;
  session_state?: string | null;
  user: User;
}

type Session = {
  id: string;
  sessionToken: string;
  userId: string;
  expires: Date;
  user: User;
}

export type { User, Account, Session, Match, MatchPin };