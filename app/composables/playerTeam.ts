export const usePlayerTeam = () => {
  const getAllPlayerTeams = async () => {
    const records = await $fetch("/api/player-teams");
    return records;
  };

  const getPlayerTeam = async (recordId: number) => {
    const record = await $fetch(`/api/player-teams/${recordId}`);
    return record;
  };

  const getTeamsByPlayer = async (playerId: number) => {
    const records = await $fetch(`/api/player-teams?player_id=${playerId}`);
    return records;
  };

  const getPlayersByTeam = async (teamId: number) => {
    const records = await $fetch(`/api/player-teams?team_id=${teamId}`);
    return records;
  };

  const getActiveTeamForPlayer = async (playerId: number) => {
    const records = await $fetch(
      `/api/player-teams?player_id=${playerId}&active=true`,
    );
    return records;
  };

  const assignPlayerToTeam = async (recordData: object) => {
    const res = await $fetch(`/api/player-teams/create`, {
      method: "POST",
      body: recordData,
    });
    return res;
  };

  const updatePlayerTeam = async (
    recordId: number,
    recordData: object,
  ) => {
    const res = await $fetch(`/api/player-teams/${recordId}`, {
      method: "PATCH",
      body: recordData,
    });
    return res;
  };

  const deletePlayerTeam = async (recordId: number) => {
    await $fetch(`/api/player-teams/${recordId}`, {
      method: "DELETE",
    });
  };

  return {
    getAllPlayerTeams,
    getPlayerTeam,
    getTeamsByPlayer,
    getPlayersByTeam,
    getActiveTeamForPlayer,
    assignPlayerToTeam,
    updatePlayerTeam,
    deletePlayerTeam,
  };
};
