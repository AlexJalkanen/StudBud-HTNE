<template>
  <div id="app">
    <StudBudRequests v-bind:studbudrequests="studbudrequests"/>
  </div>
</template>

<script>
import StudBudRequests from './components/StudBudRequests';

export default {
  name: 'App',
  components: {
    StudBudRequests
  },
  data() {
    return {
      studbudrequests: [
        {
          host: "amanzhan@umich.edu",
          firstname: "Amanda",
          lastname: "Zhang"
        },
        {
          host: "ariflynn@umich.edu",
          firstname: "Ari",
          lastname: "Schwartz"
        },
        {
          host: "jbandon@umich.edu",
          firstname: "Jack",
          lastname: "Bandon"
        }
      ]
    }
  }
}
</script>

<style>
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
  }
</style>
