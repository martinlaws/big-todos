<template>
  <div>
    <a-collapse>
      <a-collapse-panel header="View live DSM variables">
        <pre>
          <code>
{{ originalDSMVariables }}
          </code>
        </pre>
      </a-collapse-panel>
      <a-collapse-panel header="View massaged DSM variables">
        <pre>
          <code>
{{ localDSMVariables }}
          </code>
        </pre>
      </a-collapse-panel>
    </a-collapse>
  </div>
</template>

<script>
import fetch from 'node-fetch'

export default {
  created() {
    this.fetchDSMVariables()
  },
  data() {
    return {
      originalDSMVariables: {},
      localDSMVariables: {}
    }
  },
  methods: {
    fetchDSMVariables() {
      fetch(
        'https://projects.invisionapp.com/dsm-export/low-tide/milk-dud/style-data.json?exportFormat=list&key=H1AY3v6_4'
      )
        .then(response => {
          if (response.status !== 200) {
            return `ERROR: ${response.status}`
          }

          response.json().then(data => {
            // eslint-disable-next-line
            console.log('DATA:', data.list)
            this.originalDSMVariables = data.list

            this.massageDSMVariables(data.list)
          })
        })
        .catch(error => error)
    },
    massageDSMVariables(DSMVariables) {
      const obj = {}

      const formattedVariables = DSMVariables.colors.map(variableGroup => {
        variableGroup.colors.map(individualVariable => {
          obj[`${individualVariable.name}`] = individualVariable.value
        })

        return obj
      })

      this.localDSMVariables = formattedVariables[0]
    }
  }
}
</script>

<style scoped></style>
