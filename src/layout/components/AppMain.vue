<template>
  <div class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
          <keep-alive>
          <component :is="Component" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, RouteLocationNormalizedLoaded } from 'vue-router'
import { generateTitle ,watchSwitchLang} from '@/utils/i18n'
import { useAppStore } from '@/store'
import { isTags } from '@/utils/tags'

const route = useRoute()

/**
 * 生成 title
 */
const getTitle = (route: RouteLocationNormalizedLoaded) => {
  let title = ''
  if (!route.meta) {
    // 处理无 meta 的路由
    const pathArr = route.path.split('/')
    title = pathArr[pathArr.length - 1]
  } else {
    title = generateTitle(route.meta.title)
  }
  return title
}
/**
 * 监听路由变化
 */
const store = useAppStore()
watch(
  route,
  (to, from) => {
    if (!isTags(to.path)) return
    const { fullPath, meta, name, params, path, query } = to
    store.addTagsViewList({
      fullPath,
      meta,
      name,
      params,
      path,
      query,
      title: getTitle(to),
    })
  },
  {
    immediate: true,
  },
)
watchSwitchLang(() => {
  store.tagsViewList.forEach((value, index) => {
    store.changeTagsView({
      index,tag:{
      ...value,
      title:getTitle(value)
    }
    })
  })
})
</script>

<style lang="scss" scoped>
.app-main {
  min-height: calc(100vh - 50px);
  width: 100%;
  position: relative;
  overflow: hidden;
  padding: 61px 20px 20px 20px;
  box-sizing: border-box;
}
</style>
