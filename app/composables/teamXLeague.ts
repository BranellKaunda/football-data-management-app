export const useTeamXLeague = () => {
  const getAllTeamXLeagues = async () => {
    const records = await $fetch("/api/teams-x-leagues");
    return records;
  };

  const getTeamXLeague = async (recordId: number) => {
    const record = await $fetch(`/api/teams-x-leagues/${recordId}`);
    return record;
  };

  const getLeaguesByTeam = async (teamId: number) => {
    const records = await $fetch(`/api/teams-x-leagues?teamId=${teamId}`);
    return records;
  };

  const createTeamXLeague = async (recordData: object) => {
    const res = await $fetch(`/api/teams-x-leagues/create`, {
      method: "POST",
      body: recordData,
    });
    return res;
  };

  const deleteTeamXLeague = async (recordId: number) => {
    await $fetch(`/api/teams-x-leagues/${recordId}`, {
      method: "DELETE",
    });
  };

  return {
    getAllTeamXLeagues,
    getTeamXLeague,
    getLeaguesByTeam,
    createTeamXLeague,
    deleteTeamXLeague,
  };
};
