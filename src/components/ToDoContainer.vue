<template>
  <a-layout>
    <a-layout-header class="app-header">
      Header
      <a-button type="primary" @click="clearTodos()">Reset</a-button>
    </a-layout-header>

    <a-layout-content class="app-container">
      <div class="todos-container">
        <ToDoItem
          v-for="todoItem in todos"
          :key="todoItem.id"
          @click="completeTodo(todoItem)"
          :todoItem="todoItem"
        />
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import STORAGE_KEY from '@/utils/storage-key'
import ToDoItem from '@/components/ToDoItem.vue'

const baseTodos = [
  { id: 0, title: '', complete: false },
  { id: 1, title: '', complete: false },
  { id: 2, title: '', complete: false },
  { id: 3, title: '', complete: false }
]

export default {
  data: function() {
    return {
      todos: this.fetchTodos()
    }
  },
  components: { ToDoItem },
  methods: {
    fetchTodos() {
      const todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || baseTodos
      return todos
    },
    clearTodos() {
      this.todos = baseTodos

      // eslint-disable-next-line
      console.table(this.todos)

      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))

      this.$emit('clear-todos', baseTodos)
    },
    completeTodo(todo) {
      todo.complete = !todo.complete
      this.save(this.todos)
    }
  }
}
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.app-container {
  min-height: 100vh;
  max-width: 1020px;
  margin: auto;
}

.todos-container {
  width: 100%;
  padding: 2rem 1.75em;
  display: flex;
  flex-flow: column nowrap;
}

@media only screen and (min-width: 750px) {
  .todos-container {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
  }

  .todos-container .todo-card:first-of-type {
    grid-column: span 3;
    font-size: 3rem;
  }
}
</style>
