export const useLeague = () => {
  const getAllLeagues = async () => {
    const leagues = await $fetch("http://localhost:8000/api/leagues");
    return leagues;
  };

  const getLeague = async (leagueId: number) => {
    const league = await $fetch(
      `http://localhost:8000/api/leagues/${leagueId}`,
    );
    return league;
  };

  const createLeague = async (leagueData: object) => {
    const res = await $fetch(`http://localhost:8000/api/leagues/create`, {
      method: "POST",
      body: leagueData,
    });
    return res;
  };

  const editLeague = async (leagueId: number, leagueData: object) => {
    const res = await $fetch(`http://localhost:8000/api/leagues/${leagueId}`, {
      method: "PATCH",
      body: leagueData,
    });
    return res;
  };

  const deleteLeague = async (leagueId: number) => {
    await $fetch(`http://localhost:8000/api/leagues/${leagueId}`, {
      method: "DELETE",
    });
  };

  return {
    getAllLeagues,
    getLeague,
    createLeague,
    editLeague,
    deleteLeague,
  };
};
