<template>
  <div>
    <div class="todos-container">
      <div
        class="todo-card"
        v-for="todo in todos"
        :key="todo.id"
        @click="completeTodo(todo)"
        :class="{
          complete: todo.complete,
          incomplete: !todo.complete
        }"
      >
        <h2>{{ todo.title }}</h2>
      </div>
    </div>
    <form class="edit-form" @submit.prevent="save(todos)">
      <input
        type="text"
        v-for="todo in todos"
        :key="todo.id"
        v-model="todo.title"
      />
      <div class="edit-form__action-bar">
        <input type="submit" value="Save" />
        <button @click="clearTodos()">Reset Todos</button>
      </div>
    </form>
  </div>
</template>

<script>
const STORAGE_KEY = 'one-big-thing'
const baseTodos = [
  { id: 0, title: 'Big Todo!', complete: false },
  { id: 1, title: 'Little Todo #1', complete: false },
  { id: 2, title: 'Little Todo #2', complete: false },
  { id: 3, title: 'Little Todo #3', complete: false }
]

export default {
  data: function() {
    return {
      todos: this.fetchTodos()
    }
  },
  methods: {
    save(todos) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    },
    fetchTodos() {
      const todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || baseTodos
      return todos
    },
    clearTodos() {
      this.todos = baseTodos
    },
    completeTodo(todo) {
      todo.complete = !todo.complete
      this.save(this.todos)
    }
  }
}
</script>

<style scoped>
.todos-container {
  height: 50%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr;
}

.todos-container .todo-card:first-of-type {
  grid-column: span 3;
  height: 15rem;
  font-size: 3rem;
}

.todo-card {
  margin: 0.5rem;
  cursor: pointer;
  user-select: none;
  background-color: lightgreen;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.complete {
  text-decoration: line-through;
  background-color: lightcoral;
}

.edit-form {
  margin-top: 2.5rem;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: space-around;
  padding: 1.5rem;
  margin: 0.5rem 0.5rem;
  background-color: lightblue;
}

.edit-form__action-bar {
  display: flex;
}
</style>
