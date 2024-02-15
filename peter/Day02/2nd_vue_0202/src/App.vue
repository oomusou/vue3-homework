<script setup>
import { ref, computed } from 'vue'
let listMode = ref(0)
//let preListMode = ref(0);

let action = ''
let toDoList = ref([])
let add_List = () => {
  if (action != '') {
    // active new Id on list
    activeIdList.push(toDoList.value.length)
    toDoList.value.push(action)
    action = ''
  }
  return { toDoList }
}

// Edit/ Submit items name
let newActionName = ref('')
let isEdit = ref(-1)

let edit_Item = (i, item) => {
  isEdit.value = i
  newActionName.value = item
  return { isEdit, newActionName }
}
let edit_finished_Item = (i) => {
  isEdit.value = -1
  // According to listMode find different edited location
  switch (listMode.value) {
    case 1:
      toDoList.value.splice(activeIdList[i], 1, newActionName.value)
      break
    case 2:
      toDoList.value.splice(completeIdList[i], 1, newActionName.value)
      break
    default:
      toDoList.value.splice(i, 1, newActionName.value)
      break
  }
  return { isEdit, toDoList }
}

// Remove one item from items remove button
let removeId = ref(-1)
let remove_Item = (i) => {
  removeId.value = i // set remove ID
  // According to listMode find different removed item's location
  switch (listMode.value) {
    case 1:
      toDoList.value.splice(activeIdList[i], 1)
      break
    case 2:
      toDoList.value.splice(completeIdList[i], 1)
      break
    default:
      toDoList.value.splice(i, 1)
      break
  }
  return { toDoList }
}

// Remove all complete item.
let remove_List = () => {
  // Need sort to make big to small sequance. Make deleted result to have right location. Action is like stack's pop.
  completeIdList.sort((a, b) => b - a)
  // remove
  completeIdList.forEach((item) => {
    toDoList.value.splice(item, 1)
  })
  // clear
  for (let j = 0; j < toDoList.value.length; j++) {
    activeIdList[j] = j
  }
  completeIdList.splice(0)
  showCheck.value.splice(0)

  return { toDoList, completeIdList, showCheck }
}

let activeIdList = []
let completeIdList = []
let showCheck = ref([])
let totalSizeString = ''

// Compute showList and showCheck(checkbox)
let showList = computed(() => {
  let tempList = toDoList.value.slice()
  let k = 0
  // sort big to small
  completeIdList.sort()
  if (showCheck.value.length > 0) showCheck.value.sort()
  // update show list
  switch (listMode.value) {
    case 1: // active list
      //compute list
      for (let j = completeIdList.length - 1; j >= 0; j--) {
        tempList.splice(completeIdList[j], 1)
      }

      // compute checkbox
      if (showCheck.value.length > 0) {
        completeIdList.push(activeIdList[showCheck.value[0]])
        activeIdList.splice(showCheck.value[0], 1)
        showCheck.value.splice(0)
      }
      if (removeId.value > -1) {
        for (let j = 0; j < activeIdList.length; j++) {
          if (activeIdList[removeId.value] < activeIdList[j]) {
            activeIdList[j] = activeIdList[j] - 1
          }
        }
        for (let j = 0; j < activeIdList.length; j++) {
          if (activeIdList[removeId.value] < completeIdList[j]) {
            completeIdList[j] = completeIdList[j] - 1
          }
        }
        activeIdList.splice(removeId.value, 1)
        removeId.value = -1
      }
      break
    case 2: // completed list
      //compute list
      tempList = []
      for (let j = 0; j < completeIdList.length; j++) {
        tempList.push(toDoList.value[completeIdList[j]])
      }

      // compute checkbox
      if (showCheck.value.length < completeIdList.length) {
        k = 0
        while (k < completeIdList.length) {
          if (showCheck.value[k] != k) {
            break
          }
          k++
        }
        activeIdList.push(completeIdList[k])
        activeIdList.sort()
        completeIdList.splice(k, 1)
        showCheck.value.splice(0)
        for (let j = 0; j < completeIdList.length; j++) showCheck.value.push(j)
      }
      if (removeId.value > -1) {
        for (let j = 0; j < activeIdList.length; j++) {
          if (completeIdList[removeId.value] < activeIdList[j]) {
            activeIdList[j] = activeIdList[j] - 1
          }
        }
        for (let j = 0; j < completeIdList.length; j++) {
          if (completeIdList[removeId.value] < completeIdList[j]) {
            completeIdList[j] = completeIdList[j] - 1
          }
        }
        completeIdList.splice(removeId.value, 1)
        showCheck.value.splice(0)
        for (let j = 0; j < completeIdList.length; j++) showCheck.value.push(j)
        removeId.value = -1
      }
      break
    default:
      // compute checkbox
      k = 0
      activeIdList.splice(0)
      completeIdList.splice(0)
      for (let j = 0; j < showCheck.value.length; j++) {
        while (k < showCheck.value[j]) {
          if (removeId.value != k) {
            if (
              (removeId.value != -1 && removeId.value > k) ||
              (removeId.value == -1 && removeId.value < k)
            )
              activeIdList.push(k)
            else if (removeId.value != -1) activeIdList.push(k - 1)
          }
          k++
        }
        if (removeId.value != k) {
          if (
            (removeId.value != -1 && removeId.value > k) ||
            (removeId.value == -1 && removeId.value < k)
          )
            completeIdList.push(k)
          else if (removeId.value != -1) completeIdList.push(k - 1)
        }
        k++
      }
      while (k < toDoList.value.length) {
        if (removeId.value != k) {
          if (
            (removeId.value != -1 && removeId.value > k) ||
            (removeId.value == -1 && removeId.value < k)
          )
            activeIdList.push(k)
          else if (removeId.value != -1) activeIdList.push(k - 1)
        }
        k++
      }
      if (removeId.value != -1) {
        showCheck.value.splice(0)
        showCheck.value = completeIdList.slice()
        console.log('bb3 ' + showCheck.value + '  ' + removeId.value)
      }
      removeId.value = -1
  }
  // compute total complete list size and string
  if (completeIdList.length > 1) totalSizeString = completeIdList.length + ' items left'
  else totalSizeString = completeIdList.length + ' item left'

  return tempList
})

// switch listMode
let all_List = () => {
  console.log('All')
  listMode.value = 0
  showCheck.value = completeIdList.slice()
  return { listMode }
}
let active_List = () => {
  listMode.value = 1
  showCheck.value.splice(0)
  return { listMode }
}
let completed_List = () => {
  listMode.value = 2
  for (let j = 0; j < completeIdList.length; j++) showCheck.value[j] = j
  return { listMode }
}
</script>

<template>
  <input v-model="action" />
  <button @click="add_List">Add</button>

  <br />
  <ol>
    <li v-for="(item, i) in showList" :value="item.value" :key="i">
      <input v-if="listMode >= 0" type="checkbox" :value="i" v-model="showCheck" />
      <input v-if="isEdit == i" type="text" v-model="newActionName" />
      <button v-if="isEdit == i" @click="edit_finished_Item(i)">Submit</button>
      <span v-if="isEdit != i">{{ item }}</span>
      <button v-if="isEdit != i" @click="edit_Item(i, item)">Edit</button>
      <button @click="remove_Item(i)">Remove</button>
    </li>
    {{
      totalSizeString
    }}
  </ol>
  <br />
  <button @click="all_List">All</button>
  <br />
  <button @click="active_List">Active</button>
  <br />
  <button @click="completed_List">Completed</button>
  <br />
  <button v-if="completeIdList.length > 0" @click="remove_List">Remove Completed</button>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
