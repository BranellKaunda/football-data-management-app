CREATE TYPE "match_action_type" AS ENUM('Goal', 'Own Goal', 'Assist', 'Yellow Card', 'Second Yellow Card', 'Red Card', 'Substitution', 'Penalty');--> statement-breakpoint
CREATE TYPE "match_status" AS ENUM('Scheduled', 'Live', 'Halftime', 'Finished', 'Postponed', 'Cancelled', 'Abandoned');--> statement-breakpoint
CREATE TABLE "account" (
	"id" text PRIMARY KEY,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "leagues" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"logo" text DEFAULT 'https://2eplfxdllfu3rwyt.public.blob.vercel-storage.com/super-league.png',
	"season" text NOT NULL,
	"rank" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "match_actions" (
	"id" serial PRIMARY KEY,
	"player_id" integer NOT NULL,
	"player_id_extra" integer DEFAULT NULL,
	"team_id" integer,
	"match_id" integer NOT NULL,
	"action" "match_action_type" NOT NULL,
	"minute" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "matches" (
	"id" serial PRIMARY KEY,
	"home_team_id" integer NOT NULL,
	"away_team_id" integer NOT NULL,
	"home_team_goals" integer DEFAULT 0,
	"away_team_goals" integer DEFAULT 0,
	"match_date" date NOT NULL,
	"status" "match_status" DEFAULT 'Finished'::"match_status" NOT NULL,
	"referee_id" integer,
	"competition_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "player_teams" (
	"id" serial PRIMARY KEY,
	"player_id" integer NOT NULL,
	"team_id" integer NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"transfer" boolean DEFAULT false NOT NULL,
	"loan" boolean DEFAULT false NOT NULL
);
--> statement-breakpoint
CREATE TABLE "players" (
	"id" serial PRIMARY KEY,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"photo" text,
	"dob" date NOT NULL,
	"position" text NOT NULL,
	"weight_kg" integer NOT NULL,
	"height_cm" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "players_x_matches" (
	"id" serial PRIMARY KEY,
	"player_id" integer NOT NULL,
	"match_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "referees" (
	"id" serial PRIMARY KEY,
	"first_name" text NOT NULL,
	"last_name" text NOT NULL,
	"dob" date NOT NULL,
	"location" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL UNIQUE,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teams" (
	"id" serial PRIMARY KEY,
	"name" text NOT NULL,
	"logo" text NOT NULL,
	"location" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "teams_x_leagues" (
	"id" serial PRIMARY KEY,
	"team_id" integer NOT NULL,
	"league_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY,
	"name" text NOT NULL,
	"email" text NOT NULL UNIQUE,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" ("user_id");--> statement-breakpoint
CREATE UNIQUE INDEX "uq_player_start_date" ON "player_teams" ("player_id","start_date");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" ("identifier");--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "match_actions" ADD CONSTRAINT "match_actions_player_id_players_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id");--> statement-breakpoint
ALTER TABLE "match_actions" ADD CONSTRAINT "match_actions_player_id_extra_players_id_fkey" FOREIGN KEY ("player_id_extra") REFERENCES "players"("id");--> statement-breakpoint
ALTER TABLE "match_actions" ADD CONSTRAINT "match_actions_team_id_teams_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id");--> statement-breakpoint
ALTER TABLE "match_actions" ADD CONSTRAINT "match_actions_match_id_matches_id_fkey" FOREIGN KEY ("match_id") REFERENCES "matches"("id");--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_home_team_id_teams_id_fkey" FOREIGN KEY ("home_team_id") REFERENCES "teams"("id");--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_away_team_id_teams_id_fkey" FOREIGN KEY ("away_team_id") REFERENCES "teams"("id");--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_referee_id_referees_id_fkey" FOREIGN KEY ("referee_id") REFERENCES "referees"("id");--> statement-breakpoint
ALTER TABLE "matches" ADD CONSTRAINT "matches_competition_id_leagues_id_fkey" FOREIGN KEY ("competition_id") REFERENCES "leagues"("id");--> statement-breakpoint
ALTER TABLE "player_teams" ADD CONSTRAINT "player_teams_player_id_players_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id");--> statement-breakpoint
ALTER TABLE "player_teams" ADD CONSTRAINT "player_teams_team_id_teams_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id");--> statement-breakpoint
ALTER TABLE "players_x_matches" ADD CONSTRAINT "players_x_matches_player_id_players_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id");--> statement-breakpoint
ALTER TABLE "players_x_matches" ADD CONSTRAINT "players_x_matches_match_id_matches_id_fkey" FOREIGN KEY ("match_id") REFERENCES "matches"("id");--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "teams_x_leagues" ADD CONSTRAINT "teams_x_leagues_team_id_teams_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id");--> statement-breakpoint
ALTER TABLE "teams_x_leagues" ADD CONSTRAINT "teams_x_leagues_league_id_leagues_id_fkey" FOREIGN KEY ("league_id") REFERENCES "leagues"("id");