<template>
  <el-breadcrumb class="breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item
        v-for="(item, index) in breadcrumbData"
        :key="item.path"
      >
        <!-- 不可点击项 -->
        <span v-if="index === breadcrumbData.length - 1" class="no-redirect">{{
          generateTitle(item.meta.title)
        }}</span>
        <!-- 可点击项 -->
        <a v-else class="redirect" @click.prevent="onLinkClick(item)">{{
          generateTitle(item.meta.title)
        }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { RouteLocationMatched } from 'vue-router'
import { useThemeStore } from '@/store'
import {generateTitle} from '@/utils/i18n'

const router = useRouter()
const route = useRoute()
const breadcrumbData = ref<RouteLocationMatched[]>([])

const store = useThemeStore()
// eslint-disable-next-line
const linkHoverColor = ref(store.cssVar.menuBg)

const getBreadcrumbData = () => {
  // route.matched就是当有多级路由的时候，记录每一级路由，并生成数组。如：
  breadcrumbData.value = route.matched.filter(
    (item) => item.meta && item.meta.title,
  )
}

const onLinkClick = (item: RouteLocationMatched) => {
  console.log(item)
  router.push(item.path)
}
watch(
  route,
  () => {
    getBreadcrumbData()
  },
  {
    immediate: true,
  },
)
</script>

<style lang="scss" scoped>
@import '~@/styles/transition.scss';
.breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  :deep(.no-redirect) {
    color: #97a8be;
    cursor: text;
  }
  .redirect {
    color: #666;
    font-weight: 600;
  }

  .redirect:hover {
    // 将来需要进行主题替换，所以这里不去写死样式
    color: v-bind(linkHoverColor);
  }
}
</style>
