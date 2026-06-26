export const usePlayer = () => {
  const getAllPlayers = async () => {
    const players = await $fetch("/api/players");
    return players;
  };

  const getPlayer = async (playerId: number) => {
    const player = await $fetch(`/api/players/${playerId}`);
    return player;
  };

  const getPlayersByTeamAndYear = async (teamId: number, year?: number) => {
    const params = new URLSearchParams({ team_id: String(teamId) });
    if (year !== undefined) params.set("year", String(year));

    const players = await $fetch(`/api/players/?${params}`);

    return players;
  };

  const createPlayer = async (playerData: object) => {
    const res = await $fetch(`/api/players/create`, {
      method: "POST",
      body: playerData,
    });
    return res;
  };

  const editPlayer = async (playerId: number, playerData: object) => {
    const res = await $fetch(`/api/players/${playerId}`, {
      method: "PATCH",
      body: playerData,
    });
    return res;
  };

  const deletePlayer = async (playerId: number) => {
    await $fetch(`/api/players/${playerId}`, {
      method: "DELETE",
    });
  };

  return {
    getAllPlayers,
    getPlayer,
    getPlayersByTeamAndYear,
    createPlayer,
    editPlayer,
    deletePlayer,
  };
};
