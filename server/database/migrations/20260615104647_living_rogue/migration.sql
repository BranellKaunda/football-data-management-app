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
ALTER TABLE "players" ALTER COLUMN "team_id" DROP NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX "uq_player_start_date" ON "player_teams" ("player_id","start_date");--> statement-breakpoint
ALTER TABLE "player_teams" ADD CONSTRAINT "player_teams_player_id_players_id_fkey" FOREIGN KEY ("player_id") REFERENCES "players"("id");--> statement-breakpoint
ALTER TABLE "player_teams" ADD CONSTRAINT "player_teams_team_id_teams_id_fkey" FOREIGN KEY ("team_id") REFERENCES "teams"("id");