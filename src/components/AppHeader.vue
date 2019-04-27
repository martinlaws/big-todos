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
      <span class="app-header__action-buttons">
        <a-button type="default" @click="showModal">View DSM</a-button>
        <a-button type="primary" @click="emitReset">Reset</a-button>
      </span>
    </a-layout-header>

    <a-modal title="Basic Modal" v-model="visible" @ok="handleOk">
      <DSMContainer />
    </a-modal>
  </div>
</template>

<script>
import DSMContainer from '@/components/DSMContainer'

export default {
  data() {
    return {
      visible: false
    }
  },
  methods: {
    showModal() {
      this.visible = true
    },
    handleOk() {
      this.visible = false
    },
    emitReset() {
      this.$emit('reset-todos')
    }
  },
  components: {
    DSMContainer
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

.app-header__action-buttons button,
.logo a {
  margin-left: 0.5rem;
}
</style>
