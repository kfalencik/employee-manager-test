<template>
  <v-card class="pie pa-6" v-if="data" :style="`width: ${size + 50}px`">
      <h2 :key="1" class="text-h6 text-center">Years of service:</h2>

      <v-fab-transition group>
        <template v-if="animation">
          <PiePiece v-for="(piece, index) in data"
            :key="`pie-piece-${index}`"
            :rotate="piece.rotate"
            :size="size"
            :value="piece.percentage"
            :width="size / 2"
            :color="piece.color"
          />
        </template>
      </v-fab-transition>

      <div :key="2" class="pie__legend text-center mx" :style="`padding-top: ${size + 15}px;`">
        <ul class="pl-2">
          <li v-for="(piece, index) in data"
            :key="`pie-legend-${index}`"
            class="text-caption"
          >
          <ColorSwatch :color="piece.color" /> &nbsp;
          <strong>{{piece.title}}</strong> -  {{piece.value}} ({{Math.round(piece.percentage)}}%)
          </li>
        </ul>
      </div>
  </v-card>
</template>

<script>
import PiePiece from '@/components/PiePiece.vue'
import ColorSwatch from '@/components/ColorSwatch.vue'

export default {
  props: ['data', 'size'],
  data () {
    return {
      animation: false
    }
  },
  components: {
    PiePiece,
    ColorSwatch
  },
  mounted () {
    const self = this
    setTimeout(() => {
      self.animation = true
    }, 500)
  }
}
</script>

<style lang="scss" scoped>
  .pie {
    position: relative;

    ul {
      list-style: none;
    }
  }
</style>
