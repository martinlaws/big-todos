<template>
  <div
    :class="{
      complete: todo.complete,
      incomplete: !todo.complete
    }"
  >
    <a-checkbox
      v-if="todo.title !== ''"
      :defaultChecked="todo.complete"
      @change="completeTodo(todo)"
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
</template>

<script>
export default {
  props: ['todoItem'],
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
    completeTodo(todo) {
      todo.complete = !todo.complete

      this.$emit('complete-todo', todo)
    },
    addTodo(value) {
      const newTodo = {
        id: this.todo.id,
        title: value,
        complete: false
      }

      this.todo = newTodo

      this.$emit('save-todos', newTodo)
    }
  }
}
</script>

<style scoped>
.complete {
  text-decoration: line-through;
}
</style>
