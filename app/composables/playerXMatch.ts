export const usePlayerXMatch = () => {
  const getAllPlayerXMatches = async () => {
    const records = await $fetch("http://localhost:8000/api/player-x-matches");
    return records;
  };

  const getPlayerXMatch = async (recordId: number) => {
    const record = await $fetch(
      `http://localhost:8000/api/player-x-matches/${recordId}`,
    );
    return record;
  };

  const createPlayerXMatch = async (recordData: object) => {
    const res = await $fetch(
      `http://localhost:8000/api/player-x-matches/create`,
      {
        method: "POST",
        body: recordData,
      },
    );
    return res;
  };

  const deletePlayerXMatch = async (recordId: number) => {
    await $fetch(`http://localhost:8000/api/player-x-matches/${recordId}`, {
      method: "DELETE",
    });
  };

  return {
    getAllPlayerXMatches,
    getPlayerXMatch,
    createPlayerXMatch,
    deletePlayerXMatch,
  };
};
