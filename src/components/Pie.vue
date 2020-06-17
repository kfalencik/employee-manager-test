<template>
  <div class="pie" v-if="data">
    <PiePiece v-for="(piece, index) in data"
      :key="`pie-piece-${index}`"
      :rotate="piece.rotate"
      :size="pieSize"
      :value="piece.value"
      :width="pieWidth"
      :color="piece.color"
    />
  </div>
</template>

<script>
import PiePiece from '@/components/PiePiece.vue'

export default {
  props: ['data'],
  data () {
    return {
      pieSize: 400,
      pieWidth: 200
    }
  },
  components: {
    PiePiece
  }
}
</script>
