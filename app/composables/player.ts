export const usePlayer = () => {
  const getAllPlayers = async () => {
    const players = await $fetch("/api/players");
    return players;
  };

  const getPlayer = async (playerId: number) => {
    const player = await $fetch(
      `http://localhost:8000/api/players/${playerId}`,
    );
    return player;
  };

  const getPlayersByTeam = async (teamId: number) => {
    const players = await $fetch(
      `http://localhost:8000/api/players/?teamId=${teamId}`,
    );
    return players;
  };

  const createPlayer = async (playerData: object) => {
    const res = await $fetch(`http://localhost:8000/api/players/create`, {
      method: "POST",
      body: playerData,
    });
    return res;
  };

  const editPlayer = async (playerId: number, playerData: object) => {
    const res = await $fetch(`http://localhost:8000/api/players/${playerId}`, {
      method: "PATCH",
      body: playerData,
    });
    return res;
  };

  const deletePlayer = async (playerId: number) => {
    await $fetch(`http://localhost:8000/api/players/${playerId}`, {
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
