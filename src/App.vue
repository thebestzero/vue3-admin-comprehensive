<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>
<script lang="ts" setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
import { useThemeStore } from '@/store/theme'
import installGraph from '@/utils/registerGraph'
import { computed } from 'vue'

installGraph.registerCell()
const store = useThemeStore()
const locale = computed(() => (store.getLanguage === 'en' ? en : zhCn))

</script>
