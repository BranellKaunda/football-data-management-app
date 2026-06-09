export const useTeam = () => {
  const getAllTeams = async () => {
    const teams = await $fetch("http://localhost:8000/api/teams");
    return teams;
  };

  const getTeam = async (teamId: number) => {
    const team = await $fetch(`http://localhost:8000/api/teams/${teamId}`);
    return team;
  };

  const createTeam = async (teamData: object) => {
    const res = await $fetch(`http://localhost:8000/api/teams/create`, {
      method: "POST",
      body: teamData,
    });
    return res;
  };

  const editTeam = async (teamId: number, teamData: object) => {
    const res = await $fetch(`http://localhost:8000/api/teams/${teamId}`, {
      method: "PATCH",
      body: teamData,
    });
    return res;
  };

  const deleteTeam = async (teamId: number) => {
    await $fetch(`http://localhost:8000/api/teams/${teamId}`, {
      method: "DELETE",
    });
  };

  const getTeamPlayers = async (teamId: number) => {
    const players = await $fetch(
      `http://localhost:8000/api/players?teamId=${teamId}`,
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
