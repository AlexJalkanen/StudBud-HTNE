<template>
  <div class="home">
    <v-row>
      <v-col>
        <p id="titlePhrase">Study Groups for Students by Students</p>
        <v-card
          class="mx-auto"
          max-width="550"
        >
          <v-card-text>
            <p class="display-1 text--primary">
              Your StudBud Groups
            </p>
           <v-divider></v-divider>
          </v-card-text>
          <v-card-text>
            <p class="text--medium">
              {{groups}}
            </p>
          </v-card-text>


          <v-divider></v-divider>
          <v-card-actions align="center" :loading="loading" 
            loading-text="Loading... Please wait">
            <v-btn
              text
              color="Primary"
              to="/join"
            >
              Join another
            </v-btn>
            <v-btn
              text
              color="Primary"
              to="/create"
            >
              Create your own
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
      <v-col align="right">
        <v-card flat>
          Join a StudBud group or create your own!
        </v-card>
        
        <img id="mainPic" alt="StudBud" src="../assets/studygroup.png">
      </v-col>
    </v-row>
    
    
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Home',
  components: {
    
  },
  data() {
    return {
      loading: true,
      groups: [],
      items: []
    }
  },
  async mounted () {
    try {
        const response = await axios.get('https://8wugvfc99e.execute-api.us-east-2.amazonaws.com/prod/buds/guestUser@studbud-htne.com');
        this.groups = response.data["Item"]["groups"];
        // this.groups.forEach(function (item, index) {
        //   console.log(item, index);
        //   const newresponse = axios.get('https://8wugvfc99e.execute-api.us-east-2.amazonaws.com/prod/sbr/' + item);
        //   this.items = newresponse.data["Items"];
        // });
    }
    catch (error) {
        console.log(error)
    }
  },
}
</script>

<style scoped>
#mainPic {
  width: 700px;
  height: auto;
  border-radius: 10%;
  margin-right: -50px;
}

#titlePhrase {
  font-size: 30px;
}

html, body {margin: 0; height: 100%; overflow: hidden}
</style>
