export default function createEmptyMatchForm() {
  return {
    homeTeam: { id: null, name: "" },
    awayTeam: { id: null, name: "" },
    homeTeamGoals: null,
    awayTeamGoals: null,
    matchDate: null,
    status: "Scheduled",
    referee: { id: null, firstName: "", lastName: "" },
    competition: { id: null, name: "" },
  };
}
