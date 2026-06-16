export const usePlayer = () => {
  const getAllPlayers = async () => {
    const players = await $fetch("/api/players");
    return players;
  };

  const getPlayer = async (playerId: number) => {
    const player = await $fetch(`/api/players/${playerId}`);
    return player;
  };

  const getPlayersByTeam = async (teamId: number, year?: number) => {
    const params = new URLSearchParams({ teamId: String(teamId) });
    if (year) params.set("year", String(year));
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
    getPlayersByTeam,
    createPlayer,
    editPlayer,
    deletePlayer,
  };
};
