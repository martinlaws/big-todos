<template>
  <div
    :class="{
      complete: todo.complete,
      incomplete: !todo.complete
    }"
  >
    <div class="todo-card__header">
      Title goes here
    </div>
    <div class="todo-card__content">
      <a-checkbox
        v-if="todo.title !== ''"
        :defaultChecked="todo.complete"
        @change="completeTodo"
      >
        {{ todo.title }}
      </a-checkbox>
      <a-input-search
        v-else
        placeholder="Enter a todo!"
        enter-button="Add"
        @search="addTodo"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: ['todoItem', 'size'],
  data: function() {
    return {
      todo: this.todoItem
    }
  },
  watch: {
    todoItem: function(newVal) {
      this.todo = newVal
    }
  },
  methods: {
    completeTodo() {
      this.todo.complete = !this.todo.complete

      this.$emit('complete-todo', this.todo)
    },
    addTodo(value) {
      const newTodo = {
        id: this.todo.id,
        title: value,
        complete: false
      }

      this.todo = newTodo

      this.$emit('save-todos', newTodo, this.size)
    }
  }
}
</script>

<style scoped>
.complete {
  text-decoration: line-through;
}

.todo-card__content {
  padding: 1.5rem;
}
</style>
