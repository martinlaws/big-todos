<template>
  <div :class="{ 'todo-input': this.todo.content === '' }">
    <div class="todo-card__header" v-if="this.size !== 'small'">
      {{ todo.title }}
    </div>
    <div class="todo-card__content">
      <div
        v-if="todo.content !== ''"
        :class="{
          'todo-card__content--saved': true,
          'todo-card--complete': todo.complete
        }"
      >
        <a-checkbox @change="completeTodo" :checked="todo.complete" />
        <p @click="completeTodo">
          {{ todo.content }}
        </p>
      </div>
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
        title: this.todo.title,
        content: value,
        complete: false
      }

      this.todo = newTodo

      this.$emit('save-todos', newTodo, this.size)
    }
  }
}
</script>

<style lang="scss" scoped>
.todo-card {
  &__header {
    padding: 1rem;
    border-bottom: 1px solid #d8d8d8;
    font-size: 2rem;
  }

  &--complete {
    text-decoration: line-through;
  }

  &__content {
    padding: 1.5rem;
    user-select: none;

    &--saved {
      display: grid;
      grid-template-columns: 2rem 1fr;
      text-align: start;
      font-size: 1rem;
    }

    &.small-todos-container .todo-card__content {
      padding: 0 1.5rem;
    }
  }
}
</style>
