export const useTeam = () => {
  const getAllTeams = async () => {
    const teams = await $fetch("/api/teams");
    return teams;
  };

  const getTeam = async (teamId: number) => {
    const team = await $fetch(`/api/teams/${teamId}`);
    return team;
  };

  const createTeam = async (teamData: object) => {
    const res = await $fetch(`/api/teams/create`, {
      method: "POST",
      body: teamData,
    });
    return res;
  };

  const editTeam = async (teamId: number, teamData: object) => {
    const res = await $fetch(`/api/teams/${teamId}`, {
      method: "PATCH",
      body: teamData,
    });
    return res;
  };

  const deleteTeam = async (teamId: number) => {
    await $fetch(`/api/teams/${teamId}`, {
      method: "DELETE",
    });
  };

  const getTeamPlayers = async (teamId: number) => {
    const players = await $fetch(
      `/api/players?teamId=${teamId}`,
    );
    return players;
  };

  return {
    getAllTeams,
    getTeam,
    createTeam,
    editTeam,
    deleteTeam,
    getTeamPlayers,
  };
};
