export const useMatch = () => {
  const deleteMatch = async (matchId: number) => {
    await $fetch(`http://localhost:8000/api/matches/${matchId}`, {
      method: "DELETE",
    });
  };

  return {
    deleteMatch,
  };
};
