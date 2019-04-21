<template>
  <div
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
  </div>
</template>

<script>
import STORAGE_KEY from '@/utils/storage-key'
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
      todo.complete = !todo.complete

      this.saveTodo(todo)
    },
    addTodo(value) {
      const newTodo = {
        id: this.todo.id,
        title: value,
        complete: false
      }

      this.todo = newTodo

      this.saveTodo(newTodo)
    },
    saveTodo(todo) {
      const index = findToDoIndex(todo.id)

      todos[index] = todo

      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
  }
}
</script>

<style scoped>
.todo-card {
  height: 17rem;
  user-select: none;
  background-color: #fff;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 2rem;
}

.complete {
  text-decoration: line-through;
}

@media only screen and (min-width: 750px) {
  .todo-card {
    margin-bottom: 0;
  }
}
</style>
