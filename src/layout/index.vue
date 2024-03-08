<template>
  <div
    class="app-wrapper"
    :class="getSidebarOpened ? 'openSidebar' : 'hideSidebar'"
  >
    <!-- 左侧 menu -->
    <sidebar
      id="guide-sidebar"
      class="sidebar-container"
      :style="{ backgroundColor: variables.menuBg }"
    />
    <div class="main-container">
      <div class="fixed-header">
        <!-- 顶部的 navbar -->
        <navbar />
          <!-- tags -->
      <TagsView></TagsView>
      </div>
      <!-- 内容区 -->
      <app-main />
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar/Sidebar.vue'
import AppMain from './components/AppMain.vue'
import variables from '@/styles/variables.module.scss'
import LayoutService from '@/layout/service'
import TagsView from '@/components/Tagsview'

const { themeStore } = LayoutService
const { getSidebarOpened } = themeStore
</script>

<style lang="scss" scoped>
@import '~@/styles/mixin.scss';
@import '~@/styles/variables.module.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width #{$sideBarDuration};
}

.hideSidebar .fixed-header {
  width: calc(100% - #{$hideSideBarWidth});
}
</style>
