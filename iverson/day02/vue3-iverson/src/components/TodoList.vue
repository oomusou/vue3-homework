<template>
  <input type="text" v-model="name" />
  &nbsp;
  <button @click="addItem">Add</button>
  <br />
  <br />
  <ul>
    <li v-for="(item, i) in showItems" :key="i">
      <input type="checkbox" v-model="item.isChecked" @change="changeCheckbox($event, item.id)" />
      &nbsp;
      <span v-if="!item.isEdit">
        {{ item.name }}
      </span>
      <span v-else>
        <input type="text" v-model="item.name" />
      </span>
      &nbsp;
      <span v-if="!item.isEdit">
        <button @click="item.isEdit = true">Edit</button>
      </span>
      <span v-else>
        <button @click="item.isEdit = false">Save</button>
      </span>
      &nbsp;
      <button @click="deleteItem($event, item.id)">Delete</button>
    </li>
  </ul>
  <br />
  <br />
  {{ count }} items left! &nbsp;
  <button @click="showAll">All</button>
  &nbsp;
  <button @click="showActive">Active</button>
  &nbsp;
  <button @click="showCompleted">Completed</button>
  &nbsp;
  <button @click="clearCompleted" v-show="showClearButton">Clear Completed</button>
</template>

<script setup>
import { ref, computed } from 'vue'
// data
let maxId = 0
// ref
let name = ref('')
let items = ref([])
// computed
let count = computed(() => items.value.length)
let showItems = computed(() => items.value.filter((item) => item.isShow))
let showClearButton = computed(
  () => items.value.filter((item) => item.isShow && item.isChecked).length
)
// methods
let addItem = () => {
  console.log('addItem', 'name: ' + name.value)
  name.value = name.value.trim()
  if (name.value == '') return
  items.value.push({ id: ++maxId, name: name.value, isEdit: false, isShow: true, isChecked: false })
  name.value = ''
}
let deleteItem = (event, id) => {
  console.log('deleteItem', 'id: ' + id)
  items.value = items.value.filter((item) => item.id != id)
}
let changeCheckbox = (event, id) => {
  console.log('changeCheckbox', 'id: ' + id)
}
let showAll = () => {
  console.log('showAll')
  items.value.map((item) => (item.isShow = true))
}
let showActive = () => {
  console.log('showActive')
  items.value.map((item) => {
    if (!item.isChecked) item.isShow = true
    else item.isShow = false
  })
}
let showCompleted = () => {
  console.log('showCompleted')
  items.value.map((item) => {
    if (item.isChecked) item.isShow = true
    else item.isShow = false
  })
}
let clearCompleted = () => {
  console.log('clearCompleted')
  items.value = items.value.filter((item) => item.isChecked == false)
}
</script>
