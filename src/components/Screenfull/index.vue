<template>
  <div>
    <svg-icon :icon="isFullscreen ? 'exit-fullscreen' : 'fullscreen'" @click='toggle'></svg-icon>
  </div>
</template>

<script setup lang='ts'>
import { ref, onMounted, onUnmounted } from 'vue'
import screenfull from 'screenfull'

// 是否全屏
const isFullscreen = ref(false)

const change = () => {
  isFullscreen.value = screenfull.isFullscreen
}
const toggle = () => {
  screenfull.toggle()
}

onMounted(() => {
  screenfull.on('change',change)
})

onUnmounted(() => {
  screenfull.on('change',change)
})
</script>

<style scoped>

</style>
