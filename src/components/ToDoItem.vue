<template>
  <div>
    <div class="todo-card__header" v-if="this.size !== 'small'">
      {{ todo.title }}
    </div>
    <div class="todo-card__content">
      <a-checkbox
        :class="{ complete: todo.complete }"
        v-if="todo.content !== ''"
        :defaultChecked="todo.complete"
        @change="completeTodo"
      >
        {{ todo.content }}
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

<style scoped>
.complete {
  text-decoration: line-through;
}

.todo-card__header {
  padding: 1rem;
  border-bottom: 1px solid #d8d8d8;
  font-size: 2rem;
}

.todo-card__content {
  padding: 1.5rem;
  user-select: none;
}
</style>
