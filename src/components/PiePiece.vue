<template>
  <v-progress-circular
    class="pie-piece"
    :rotate="rotate"
    :size="size"
    :value="value"
    :width="width"
    :color="color"
  />
</template>

<script>
export default {
  props: [
    'rotate',
    'size',
    'value',
    'width',
    'color'
  ]
}
</script>

<style lang="scss">
  .pie-piece {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .v-progress-circular__underlay {
    stroke: none;
  }
</style>
