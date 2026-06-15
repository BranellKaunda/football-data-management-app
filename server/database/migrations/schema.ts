import { pgEnum, pgTable, serial, text, integer, date, boolean, uniqueIndex, foreignKey, primaryKey } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const matchActionType = pgEnum("match_action_type", ["Goal", "Own Goal", "Assist", "Yellow Card", "Second Yellow Card", "Red Card", "Substitution", "Penalty"])
export const matchStatus = pgEnum("match_status", ["Scheduled", "Live", "Halftime", "Finished", "Postponed", "Cancelled", "Abandoned"])


export const leagues = pgTable("leagues", {
	id: serial().primaryKey(),
	name: text().notNull(),
	season: text().notNull(),
	rank: integer().notNull(),
	logo: text().default("https://2eplfxdllfu3rwyt.public.blob.vercel-storage.com/super-league.png"),
});

export const matchActions = pgTable("match_actions", {
	id: serial().primaryKey(),
	playerId: integer("player_id").notNull().references(() => players.id),
	playerIdExtra: integer("player_id_extra").references(() => players.id),
	teamId: integer("team_id").references(() => teams.id),
	matchId: integer("match_id").notNull().references(() => matches.id),
	action: matchActionType().notNull(),
	minute: integer().notNull(),
});

export const matches = pgTable("matches", {
	id: serial().primaryKey(),
	homeTeamId: integer("home_team_id").notNull().references(() => teams.id),
	awayTeamId: integer("away_team_id").notNull().references(() => teams.id),
	homeTeamGoals: integer("home_team_goals").default(0),
	awayTeamGoals: integer("away_team_goals").default(0),
	matchDate: date("match_date").notNull(),
	status: matchStatus().default("Finished").notNull(),
	refereeId: integer("referee_id").references(() => referees.id),
	competitionId: integer("competition_id").notNull().references(() => leagues.id),
});

export const playerTeams = pgTable("player_teams", {
	id: serial().primaryKey(),
	playerId: integer("player_id").notNull().references(() => players.id),
	teamId: integer("team_id").notNull().references(() => teams.id),
	startDate: date("start_date").notNull(),
	endDate: date("end_date"),
	transfer: boolean().default(false).notNull(),
	loan: boolean().default(false).notNull(),
}, (table) => [
	uniqueIndex("uq_player_start_date").using("btree", table.playerId.asc().nullsLast(), table.startDate.asc().nullsLast()),
]);

export const players = pgTable("players", {
	id: serial().primaryKey(),
	teamId: integer("team_id").references(() => teams.id),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
	photo: text(),
	dob: date().notNull(),
	position: text().notNull(),
	weightKg: integer("weight_kg").notNull(),
	heightCm: integer("height_cm").notNull(),
});

export const playersXMatches = pgTable("players_x_matches", {
	id: serial().primaryKey(),
	playerId: integer("player_id").notNull().references(() => players.id),
	matchId: integer("match_id").notNull().references(() => matches.id),
});

export const referees = pgTable("referees", {
	id: serial().primaryKey(),
	firstName: text("first_name").notNull(),
	lastName: text("last_name").notNull(),
	dob: date().notNull(),
	location: text().notNull(),
});

export const teams = pgTable("teams", {
	id: serial().primaryKey(),
	name: text().notNull(),
	logo: text().notNull(),
	location: text().notNull(),
});

export const teamsXLeagues = pgTable("teams_x_leagues", {
	id: serial().primaryKey(),
	teamId: integer("team_id").notNull().references(() => teams.id),
	leagueId: integer("league_id").notNull().references(() => leagues.id),
});
