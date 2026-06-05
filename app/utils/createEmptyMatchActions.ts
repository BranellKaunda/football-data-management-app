export default function createEmptyMatchActions(matchId: number) {
  return {
    matchId,
    playerId: null,
    playerIdExtra: null,
    teamId: null,
    action: null,
    minute: null,
  };
}
