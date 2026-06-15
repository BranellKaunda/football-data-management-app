import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
	matchActions: {
		match: r.one.matches({
			from: r.matchActions.matchId,
			to: r.matches.id
		}),
		playerPlayerIdExtra: r.one.players({
			from: r.matchActions.playerIdExtra,
			to: r.players.id,
			alias: "matchActions_playerIdExtra_players_id"
		}),
		playerPlayerId: r.one.players({
			from: r.matchActions.playerId,
			to: r.players.id,
			alias: "matchActions_playerId_players_id"
		}),
		team: r.one.teams({
			from: r.matchActions.teamId,
			to: r.teams.id
		}),
	},
	matches: {
		matchActions: r.many.matchActions(),
		teamAwayTeamId: r.one.teams({
			from: r.matches.awayTeamId,
			to: r.teams.id,
			alias: "matches_awayTeamId_teams_id"
		}),
		league: r.one.leagues({
			from: r.matches.competitionId,
			to: r.leagues.id
		}),
		teamHomeTeamId: r.one.teams({
			from: r.matches.homeTeamId,
			to: r.teams.id,
			alias: "matches_homeTeamId_teams_id"
		}),
		referee: r.one.referees({
			from: r.matches.refereeId,
			to: r.referees.id
		}),
		players: r.many.players({
			from: r.matches.id.through(r.playersXMatches.matchId),
			to: r.players.id.through(r.playersXMatches.playerId)
		}),
	},
	players: {
		matchActionsPlayerIdExtra: r.many.matchActions({
			alias: "matchActions_playerIdExtra_players_id"
		}),
		matchActionsPlayerId: r.many.matchActions({
			alias: "matchActions_playerId_players_id"
		}),
		teams: r.many.teams({
			from: r.players.id.through(r.playerTeams.playerId),
			to: r.teams.id.through(r.playerTeams.teamId),
			alias: "players_id_teams_id_via_playerTeams"
		}),
		team: r.one.teams({
			from: r.players.teamId,
			to: r.teams.id,
			alias: "players_teamId_teams_id"
		}),
		matches: r.many.matches(),
	},
	teams: {
		matchActions: r.many.matchActions(),
		matchesAwayTeamId: r.many.matches({
			alias: "matches_awayTeamId_teams_id"
		}),
		matchesHomeTeamId: r.many.matches({
			alias: "matches_homeTeamId_teams_id"
		}),
		playersViaPlayerTeams: r.many.players({
			alias: "players_id_teams_id_via_playerTeams"
		}),
		playersTeamId: r.many.players({
			alias: "players_teamId_teams_id"
		}),
		leagues: r.many.leagues(),
	},
	leagues: {
		matches: r.many.matches(),
		teams: r.many.teams({
			from: r.leagues.id.through(r.teamsXLeagues.leagueId),
			to: r.teams.id.through(r.teamsXLeagues.teamId)
		}),
	},
	referees: {
		matches: r.many.matches(),
	},
}))