<template>
  <div id="app">
    <ToDoContainer />

    <pre>
      <code>
        {{JSON.stringify(localDSMVariables)}}
      </code>
    </pre>
  </div>
</template>

<script>
import ToDoContainer from '@/components/ToDoContainer'
import fetch from 'node-fetch'

export default {
  name: 'app',
  components: {
    ToDoContainer
  },
  created() {
    this.fetchDSMVariables()
  },
  data() {
    return {
      localDSMVariables: null
    }
  },
  methods: {
    fetchDSMVariables() {
      fetch(
        'https://projects.invisionapp.com/dsm-export/low-tide/milk-dud/style-data.json?exportFormat=list&key=H1AY3v6_4'
      )
        .then(response => {
          if (response.status !== 200) {
            // eslint-disable-next-line
            console.error(`ERROR: ${response.status}`)
          }

          response.json().then(data => {
            // eslint-disable-next-line
            console.log('DATA:', data.list)
            this.localDSMVariables = data.list
            return
          })
        })
        .catch(error => {
          // eslint-disable-next-line
          console.error(error)
        })
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
