<template>
  <div>
    <div>
      <input v-model="new_item" />
      <button @click="new_item_click" :disabled="add_new_item_disabled()">新增</button>
    </div>
    <ul v-for="(item, i) in display_list" :key="i">
      <li>
        <span v-if="item.is_editing">
          <input v-model="item_edit_tmp_name" />
          <button @click="on_item_editing_save_click(item, item_edit_tmp_name)">儲存</button>
          <button @click="on_item_editing_cancel_click(item)">取消</button>
        </span>
        <span v-else>
          <input type="checkbox" :id="i" v-model="item.is_completed" />
          <label for="i">{{ item.name }}</label>
          <button @click="on_item_editing_click(item)">編輯</button>
          <button @click="on_item_delete_click(item)">刪除</button>
        </span>
      </li>
    </ul>

    <span>{{ remain_todo_count }} items left</span>
    <button @click="display_all_todo_list()">顯示全部</button>
    <button @click="display_completed_todo_list()">顯示已完成</button>
    <button @click="display_uncompleted_todo_list()">顯示未完成</button>
    <button @click="clear_completed_todo_items()">清除完成項目</button>
    <div>顯示清單類型: {{ display_type_name }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
// Sam: 專案沒安裝 ESLint 與 Prettier
// Sam: 應該要有 .eslintrc.cjs 與 .prettierrc.json 檔案

// Sam: state 與 function 命名建議改用 JavaScript 慣用的小駝峰
let new_item = ref('')

let todo_list = ref([])


// Sam: 建議不要使用 magic number, 用 string、enum 或 function 可讀性會更高
let display_type = ref(0) // 0: all , 1: 完成, 2: 未完成
let display_type_name = computed(() => {
  switch (display_type.value) {
    default:
      return '全部'
    case 1: // completed
      return '完成'
    case 2: // active
      return '未完成'
  }
})

let display_list = computed(() => {
  switch (display_type.value) {
    default:
      return [...todo_list.value]
    case 1: // 完成
      return todo_list.value.filter((to_do) => to_do.is_completed)
    case 2: // 未完成
      return todo_list.value.filter((to_do) => !to_do.is_completed)
  }
})

let remain_todo_count = computed(() => {
  return todo_list.value.filter((todo) => !todo.is_completed).length
})

let add_new_item_disabled = () => {
  if (new_item.value.length === 0) return true

  let has_the_same_name_items = todo_list.value.filter((todo) => todo.name === new_item.value)
  if (has_the_same_name_items.length > 0) {
    return true
  }

  return false
}

let new_item_click = () => {
  todo_list.value.push({
    name: new_item.value,
    is_completed: false,
    is_editing: false
  })
  new_item.value = ''
}
// Sam: 沒跑過 Perttier 所以 function 間有兩行空白

let item_edit_tmp_name = ref('')

let on_item_editing_click = (item) => {
  item.is_editing = true
  item_edit_tmp_name.value = item.name
}

let on_item_editing_save_click = (item, new_name) => {
  item.name = new_name
  item.is_editing = false
  item_edit_tmp_name.value = ''
}

let on_item_editing_cancel_click = (item) => {
  item_edit_tmp_name.value = ''
  item.is_editing = false
}

let on_item_delete_click = (item) => {
  // Sam: 用名稱當 key 值去刪除有風險，若有 name 一樣，只刪除一筆會變成相同名稱都刪掉
  // Sam: 還是要該有個欄位當 key 值
  todo_list.value = todo_list.value.filter((to_do) => to_do.name !== item.name)
}

let display_all_todo_list = ref(() => {
  // Sam: 可嘗試不要用 magic number
  // Sam: 傳 string `all`、用 Object 模擬 enum，或乾脆傳 function 皆可
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
