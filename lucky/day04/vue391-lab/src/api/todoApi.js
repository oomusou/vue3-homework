import axios from 'axios'

export let addItem = async (item) => {
  let url = 'http://localhost:3000/items'

  let body = {
    // id: Date.now(),
    name: item,
    isCompleted: false,
    isEdit: false
  }

  try {
    let { data } = await axios.post(url, body)
    return data
  } catch (e) {
    console.error(e)
  }
}

export let getItems = async () => {
  let url = 'http://localhost:3000/items'

  try {
    let { data } = await axios.get(url)
    return data
  } catch (e) {
    console.error(e)
  }
}

export let saveItem = async (item) => {
  let url = `http://localhost:3000/items/${item.id}`

  let body = {
    isCompleted: item.isCompleted,
    name: item.name
  }

  try {
    let { data } = await axios.put(url, body)
    return data
  } catch (e) {
    console.error(e)
  }
}

export let delItem = async (item) => {
  let url = `http://localhost:3000/items/${item.id}`

  try {
    let { data } = await axios.delete(url)
    return data
  } catch (e) {
    console.error(e)
  }
}
