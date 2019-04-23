<template>
  <div>
    <a-layout-header class="app-header">
      <div class="logo">
        <span>
          DSM Proof of Concept
        </span>
        <a href="https://github.com/martinlaws/dsm-todos">
          <a-icon type="github" />
        </a>
      </div>
      <a-button type="primary" @click="emitReset()">Reset</a-button>
    </a-layout-header>
  </div>
</template>

<script>
export default {
  methods: {
    emitReset: function() {
      this.$emit('reset-todos')
    }
  }
}
</script>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
}

.logo a {
  margin-left: 10px;
}
</style>
