<template>
  <div>
    <a-layout-header class="app-header">
      <div class="logo">
        <span>DSM Proof of Concept</span>
        <a href="https://github.com/martinlaws/dsm-todos" target="_blank">
          <a-icon type="github" />
        </a>
      </div>
      <span class="app-header__action-buttons">
        <a-button type="default" @click="showModal"
          >View DSM Variables</a-button
        >
        <a-button type="primary" @click="emitReset">Reset</a-button>
      </span>
    </a-layout-header>

    <a-modal title="DSM Variables" v-model="visible">
      <pre><code>{{ localDSMVariables }}</code></pre>

      <template slot="footer">
        <a-button key="submit" type="primary" @click="hideModal"
          >Close</a-button
        >
      </template>
    </a-modal>
  </div>
</template>

<script>
import formattedDSMVariables from '@/assets/dsm-styles.json'

export default {
  data() {
    return {
      visible: false,
      localDSMVariables: formattedDSMVariables
    }
  },
  methods: {
    showModal() {
      this.visible = true
    },
    hideModal() {
      this.visible = false
    },
    emitReset() {
      this.$emit('reset-todos')
    }
  }
}
</script>

<style lang="scss" scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;

  &__action-buttons button,
  .logo a {
    margin-left: 0.5rem;
  }
}
</style>
