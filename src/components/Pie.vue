<template>
  <div class="pie" v-if="data" :style="`width: ${pieSize + 300}px; min-height: ${pieSize}px`">
    <PiePiece v-for="(piece, index) in data"
      :key="`pie-piece-${index}`"
      :rotate="piece.rotate"
      :size="pieSize"
      :value="piece.percentage"
      :width="pieWidth"
      :color="piece.color"
    />

    <div class="pie__legend">
      <h2 class="text-subtitle-1">Years of service:</h2>
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
  </div>
</template>

<script>
import PiePiece from '@/components/PiePiece.vue'
import ColorSwatch from '@/components/ColorSwatch.vue'

export default {
  props: ['data'],
  data () {
    return {
      pieSize: 300,
      pieWidth: 150
    }
  },
  components: {
    PiePiece,
    ColorSwatch
  }
}
</script>

<style lang="scss" scoped>
  .pie {
    width: 200px;
    display: flex;
    align-items: center;
    position: relative;

    &__legend {
      ul {
        list-style: none;

        li {
          margin: 5px 0;
        }
      }
    }
  }
</style>
