<template>
    <v-stepper v-model="e6" vertical>
        <v-stepper-step :complete="e6 > 1" step="1">
            Which class are you studying for?

            <v-stepper-content step="1">
                <v-text-field
                    v-model="subject"
                    :error-messages="subectErrors"
                    :counter="20"
                    label="Subject"
                    required
                    @input="$v.subject.$touch()"
                    @blur="$v.subject.$touch()"
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
                    :error-messages="starttimeErrors"
                    :counter="20"
                    label="Start Time"
                    required
                    @input="$v.starttime.$touch()"
                    @blur="$v.starttime.$touch()"
                    class="mt-3">
                </v-text-field>
                <v-text-field
                    v-model="endtime"
                    :error-messages="endtimeErrors"
                    :counter="20"
                    label="Approx End Time"
                    required
                    @input="$v.endtime.$touch()"
                    @blur="$v.endtime.$touch()"
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
                    :error-messages="locationErrors"
                    :counter="100"
                    label="Location/Meeting Link"
                    required
                    @input="$v.location.$touch()"
                    @blur="$v.location.$touch()"
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
                    :error-messages="maxNumberErrors"
                    type="number"
                    label="Max Number of Other StudBuds"
                    required
                    @input="$v.maxNumber.$touch()"
                    @blur="$v.maxNumber.$touch()"
                    class="mt-3">
                </v-text-field>

                <v-text-field
                    v-model="email"
                    :error-messages="emailErrors"
                    :counter="50"
                    label="Your Email Address"
                    required
                    @input="$v.email.$touch()"
                    @blur="$v.email.$touch()"
                    class="mt-3">
                </v-text-field>

                <v-text-field
                    v-model="school"
                    :error-messages="schoolErrors"
                    :counter="50"
                    label="Your School"
                    required
                    @input="$v.school.$touch()"
                    @blur="$v.school.$touch()"
                    class="mt-3">
                </v-text-field>
                <v-btn @click="e6 = 3" text>Go Back</v-btn>
                <v-btn color="primary" @click="e6 = 5; submit();">Submit StudBud Request</v-btn>
                
            </v-stepper-content>

        </v-stepper-step>
    </v-stepper>
</template>


<script>
const { validationMixin } = require('vuelidate')
const { required, maxLength } = require('vuelidate/lib/validators')
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
        }
    },
    mixins: [validationMixin],
    validations: {
        subject: { required, maxLength: maxLength(20) },
    
    },
    subjectErrors () {
      const errors = []
      if (!this.$v.subject.$dirty) return errors
      !this.$v.subject.maxLength && errors.push('Subject must be at most 20 characters long')
      !this.$v.subject.required && errors.push('Subject is required.')
      return errors
    },
    methods: {
        async submit () {
            this.$v.$touch();
            try {
                let config = {
                    headers: {
                        "Content-Type": "application/json",
                    }
                }                
                    let virt = (this.virtual == "virtual") ? true : false;
                    console.log("host", this.email,
                    "created", "now",
                    "starttime", this.starttime,
                    "endtime", this.endtime,
                    "open", true,
                    "maxPeople", this.maxNumber,
                    "location", this.location,
                    "school", this.school,
                    "subject", this.subject,
                    "virtual", virt,
                    "studbuds", []);
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
                    virtual: true,
                    studbuds: []
                }, config)
                .then(function (response) {
                    console.log(response);
                });
            }
            catch (error) {
                console.log(error)
            }
        },
  },
}
</script>