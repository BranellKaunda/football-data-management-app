export const useMatchAction = () => {
  const getAllMatchActions = async () => {
    const actions = await $fetch("http://localhost:8000/api/match-actions/");
    return actions;
  };

  const getMatchAction = async (actionId: number) => {
    const action = await $fetch(
      `http://localhost:8000/api/match-actions/${actionId}`,
    );
    return action;
  };

  const getMatchActionsByMatch = async (matchId: number) => {
    const actions = await $fetch(
      `http://localhost:8000/api/match-actions/?matchId=${matchId}`,
    );
    return actions;
  };

  const createMatchAction = async (actionData: object) => {
    const res = await $fetch(`http://localhost:8000/api/match-actions/create`, {
      method: "POST",
      body: actionData,
    });
    return res;
  };

  const editMatchAction = async (actionData: object) => {
    const res = await $fetch(`http://localhost:8000/api/match-actions/edit`, {
      method: "PATCH",
      body: actionData,
    });
    return res;
  };

  const deleteMatchAction = async (actionId: number) => {
    await $fetch(`http://localhost:8000/api/match-actions/${actionId}`, {
      method: "DELETE",
    });
  };

  return {
    getAllMatchActions,
    getMatchAction,
    getMatchActionsByMatch,
    createMatchAction,
    editMatchAction,
    deleteMatchAction,
  };
};
