<template>
  <div class="create">
    <h2>Create a StudBud group!</h2>
    <newSBR></newSBR>
  </div>
</template>

<script>
// @ is an alias to /src
import newSBR from '@/components/newSBR.vue'
export default {
  name: 'Create',
  components: {
    newSBR
  }
}
</script>