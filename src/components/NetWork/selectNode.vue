<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue'
import { componentOption } from '@/views/cmp-tree/mockData'
import { ElSelect, ElOption } from 'element-plus'

const emits = defineEmits(['updateNode'])
const selectValue = ref<any>('')
const centerValue = ref<'auth' | 'limit' | 'pric'>('auth')
const getNode = inject<any>('getNode')
let nodeData: any
const centerOption = [
  { label: '授权', value: 'auth' },
  { label: '额度', value: 'limit' },
  { label: '定价', value: 'pric' },
]

const options = computed(() => {
  return componentOption[centerValue.value]
})

const centerChange = () => {
  selectValue.value = '请选择组件！'
}
const selectChange = (item: { label: string; value: string }) => {
  console.log(item,'item')
  const { branchIndex, flowIndex, stepIndex } = nodeData
  emits('updateNode', {
    branchIndex,
    flowIndex,
    stepIndex,
    newComponent: {
      componentDesc: item.label,
      componentNumber: item.value,
    },
  })
}
onMounted(() => {
  const node = getNode()
  nodeData = node.data
  const center = node.data.center.toLowerCase() ?? 'auth'
  centerValue.value = center
  selectValue.value = {label:node.data.componentDesc,value:node.data.componentNumber}
})
</script>

<template>
  <div class="select-box">
    <el-select v-model="centerValue" style="width: 40%" @change="centerChange">
      <el-option
        v-for="item in centerOption"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-select v-model="selectValue" style="width: 60%" @change="selectChange">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item"
      />
    </el-select>
  </div>
</template>

<style scoped lang="scss">
.select-box {
  border: 1px solid #304156;
  background: rebeccapurple;
}
</style>
