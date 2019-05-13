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
            v-for="smallTodoItem in todos.smallTodos"
            :key="smallTodoItem.id"
            :todoItem="smallTodoItem"
            size="small"
            @save-todos="saveTodoItem"
            @complete-todo="saveTodoItem"
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
  components: { ToDoItem, AppHeader },
  data: function() {
    return {
      todos: this.fetchTodos()
    }
  },
  methods: {
    fetchTodos() {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || BASE_TODOS
    },
    clearTodos() {
      this.todos = BASE_TODOS

      this.saveTodos(BASE_TODOS)
    },
    findToDoIndex(todo, size = null) {
      if (size === 'small') {
        return this.todos.smallTodos.findIndex(
          todoItem => todoItem.id === todo.id
        )
      }
      return this.todos.todos.findIndex(todoItem => todoItem.id === todo.id)
    },
    saveTodoItem(todo, size = null) {
      const todoIndex = this.findToDoIndex(todo, size)

      if (size === 'small') {
        this.todos.smallTodos[todoIndex] = todo

        if (todo.content !== '') this.createNewSmallTodoItem()
      } else {
        this.todos.todos[todoIndex] = todo
      }

      this.saveTodos()
    },
    createNewSmallTodoItem() {
      this.todos.smallTodos.push({
        id: this.todos.smallTodos.length + 1,
        content: '',
        complete: false
      })
    },
    saveTodos() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.todos))
    }
  }
}
</script>

<style lang="scss">
.full-height.container {
  min-height: 100vh;
}

.app-container {
  width: 85vw;
  max-width: 900px;
  margin: auto;
}

.todo-list {
  padding: 2rem 1.75rem;
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;

  @media only screen and (min-width: 750px) {
    grid-template-columns: repeat(3, 1fr);
  }
}

.todo-card {
  min-height: 15rem;
  background-color: #fff;
  border-radius: 8px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 5rem 2fr;
  text-align: center;
  font-size: 2rem;

  @media only screen and (min-width: 750px) {
    &:first-of-type {
      grid-column: span 3;
    }
  }

  &.small-todos-container {
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;

    @media only screen and (min-width: 750px) {
      grid-column: span 3;
    }

    .todo-input {
      order: -1;
    }
  }
}
</style>
