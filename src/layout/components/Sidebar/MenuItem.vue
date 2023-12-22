<template>
  <e-icon
    v-if="icon.includes('el-icon')"
    class="sub-el-icon"
    :name="icon"
  ></e-icon>
  <el-icon v-else size='14px'>
    <svg-icon :icon="icon"></svg-icon>
  </el-icon>
  <span>{{ generateTitle(title) }}</span>
</template>

<script setup>
import { defineProps } from 'vue'
import {generateTitle} from '@/utils/i18n'

defineProps({
  title: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    required: true,
  },
})
</script>

<style lang="scss" scoped>
.sub-el-icon {
  position: relative;
  right: 3px;
  margin-right: 8px !important;
}
</style>
