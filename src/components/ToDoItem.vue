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
      @change="onChange(todo)"
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
    onChange(todo) {
      todo.complete = !todo.complete

      this.emitComplete(todo)
    },
    addTodo(value) {
      const newTodo = {
        id: this.todo.id,
        title: value,
        complete: false
      }

      this.todo = newTodo

      this.emitSave(newTodo)
    },
    emitSave(todo) {
      this.$emit('save-todos', todo)
    },
    emitComplete(todo) {
      this.$emit('complete-todo', todo)
    }
  }
}
</script>

<style scoped></style>
