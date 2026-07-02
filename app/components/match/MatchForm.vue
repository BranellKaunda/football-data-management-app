<script setup>
import { createEmptyMatchForm } from "#shared/utils/Match";

const match = defineModel();
const emit = defineEmits(["cancel", "save"]);

const editing = computed(() => !!match.value.id);

const { getAllTeams } = useTeam();
const { getAllReferees } = useReferee();
const { getAllLeagues } = useLeague();
const { createMatch, editMatch } = useMatch();

const teams = await getAllTeams();
const referees = await getAllReferees();
const competitions = await getAllLeagues();

const rows = ref([]);

//to know if i am editing or creating a new match
function initRows() {
  if (match.value.id) {
    rows.value = [{ ...match.value }];
  } else {
    rows.value = [{ ...createEmptyMatchForm() }];
  }
}

initRows();

function addRow() {
  rows.value.push({ ...createEmptyMatchForm() });
}

function removeRow(index) {
  rows.value.splice(index, 1);
}

const authError = useState("authError");

async function save() {
  const promises = rows.value.map((row) => {
    const body = {
      homeTeamId: row.homeTeam.id,
      awayTeamId: row.awayTeam.id,
      homeTeamGoals: row.homeTeamGoals,
      awayTeamGoals: row.awayTeamGoals,
      matchDate: row.matchDate,
      status: row.status,
      refereeId: row.referee.id,
      competitionId: row.competition.id,
    };

    return row.id ? editMatch(row.id, body) : createMatch(body);
  });

  try {
    const results = await Promise.all(promises);
    emit("save", results);
  } catch (e) {
    if (e?.response?.status === 401) {
      authError.value = "You must be an Admin to perform this action.";
    }
  }
}

function cancel() {
  initRows();
  emit("cancel");
}
</script>

<template>
  <div class="max-w-full sm:max-w-6xl mx-auto p-4 sm:p-6">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-2 mb-6">
      <h1 class="text-xl sm:text-2xl font-bold text-center">
        {{ editing ? "Edit Match" : "Create Matches" }}
      </h1>
      <button class="btn-primary" @click="addRow">
        New Match
      </button>
    </div>

    <div class="card overflow-x-auto" v-if="rows.length">
      <table class="w-full text-left text-sm min-w-[700px]">
        <thead class="bg-gray-100 border-b border-gray-200">
          <tr>
            <th class="p-2 font-semibold">Home Team</th>
            <th class="p-2 font-semibold">Away Team</th>
            <th class="p-2 font-semibold w-20">H Goals</th>
            <th class="p-2 font-semibold w-20">A Goals</th>
            <th class="p-2 font-semibold">Date</th>
            <th class="p-2 font-semibold">Status</th>
            <th class="p-2 font-semibold">Referee</th>
            <th class="p-2 font-semibold">Competition</th>
            <th class="p-2 font-semibold w-16"></th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in rows"
            :key="index"
            class="border-b border-gray-200 hover:bg-gray-50"
          >
            <td class="p-2">
              <select
                v-model.number="row.homeTeam.id"
                class="w-32 border rounded font-normal text-sm"
              >
                <option disabled :value="null">Select team</option>
                <option v-for="team in teams" :key="team.id" :value="team.id">
                  {{ team.name }}
                </option>
              </select>
            </td>
            <td class="p-1">
              <select
                v-model.number="row.awayTeam.id"
                class="w-32 border rounded font-normal text-sm"
              >
                <!-- class ="w-36" of select -->
                <option disabled :value="null">Select team</option>
                <option v-for="team in teams" :key="team.id" :value="team.id">
                  {{ team.name }}
                </option>
              </select>
            </td>
            <td class="p-1">
              <input
                v-model.number="row.homeTeamGoals"
                type="number"
                class="w-16 border rounded font-normal text-sm"
              />
            </td>
            <td class="p-1">
              <input
                v-model.number="row.awayTeamGoals"
                type="number"
                class="w-16 border rounded font-normal text-sm"
              />
            </td>
            <td class="p-1">
              <input
                v-model="row.matchDate"
                placeholder="yyyy-mm-dd"
                class="w-26 border rounded font-normal text-sm"
              />
            </td>
            <td class="p-1">
              <select
                v-model="row.status"
                class="border rounded font-normal text-sm"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="Live">Live</option>
                <option value="Finished">Finished</option>
                <option value="Halftime">Halftime</option>
                <option value="Cancelled">Cancelled</option>
                <option value="Abandoned">Abandoned</option>
              </select>
            </td>
            <td class="p-1">
              <select
                v-model.number="row.referee.id"
                class="border rounded font-normal text-sm"
              >
                <option disabled :value="null">Select referee</option>
                <option
                  v-for="referee in referees"
                  :key="referee.id"
                  :value="referee.id"
                >
                  {{ referee.firstName }} {{ referee.lastName }}
                </option>
              </select>
            </td>
            <td class="p-1">
              <select
                v-model.number="row.competition.id"
                class="border rounded font-normal text-sm"
              >
                <option disabled :value="null">Select competition</option>
                <option
                  v-for="competition in competitions"
                  :key="competition.id"
                  :value="competition.id"
                >
                  {{ competition.name }} {{ competition.season }}
                </option>
              </select>
            </td>
            <td class="p-1 text-center">
              <button
                class="text-red-500 hover:text-red-700 text-lg font-bold leading-none"
                @click="removeRow(index)"
              >
                &times;
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex gap-3 justify-end mt-6">
      <button class="btn-secondary" type="button" @click="cancel">Cancel</button>
      <button class="btn-primary" type="button" @click="save">Save</button>
    </div>
  </div>
</template>
