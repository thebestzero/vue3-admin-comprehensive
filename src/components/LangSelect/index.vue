<template>
  <el-dropdown
    trigger="click"
    class="international"
    @command="handleSetLanguage"
  >
    <div>
      <el-tooltip :content="$t('msg.navBar.lang')" :effect="effect">
        <svg-icon icon="language" />
      </el-tooltip>
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item :disabled="language === 'zh'" command="zh">
          中文
        </el-dropdown-item>
        <el-dropdown-item :disabled="language === 'en'" command="en">
          English
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, computed } from 'vue'
import { useThemeStore } from '@/store'
import { useI18n } from 'vue-i18n'
import { ElMessage } from 'element-plus'

interface Prop {
  effect: 'dark' | 'light'
}
withDefaults(defineProps<Prop>(), {
  effect: 'dark',
})

const store = useThemeStore()
const language = computed(() => store.getLanguage)

// 切换语言的方法
const i18n = useI18n()
const handleSetLanguage = (lang: 'zh' | 'en') => {
  i18n.locale.value = lang
  store.setLanguage(lang)
  ElMessage.success(i18n.t('msg.toast.switchLangSuccess'))
}
</script>

<style scoped></style>
