<template>
  <a-layout class="full-height container">
    <AppHeader @reset-todos="clearTodos" />

    <a-layout-content class="app-container">
      <div class="todo-list">
        <ToDoItem
          class="todo-card"
          v-for="todoItem in todos.todos"
          :key="todoItem.id"
          :todoItem="todoItem"
          @save-todos="saveTodoItem"
          @complete-todo="saveTodoItem"
        />
        <div class="todo-card small-todos-container">
          <ToDoItem
            v-for="item in todos.smallTodos"
            :key="item.id"
            :todoItem="item"
            class="small-todo"
            @save-todos="saveSmallTodoItem"
            @complete-todo="completeSmallTodoItem"
          />
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import ToDoItem from '@/components/ToDoItem.vue'
import AppHeader from '@/components/AppHeader.vue'
import STORAGE_KEY from '@/utils/storage-key'
import BASE_TODOS from '@/utils/base-todos'

export default {
  data: function() {
    return {
      todos: this.fetchTodos()
    }
  },
  components: { ToDoItem, AppHeader },
  methods: {
    fetchTodos() {
      const todos = JSON.parse(localStorage.getItem(STORAGE_KEY)) || BASE_TODOS
      return todos
    },
    clearTodos() {
      this.todos = BASE_TODOS

      this.saveTodos(BASE_TODOS)
    },
    saveTodoItem(todo) {
      const todos = this.todos

      const findToDoIndex = todo =>
        todos.todos.findIndex(todoItem => todoItem.id === todo.id)

      const todoIndex = findToDoIndex(todo)

      todos.todos[todoIndex] = todo

      this.saveTodos(todos)
    },
    saveSmallTodoItem(todo) {
      const todos = this.todos

      const findSmallToDoIndex = (todo, todos) =>
        todos.smallTodos.findIndex(todoItem => todoItem.id === todo.id)

      const todoIndex = findSmallToDoIndex(todo, todos)

      todos.smallTodos[todoIndex] = todo

      if (todo.title !== '') {
        this.createNewSmallTodoItem()
      }

      this.saveTodos(todos)
    },
    completeSmallTodoItem(todo) {
      const todos = this.todos

      const findToDoIndex = todo =>
        todos.smallTodos.findIndex(todoItem => todoItem.id === todo.id)

      const todoIndex = findToDoIndex(todo)

      todos.smallTodos[todoIndex] = todo

      this.saveTodos(todos)
    },
    createNewSmallTodoItem() {
      const newTodo = {
        id: this.todos.smallTodos.length + 1,
        title: '',
        complete: false
      }

      this.todos.smallTodos.push(newTodo)
    },
    saveTodos(todos) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
    }
  }
}
</script>

<style>
.full-height.container {
  min-height: 100vh;
}

.app-container {
  width: 85vw;
  max-width: 900px;
  margin: auto;
}

.todo-list {
  padding: 2rem 1.75em;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

.todo-card {
  min-height: 15rem;
  background-color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.todo-card.small-todos-container {
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 2rem;
  column-gap: 4rem;
  row-gap: 1rem;
}

@media only screen and (min-width: 750px) {
  .todo-list {
    grid-template-columns: repeat(3, 1fr);
  }

  .todo-list .todo-card:first-of-type {
    grid-column: span 3;
    font-size: 3rem;
  }

  .todo-card.small-todos-container {
    grid-column: span 3;
    grid-template-columns: 1fr 1fr;
  }
}
</style>
