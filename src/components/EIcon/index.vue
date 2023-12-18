<template>
  <el-icon>
    <component :is="icon"></component>
  </el-icon>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue'
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
})

const icon = computed(() => {
  const str = props.name
  const regex = /el-icon-(\w+)/
  const matches = str.match(regex)
  if (matches && matches.length > 1) {
    const extracted = matches[1]
    return extracted.charAt(0).toUpperCase() + extracted.slice(1)
  } else {
    return ''
  }
})
</script>

<style lang='scss' scoped>
.el-icon{
  font-size: 14px;
}
.svg {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  overflow: hidden;
}
</style>
