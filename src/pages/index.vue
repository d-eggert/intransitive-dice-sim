<template>
  <h1 class="d-flex justify-center text-primary">
    Willkommen beim Intransitiven Würfel Simulator
  </h1>
  <h2 class="d-flex justify-center text-secondary">
    Würfel
  </h2>
  <v-layout
    class="overflow-x-auto ma-4"
    row
    wrap
  >
    <template
      v-for="(die) in dice"
      :key="die"
    >
      <v-card
        class="mx-auto ml-2"
        :color="selectedDice.includes(die) ? 'secondary' : ''"
        prepend-icon="mdi-dice-multiple"
        width="180"
        min-width="180"
        hover
        @click="selectDie(die)"
      >
        <template #title>
          <span class="font-weight-black">{{ die.name }}</span>
        </template>
        <v-card-text class="d-flex justify-center">
          {{ die.numbers }}
        </v-card-text>
      </v-card>
    </template>
  </v-layout>
  <v-divider />
  <h2 class="d-flex justify-center text-secondary">
    Simulation
  </h2>
  <v-row class="justify-center">
    <v-col cols="auto">
      <v-number-input
        v-model="rounds"
        class="mx-auto"
        control-variant="split"
        inset
        label="Anzahl Runden (10-10000)"
        variant="solo-filled"
        width="300"
        :max="10000"
        :min="10"
      />
    </v-col>
    <v-col cols="auto">
      <v-btn
        class="mx-auto"
        color="primary"
        text="Würfeln!"
        :disabled="selectedDice.length < 2"
        @click="runSimulation()"
      />
    </v-col>
  </v-row>
  <v-row
    :class="result===undefined ? 'd-none' : ''"
  >
    <template
      v-for="(die, index) in selectedDice"
      :key="die"
    >
      <v-card
        class="mx-auto ma-2"
        prepend-icon="mdi-dice-multiple"
        width="300"
        min-width="180"
      >
        <template #title>
          <span class="font-weight-black">{{ die.name }}</span>
        </template>
        <v-card-text>
          <v-row>
            <v-col cols="12">
              <v-progress-linear
                class="mr-2"
                height="25"
                title="Gewonnen"
                color="primary"
                :model-value="result?.getPercentage(index)"
              >
                <strong>{{ result?.getPercentage(index) }}%</strong>
              </v-progress-linear>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="auto">
              <v-label class="justify-center">
                {{ result?.wins[index] }} von {{ result?.rounds }} Runden gewonnen
              </v-label>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </template>
  </v-row>
</template>

<script lang="ts" setup>
import { ref, shallowRef } from 'vue'
import { type Die, efronsDice } from '@/components/dice';
import { Match, Result } from '@/components/match';

const dice = ref(efronsDice)
const selectedDice = ref<Die[]>([])
const rounds = shallowRef(1000)
const result = shallowRef<Result>()

function selectDie(die: Die) {
  const i = selectedDice.value.findIndex(value => die === value)
  if (i < 0) {
    selectedDice.value.push(die)
  } else {
    selectedDice.value.splice(i, 1)
  }
  result.value = undefined

  console.log(i)
  console.log(selectedDice.value)

}

function runSimulation() {
  console.log('running simulation with ' + selectedDice.value + ' for ' + rounds.value + ' rounds.')
  const match = new Match(selectedDice.value)
  result.value = match.run(rounds.value)
}
</script>
