<template>
  <input v-model="newItem" />
  <button @click="onClick">Add</button>
  <ul>
    <li v-for="(item, i) in filterItems" :key="i">
      <input type="checkbox" :id="i" :value="item.name" v-model="item.isCompleted" />
      <label :for="i">{{ item.name }}</label>
      <span v-if="!item.isEdit"> </span>
      <span v-else>
        <input type="text" v-model="item.name" />
      </span>
      <span v-if="!item.isEdit">
        <button @click="item.isEdit = true">Edit</button>
      </span>
      <span v-else>
        <button @click="item.isEdit = false">Save</button>
      </span>
      <span>
        <button @click="onClickDeleted(i)">Delete</button>
      </span>
    </li>
  </ul>
  <div>
    <span>{{ filterItems.length }} items left</span>
    <button @click="filterFlag = 0">All</button>
    <button @click="filterFlag = 1">Active</button>
    <button @click="filterFlag = 2">Completed</button>
    <button v-if="hasCompletedItems" @click="onClickClearCompleted">Clear Completed</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

let newItem = ref('')

let items = ref([
  // { name: 'Apple', isCompleted: false, isEdit: false },
  // { name: 'Google', isCompleted: false, isEdit: false },
  // { name: 'Microsoft', isCompleted: false, isEdit: false }
])

const filterFlag = ref(0) // 0: all, 1: active, 2: completed
const filterItems = computed(() => {
  switch (filterFlag.value) {
    case 1:
      return items.value.filter((item) => !item.isCompleted)
    case 2:
      return items.value.filter((item) => item.isCompleted)
    default:
      return [...items.value] // 不篩選，返回原始副本
  }
})

const hasCompletedItems = computed(() => {
  return items.value.some((item) => item.isCompleted)
})

let onClick = () => {
  if (newItem.value.trim().length > 0) {
    const newArrayItem = { name: newItem.value, isCompleted: false, isEdit: false }
    items.value.push(newArrayItem)
    newItem.value = ''
  }
}

let onClickDeleted = (i) => {
  items.value.splice(i, 1)
  filterItems.value = [...items.value]
}

let onClickClearCompleted = () => {
  items.value = items.value.filter((item) => !item.isCompleted)
}
</script>
