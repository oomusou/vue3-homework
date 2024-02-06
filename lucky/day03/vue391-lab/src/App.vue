<template>
  <span>Cities：</span>
  <select v-model="citySelected">
    <option disabled value="">Please select one</option>
    <option v-for="item in cities" :value="item.name" :key="item.id">
      {{ item.name }}
    </option>
  </select>
  <div></div>
  <span>Areas：</span>
  <select v-model="areaSelected">
    <option disabled value="">Please select one</option>
    <option v-for="item in areas" :value="item.name" :key="item.id">
      {{ item.name }}
    </option>
  </select>
  <div><span>Zip：</span>{{ zipSelected }}</div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import data from './assets/data.json'

let citySelected = ref('')
let areaSelected = ref('')
let cities = ref([])
let areas = computed(
  () => cities.value.find((item) => item.name === citySelected.value)?.areas || []
)
let zipSelected = computed(
  () => areas.value.find((item) => item.name === areaSelected.value)?.zip || ''
)

onMounted(() => (cities.value = data))
</script>
