<script setup>
import { ref, onMounted, watch } from 'vue'
import file from './assets/data.json'

let fileData = ref([])
let selectedCity = ref('')
let areaList = ref([])
let selectedArea = ref('')
let zip = ref('')

// Read file
onMounted(() => {
  fileData.value = file
})

// Watch city select action and copy areas data to areaList
watch(selectedCity, () => {
  areaList.value = selectedCity.value.areas.slice()
})

// Watch area select action and write zip to zip
watch(selectedArea, () => {
  zip.value = selectedArea.value.zip
})
</script>

<template>
  <b>Cities: </b>
  <select v-model="selectedCity">
    <option selected disabled value="">Please select one city</option>
    <option v-for="(city, i) in fileData" :key="i" :value="city">
      {{ city.name }}
    </option>
  </select>
  <div />
  <b>Areas: </b>
  <select v-model="selectedArea">
    <option selected disabled value="">Please select one area</option>
    <option v-for="(area, i) in areaList" :key="i" :value="area">
      {{ area.name }}
    </option>
  </select>
  <div />
  {{ 'Zip: ' + zip + '.' }}
</template>
