<template>
  <input v-model="newItem" />
  <button @click="onClickAdd">Add</button>
  <ul>
    <li v-for="(item, i) in filterItems" :key="i">
      <input type="checkbox" :id="i" v-model="item.isCompleted" />
      <label :for="i">{{ item.name }}</label>
      <span v-if="!item.isEdit">
        <button @click="onEdit(item)">Edit</button>
        <button @click="onClickDeleted(item)">Delete</button>
      </span>
      <span v-else>
        <input type="text" v-model="inputValue" />
        <button @click="onSave(item)">Save</button>
        <button @click="onCancel(item)">Cancel</button>
      </span>
    </li>
  </ul>
  <div>
    <!-- Sam: 需求是還剩下多少筆數沒完成，也就是 Active 的筆數，不是目前 filter 的筆數-->
    <span>{{ filterItems.length }} items left</span>
    <!--    Sam: 建議不要用 0, 1, 2 的 Magic Number，可讀性與維護性不佳-->
    <button @click="filterFlag = 0">All</button>
    <button @click="filterFlag = 1">Active</button>
    <button @click="filterFlag = 2">Completed</button>
    <button v-if="hasCompletedItems" @click="onClickClearCompleted">Clear Completed</button>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { addItem, getItems, saveItem, delItem } from '@/api/todoApi'

let newItem = ref('')

let items = ref([])

let inputValue = ref('')

const filterFlag = ref(0) // 0: all, 1: active, 2: completed
const filterItems = computed(() => {
  switch (filterFlag.value) {
    case 1:
      return items.value.filter((item) => !item.isCompleted)
    case 2:
      return items.value.filter((item) => item.isCompleted)
    default:
      // Sam: 直接 return items 即可
      // return items // 不能直接返回 items, 需用[...items.value]複製一份新副本，否則一開始執行會出錯
      return [...items.value] // 不篩選，返回原始副本
  }
})

const hasCompletedItems = computed(() => {
  return items.value.some((item) => item.isCompleted)
})

onMounted(async () => (items.value = await getItems()))

// Sam: 命名要明確一點，要能看出是 Add
let onClickAdd = async () => {
  if (newItem.value.trim().length > 0) {
    await addItem(newItem.value)
    // const newArrayItem = { id: Date.now(), name: newItem.value, isCompleted: false, isEdit: false }
    // items.value.push(newArrayItem)
    newItem.value = ''
    items.value = await getItems()
  }
}

let onEdit = (item) => {
  item.isEdit = true
}

let onSave = async (item) => {
  item.isEdit = false
  item.name = inputValue.value
  await saveItem(item)
}

let onCancel = (item) => {
  item.isEdit = false
}

// Sam: 直接拿 v-for 的 index 去刪除有風險
// Sam: Test case
// 01. 新增 111, 222, 333 三筆
// 02. 222 -> 勾選完成
// 03. 下方選擇 Active，刪除 333，會發現 222 被刪除了

let onClickDeleted = async (item) => {
  await delItem(item)
  // items.value = items.value.filter((item) => item.id !== id)
  items.value = await getItems()
}

let onClickClearCompleted = async () => {
  const completedItems = items.value.filter((item) => item.isCompleted)

  for (const item of completedItems) {
    await delItem(item)
  }

  items.value = await getItems()
}
</script>
