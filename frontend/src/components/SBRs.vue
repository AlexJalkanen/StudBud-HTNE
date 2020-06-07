<template>
    <v-card>
        <v-card-title>
            StudBud Requests
            <v-spacer></v-spacer>
            <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
            ></v-text-field>
        </v-card-title>
        <v-data-table
            :headers="headers"
            :items="items"
            :items-per-page="10"
            class="elevation-1"
            :loading="loading" 
            loading-text="Loading... Please wait"
            show-expand
            single-expand
            :expanded.sync="expanded"
        >
            <template v-slot:expanded-item="{ headers, item }">
                <td :colspan="headers.length">
                    <v-row>
                        <v-col align="start">
                            <v-list-item flat two-line>
                            <v-list-item-content>
                            <v-list-item-title>Location</v-list-item-title>
                            <v-list-item-subtitle>{{item.location}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-list-item flat two-line>
                            <v-list-item-content>
                            <v-list-item-title>School</v-list-item-title>
                            <v-list-item-subtitle>{{item.school}}</v-list-item-subtitle>
                            </v-list-item-content>
                        </v-list-item>

                        <v-btn small color="primary" class="mb-2 ml-3 mt-1">Join StudBud Group</v-btn>
                        </v-col>
                        <v-col align="start">
                            <v-list flat>
                            <v-title>{{item.studbuds.length}} / {{item.maxPeople}} StudBuds have already joined.</v-title>
                            <v-list-item
                                v-for="(sb, i) in item.studbuds"
                                :key="i"
                            >
                                <v-list-item-icon>
                                    <v-icon size="15">fa-users</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-subtitle>{{sb}}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                        </v-col>
                    </v-row>              
                </td>
            </template>
        </v-data-table>
    </v-card>
    
</template>

<script>
import axios from 'axios'
export default {
  name: 'SBRs',
  data () {
    return {
      loading: true,
      expanded: [],
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
        this.loading = false;
    }
    catch (error) {
        console.log(error)
    }
  },
}
</script>

<style scoped>

</style>