<template>
  <input v-model="newItem" />
  <button @click="onClickAdd">Add</button>
  <ul>
    <li v-for="(item, i) in filterItems" :key="i">
      <input type="checkbox" :id="i" v-model="item.isCompleted" />
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
        <button @click="onClickDeleted(item.id)">Delete</button>
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
      // Sam: 直接 return items 即可
      // return items // 不能直接返回 items, 需用[...items.value]複製一份新副本，否則一開始執行會出錯
      return [...items.value] // 不篩選，返回原始副本
  }
})

const hasCompletedItems = computed(() => {
  return items.value.some((item) => item.isCompleted)
})

// Sam: 命名要明確一點，要能看出是 Add
let onClickAdd = () => {
  if (newItem.value.trim().length > 0) {
    const newArrayItem = { id: Date.now(), name: newItem.value, isCompleted: false, isEdit: false }
    items.value.push(newArrayItem)
    newItem.value = ''
  }
}

// Sam: 直接拿 v-for 的 index 去刪除有風險
// Sam: Test case
// 01. 新增 111, 222, 333 三筆
// 02. 222 -> 勾選完成
// 03. 下方選擇 Active，刪除 333，會發現 222 被刪除了

let onClickDeleted = (id) => {
  // Sam: splice() 是直接去刪除 items array，刪除後 filterItems computed 會自動觸發更新
  // items.value.splice(i, 1)
  items.value = items.value.filter((item) => item.id !== id)

  // Sam: 下面這行觀念有錯，computed 無法用 .value 去指定
  // filterItems.value = [...items.value]
}

let onClickClearCompleted = () => {
  items.value = items.value.filter((item) => !item.isCompleted)
}
</script>
