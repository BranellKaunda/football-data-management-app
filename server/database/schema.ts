import {
  pgTable,
  pgEnum,
  serial,
  text,
  integer,
  date,
  boolean,
  uniqueIndex,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
export const matchStatusEnum = pgEnum("match_status", [
  "Scheduled",
  "Live",
  "Halftime",
  "Finished",
  "Postponed",
  "Cancelled",
  "Abandoned",
]);

export const matchActionsEnum = pgEnum("match_action_type", [
  "Goal",
  "Own Goal",
  "Assist",
  "Yellow Card",
  "Second Yellow Card",
  "Red Card",
  "Substitution",
  "Penalty",
]);

export const teams = pgTable("teams", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo").notNull(),
  location: text("location").notNull(),
});

export const players = pgTable("players", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  photo: text("photo"),
  dob: date("dob").notNull(),
  position: text("position").notNull(),
  weightKg: integer("weight_kg").notNull(),
  heightCm: integer("height_cm").notNull(),
});

export const playerTeams = pgTable(
  "player_teams",
  {
    id: serial("id").primaryKey(),
    playerId: integer("player_id")
      .notNull()
      .references(() => players.id),
    teamId: integer("team_id")
      .notNull()
      .references(() => teams.id),
    startDate: date("start_date").notNull(),
    endDate: date("end_date"),
    transfer: boolean("transfer").notNull().default(false),
    loan: boolean("loan").notNull().default(false),
  },
  (table) => [
    uniqueIndex("uq_player_start_date").on(table.playerId, table.startDate),
  ],
);

export const leagues = pgTable("leagues", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  logo: text("logo").default(
    "https://2eplfxdllfu3rwyt.public.blob.vercel-storage.com/super-league.png",
  ),
  season: text("season").notNull(),
  rank: integer("rank").notNull(),
});

export const matches = pgTable("matches", {
  id: serial("id").primaryKey(),
  homeTeamId: integer("home_team_id")
    .notNull()
    .references(() => teams.id),
  awayTeamId: integer("away_team_id")
    .notNull()
    .references(() => teams.id),
  homeTeamGoals: integer("home_team_goals").default(0),
  awayTeamGoals: integer("away_team_goals").default(0),
  matchDate: date("match_date").notNull(),
  status: matchStatusEnum().notNull().default("Finished"),
  refereeId: integer("referee_id").references(() => referees.id),
  competitionId: integer("competition_id")
    .notNull()
    .references(() => leagues.id),
});

export const teamsXleagues = pgTable("teams_x_leagues", {
  id: serial("id").primaryKey(),
  teamId: integer("team_id")
    .notNull()
    .references(() => teams.id),
  leagueId: integer("league_id")
    .notNull()
    .references(() => leagues.id),
});

export const referees = pgTable("referees", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dob: date("dob").notNull(),
  location: text("location").notNull(),
});

export const playersXmatches = pgTable("players_x_matches", {
  id: serial("id").primaryKey(),
  playerId: integer("player_id")
    .notNull()
    .references(() => players.id),
  matchId: integer("match_id")
    .notNull()
    .references(() => matches.id),
});

export const match_actions = pgTable("match_actions", {
  id: serial("id").primaryKey(),
  playerId: integer("player_id")
    .references(() => players.id)
    .notNull(),
  playerIdExtra: integer("player_id_extra")
    .references(() => players.id)
    .default(sql`NULL`),
  teamId: integer("team_id").references(() => teams.id),
  matchId: integer("match_id")
    .notNull()
    .references(() => matches.id),
  action: matchActionsEnum().notNull(),
  minute: integer("minute").notNull(),
});

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

