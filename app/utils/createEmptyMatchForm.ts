export default function createEmptyMatchForm() {
  return {
    homeTeam: { id: null, name: "" },
    awayTeam: { id: null, name: "" },
    homeTeamGoals: 0,
    awayTeamGoals: 0,
    matchDate: null,
    status: "Scheduled",
    referee: { id: null, firstName: "", lastName: "" },
    competition: { id: null, name: "" },
  };
}
