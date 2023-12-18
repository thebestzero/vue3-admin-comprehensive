<script setup lang="ts">
import {useRouter} from 'vue-router'
import { filterRouters, generateMenus } from '@/utils/route'
import { computed } from 'vue'
import SidebarItem from '@/layout/components/Sidebar/SidebarItem.vue'
import LayoutService from '@/layout/service'
const router = useRouter()
const routes = computed(() => {
  const filterRoutes = filterRouters(router.getRoutes())
  return generateMenus(filterRoutes)
})
const {themeStore} = LayoutService
const {cssVar} = themeStore
</script>

<template>
  <!-- 一级 menu 菜单 -->
  <el-menu
    :uniqueOpened="true"
    :background-color="cssVar.menuBg"
    :text-color="cssVar.menuText"
    :active-text-color="cssVar.menuActiveText"
  >
  <sidebar-item
      v-for="item in routes"
      :key="item.path"
      :route="item"
    ></sidebar-item>
  </el-menu>
</template>

<style scoped lang="scss"></style>
