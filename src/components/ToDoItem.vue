<template>
  <a-layout
    class="todo-card"
    :class="{
      complete: todo.complete,
      incomplete: !todo.complete
    }"
  >
    <a-checkbox
      v-if="todo.title !== ''"
      :defaultChecked="todo.complete"
      @change="onChange(todo)"
      >{{ todo.title }}</a-checkbox
    >
    <a-input-search
      v-else
      size="large"
      placeholder="Enter a todo!"
      enter-button="Add"
      @search="addTodo"
    />
  </a-layout>
</template>

<script>
const STORAGE_KEY = 'dsm-todos'
const todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
const findToDoIndex = id => todos.findIndex(todo => todo.id === Number(id))

export default {
  props: ['todoItem'],
  data: function() {
    return {
      todo: this.todoItem
    }
  },
  methods: {
    onChange(todo) {
      const index = findToDoIndex(todo.id)

      todo.complete = !todo.complete

      todos[index] = todo

      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    },
    addTodo(value) {
      const index = findToDoIndex(this.todo.id)
      const newTodo = {
        id: this.todo.id,
        title: value,
        complete: false
      }

      this.todo = newTodo

      todos[index] = this.todo
      // eslint-disable-next-line
      console.table(todos)

      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
  }
}
</script>

<style scoped>
.todo-card {
  user-select: none;
  background-color: #fff;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.complete {
  text-decoration: line-through;
}
</style>
