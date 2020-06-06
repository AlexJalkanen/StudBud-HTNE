<template>
    <div>
        <div v-bind:key="sbr.host" v-for="sbr in studbudrequests">
            <StudBudRequest v-bind:sbr="sbr"/>
        </div>
    </div>
</template>

<script>
import StudBudRequest from './StudBudRequest';
export default {
    name: "StudBudRequests",
    components: {
        StudBudRequest
    },
    props: ["studbudrequests"]
}
</script>

<style scoped>

</style>