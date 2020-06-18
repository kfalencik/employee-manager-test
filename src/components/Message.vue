<template>
  <v-alert :type="type">
    {{message}}
  </v-alert>
</template>

<script>
export default {
  props: ['type', 'message']
}
</script>
