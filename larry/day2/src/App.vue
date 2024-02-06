<template>
  <div>
    <div>
      <input v-model="new_item" />
      <button @click="new_item_click" :disabled="new_item.length === 0">新增</button>
    </div>
    <ul v-for="(item, i) in display_list" :key="i">
      <li>

        <input type="checkbox" :id="i" v-model="item.is_completed" />
        <label for="i">{{ item.name }}</label>
        <button @click="on_item_editing_click(item)">編輯</button>
        <button @click="on_item_delete_click(item)">刪除</button>
      </li>
    </ul>

    <span>{{ remain_todo_count}} items left</span>
    <button @click="display_all_todo_list()">顯示全部</button>
    <button @click="display_completed_todo_list()">顯示已完成</button>
    <button @click="display_uncompleted_todo_list()">顯示未完成</button>
    <button @click="clear_completed_todo_items()">清除完成項目</button>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

let new_item = ref('')

let todo_list = ref([
  // {
  //   name: 'hello world1',
  //   is_completed: false,
  //   is_editing: false
  // },
  // {
  //   name: 'hello world2',
  //   is_completed: true,
  //   is_editing: false
  // },
  // {
  //   name: 'hello world3',
  //   is_completed: true,
  //   is_editing: false
  // }
])

let display_type = ref(0) // 0: all , 1: completed, 2: active
let display_list = computed(() => {
  switch (display_type.value) {
    default:
      return [...todo_list.value]
    case 1: // completed
      return todo_list.value.filter((to_do) => to_do.is_completed)
    case 2: // active
      return todo_list.value.filter((to_do) => !to_do.is_completed)
  }
})

let remain_todo_count = computed(()=>{
  return todo_list.value.filter((todo)=>!todo.is_completed).length
})

let new_item_click = () => {
  todo_list.value.push({
    name: new_item.value,
    is_completed: false,
    is_editing: false
  })
  new_item.value = ''
}

let on_item_editing_click = (item) => {
  item.is_editing = true
}

let on_item_delete_click = (item) => {
  todo_list.value = todo_list.value.filter((to_do) => to_do.name !== item.name)
}

let display_all_todo_list = ref(() => {
  display_type.value = 0
})

let display_completed_todo_list = ref(() => {
  display_type.value = 1
})

let display_uncompleted_todo_list = ref(() => {
  display_type.value = 2
})

let clear_completed_todo_items = ref(() => {
  todo_list.value = todo_list.value.filter((to_do) => !to_do.is_completed)
})


</script>

<style scoped></style>
