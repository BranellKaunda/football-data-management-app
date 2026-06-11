export const useReferee = () => {
  const getAllReferees = async () => {
    const referees = await $fetch("/api/referees");
    return referees;
  };

  const getReferee = async (refereeId: number) => {
    const referee = await $fetch(
      `/api/referees/${refereeId}`,
    );
    return referee;
  };

  const createReferee = async (refereeData: object) => {
    const res = await $fetch(`/api/referees/create`, {
      method: "POST",
      body: refereeData,
    });
    return res;
  };

  const editReferee = async (refereeId: number, refereeData: object) => {
    const res = await $fetch(
      `/api/referees/${refereeId}`,
      {
        method: "PATCH",
        body: refereeData,
      },
    );
    return res;
  };

  const deleteReferee = async (refereeId: number) => {
    await $fetch(`/api/referees/${refereeId}`, {
      method: "DELETE",
    });
  };

  return {
    getAllReferees,
    getReferee,
    createReferee,
    editReferee,
    deleteReferee,
  };
};
