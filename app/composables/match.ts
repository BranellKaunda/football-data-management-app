export const useMatch = () => {
  const getAllMatches = async () => {
    const matches = await $fetch("/api/matches");
    return matches;
  };

  const getMatchesByCompetition = async (competitionId: number) => {
    const matches = await $fetch(
      `http://localhost:8000/api/matches/?competitionId=${competitionId}`,
    );
    return matches;
  };

  const getMatchesByTeam = async (teamId: number) => {
    const matches = await $fetch(
      `http://localhost:8000/api/matches/?teamId=${teamId}`,
    );
    return matches;
  };

  const getMatch = async (matchId: number) => {
    const match = await $fetch(`http://localhost:8000/api/matches/${matchId}`);
    return match;
  };

  const createMatch = async (matchData: object) => {
    const match = await $fetch(`http://localhost:8000/api/matches/create`, {
      method: "POST",
      body: matchData,
    });
    return match;
  };

  const editMatch = async (matchId: number, matchData: object) => {
    const match = await $fetch(`http://localhost:8000/api/matches/${matchId}`, {
      method: "PATCH",
      body: matchData,
    });
    return match;
  };

  const deleteMatch = async (matchId: number) => {
    await $fetch(`http://localhost:8000/api/matches/${matchId}`, {
      method: "DELETE",
    });
  };

  return {
    getAllMatches,
    getMatchesByCompetition,
    getMatchesByTeam,
    getMatch,
    createMatch,
    editMatch,
    deleteMatch,
  };
};
