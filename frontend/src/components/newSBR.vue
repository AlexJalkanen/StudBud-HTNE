<template>
    <v-stepper v-model="e6" vertical>
        <v-stepper-step :complete="e6 > 1" step="1">
            Which class are you studying for?

            <v-stepper-content step="1">
                <v-text-field
                    v-model="subject"
                    :counter="20"
                    label="Subject"
                    required
                    class="mt-3">
                </v-text-field>
                <v-btn to="/" text>Cancel</v-btn>
                <v-btn color="primary" @click="e6 = 2">Continue</v-btn>
            </v-stepper-content>

        </v-stepper-step>

        <v-stepper-step :complete="e6 > 2" step="2">
            What time do you plan on studying?

            <v-stepper-content step="2">
                <v-text-field
                    v-model="starttime"
                    :counter="20"
                    label="Start Time"
                    required
                    class="mt-3">
                </v-text-field>
                <v-text-field
                    v-model="endtime"
                    :counter="20"
                    label="Approx End Time"
                    required
                    class="mt-3">
                </v-text-field>
                
                <v-btn @click="e6 = 1" text>Go Back</v-btn>
                <v-btn color="primary" @click="e6 = 3">Continue</v-btn>
            </v-stepper-content>

        </v-stepper-step>

        <v-stepper-step :complete="e6 > 3" step="3">
            Where do you plan on studying?

            <v-stepper-content step="3">
                <v-radio-group v-model="virtual" :mandatory="true">
                    <v-radio label="I plan to study in person." value="physical"></v-radio>
                    <v-radio label="I plan to study virtually." value="virtual"></v-radio>
                </v-radio-group>
                <v-text-field
                    v-model="location"
                    :counter="100"
                    label="Location/Meeting Link"
                    required
                    class="mt-3">
                </v-text-field>
                <v-btn @click="e6 = 2" text>Go Back</v-btn>
                <v-btn color="primary" @click="e6 = 4">Continue</v-btn>
                
            </v-stepper-content>

        </v-stepper-step>

        <v-stepper-step :complete="e6 > 4" step="4">
            StudBud Details

            <v-stepper-content step="4">
                
                <v-text-field
                    v-model="maxNumber"
                    type="number"
                    label="Max Number of Other StudBuds"
                    required
                    class="mt-3">
                </v-text-field>

                <v-text-field
                    v-model="email"
                    :counter="50"
                    label="Your Email Address"
                    required
                    class="mt-3">
                </v-text-field>

                <v-text-field
                    v-model="school"
                    :counter="50"
                    label="Your School"
                    required
                    class="mt-3">
                </v-text-field>
                <v-btn @click="e6 = 3" text>Go Back</v-btn>
                <v-btn color="primary" @click="e6 = 5; submit();">Submit StudBud Request</v-btn>
                
            </v-stepper-content>
        </v-stepper-step>

        <v-overlay :value="overlayLoad">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>

        <v-snackbar v-model="snackbar" :timeout="timeout">
            Success! You have registered your StudBud group!
            <v-btn color="blue" text @click="snackbar = false" >
                Close
            </v-btn>
        </v-snackbar>
    </v-stepper>
</template>


<script>
import axios from 'axios'

export default {
    name: "newSBR",
    data () {
        return {
            e6: 1,
            subject: '',
            starttime: '',
            endtime: '',
            location: '',
            virtual: 'physical',
            maxNumber: 0,
            email: '',
            school: '',
            overlayLoad: false,
            snackbar: false,
            timeout: 5000,
        }
    },
    methods: {
        async submit () {
            this.overlayLoad = true;
            try {
                let config = {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }                
                let virt = (this.virtual == "virtual") ? true : false;
                await axios.post('https://8wugvfc99e.execute-api.us-east-2.amazonaws.com/prod/sbr', {
                    host: this.email,
                    created: "now",
                    starttime: this.starttime,
                    endtime: this.endtime,
                    open: true,
                    maxPeople: parseInt(this.maxNumber),
                    location: this.location,
                    school: this.school,
                    subject: this.subject,
                    virtual: virt,
                    studbuds: []
                }, config)
                .then(function (response) {
                    console.log(response);
                    this.snackbar = true;
                    this.overlayLoad = false;
                    this.$router.push({ name: 'Home', params: { }})
                });
            }
            catch (error) {
                console.log(error)
                this.overlayLoad = false;
            }
        },
  },
}
</script>