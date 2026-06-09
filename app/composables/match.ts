export const useMatch = () => {
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

  return { getMatch, createMatch, editMatch, deleteMatch };
};
