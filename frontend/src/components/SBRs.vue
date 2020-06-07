<template>
    <v-data-table
      :headers="headers"
      :items="items"
      :items-per-page="10"
      class="elevation-1"
    ></v-data-table>
</template>

<script>
import axios from 'axios'
export default {
  name: 'SBRs',
  data () {
    return {
      headers: [
        {
          text: 'Host',
          align: 'start',
          sortable: false,
          value: 'host',
        },
        { text: 'Subject', value: 'subject' },
        { text: 'Virtual', value: 'virtual' },
        { text: 'Start Time', value: 'starttime' },
        { text: 'End Time', value: 'endtime' },
        { text: 'Max StudBuds', value: 'maxPeople' },
        { text: 'School', value: 'school' },
        { text: 'Location', value: 'location' },
        //     created: created,
        //     starttime: starttime,
        //     endtime: endtime,
        //     open: open,
        //     maxPeople: maxPeople,
        //     location: location,
        //     school: school,
        //     subject: subject,
        //     virtual: virtual, 
        //     studbuds: studbuds
      ],
      items: []
    }
  },
  async mounted () {
    try {
        const response = await axios.get('https://8wugvfc99e.execute-api.us-east-2.amazonaws.com/prod/sbr');
        this.items = response.data["Items"];
    }
    catch (error) {
        console.log(error)
    }
  },
}
</script>

<style scoped>

</style>