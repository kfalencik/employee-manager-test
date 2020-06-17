<template>
  <span class="color-swatch d-inline-block" :style="`background-color: ${color};`"></span>
</template>

<style lang="scss" scoped>
  .color-swatch {
    width: 13px;
    height: 13px;
  }
</style>

<script>
export default {
  props: ['color']
}
</script>
