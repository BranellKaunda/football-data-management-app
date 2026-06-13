export const useMatch = () => {
  const getAllMatches = async () => {
    const matches = await $fetch("/api/matches");
    return matches;
  };

  const getMatchesByCompetition = async (
    competitionId: number,
    limit?: number,
    offset?: number,
  ) => {
    const params = new URLSearchParams({
      competitionId: String(competitionId),
    });
    if (limit) params.set("limit", String(limit));
    if (offset) params.set("offset", String(offset));
    const matches = await $fetch(`/api/matches/?${params}`);
    return matches;
  };

  const getMatchesByTeam = async (teamId: number) => {
    const matches = await $fetch(`/api/matches/?teamId=${teamId}`);
    return matches;
  };

  const getMatchesByTeamAndCompetition = async (
    teamId: number,
    competitionId?: number,
  ) => {
    let url = `/api/matches/?teamId=${teamId}`;
    if (competitionId) {
      url += `&competitionId=${competitionId}`;
    }
    const matches = await $fetch(url);
    return matches;
  };

  const getMatch = async (matchId: number) => {
    const match = await $fetch(`/api/matches/${matchId}`);
    return match;
  };

  const createMatch = async (matchData: object) => {
    const match = await $fetch(`/api/matches/create`, {
      method: "POST",
      body: matchData,
    });
    return match;
  };

  const editMatch = async (matchId: number, matchData: object) => {
    const match = await $fetch(`/api/matches/${matchId}`, {
      method: "PATCH",
      body: matchData,
    });
    return match;
  };

  const deleteMatch = async (matchId: number) => {
    await $fetch(`/api/matches/${matchId}`, {
      method: "DELETE",
    });
  };

  return {
    getAllMatches,
    getMatchesByCompetition,
    getMatchesByTeam,
    getMatchesByTeamAndCompetition,
    getMatch,
    createMatch,
    editMatch,
    deleteMatch,
  };
};
