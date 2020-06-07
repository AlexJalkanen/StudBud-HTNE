# StudBud-HTNE
Hack the North East Hackathon Project
Most Viable Startup Track
www.studbud-htne.tech

# Study Groups for Students by Students
For students in high school and college who would benefit from a group study session, but want the flexibility to choose your time, place, and frequency, then StudBud is for you! StudBud is a web application that allows students to easily connect with other students to form a study session on demand. As a student, I know that often it would be super helpful to meet up with students in my class before an exam or before homework is due, but to have the flexibility I need that fits my need and desire. To overcome this issue, StudBud provides a unique opportunity on the market, as there is no strong competitor aside from group chats. Yet group chats fail when you're placed into a class with students you do not know.

From the beginning of this hackathon, I chose to use technology that was completely knew to me - to challenge myself and explore new powerful services. For this project, I wanted to make it possible to scale to any number of users provide a enjoyable user experience, so I learned how to make a serverless backend through AWS and create a frontend through Vue Js.

# Running StudBud
StudBud is broken up into two halves - front and back end.

## Frontend
The frontend of the application was developed using Vue Js with Axios to fetch calls to the API. To serve the application, any package manager for Node.Js will work.

### Deploy Frontend Locally
Install dependencies with ```npm install```
Run locally with ```npm run serve```

#### Dependencies:
-   "@mdi/font": "^3.6.95",
-   "axios": "^0.19.2",
-   "core-js": "^3.6.5",
-   "roboto-fontface": "*",
-   "vue": "^2.6.11",
-   "vue-cli-plugin-s3-deploy": "^4.0.0-rc3",
-   "vue-ctk-date-time-picker": "^2.4.0",
-   "vue-router": "^3.2.0",
-   "vuelidate": "^0.7.5",
-   "vuetify": "^2.2.11"

## Backend
The backend of the application was developed all serverless. As execution and demand were key components to StudBud's design process, it was decided to use AWS for all backend hosting. The tools used were Amazon Lambda, Amazon Api Gateway, and Amazon DynamoDB. By going serverless, StudBud has the huge potential right from the start to instantly scale to any number of users without needing to manage and provision it's own backend servers. This gives StudBud immediate room for growth to expand to mobile devices and focus on user experience rather than maintenance. 

### Amazon Lambda
The Lambda node.js files used for developing the functions are in the backend directory.


# Authors
- Alex Jalkanen
