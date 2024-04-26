<template>
  <div class="tree-wrapper" >
    <NetWork :graph-data='data' ref='networkRef' :use-group='true'></NetWork>
  </div>
</template>

<script setup lang="ts">
import NetWork from '@/components/NetWork/index.vue'
import {mockData} from '@/views/network/mockData'
import { Model } from '@antv/x6'
import { onMounted, reactive, ref } from 'vue'
const networkRef = ref<any>()
const nodeTypeData:Record<string, string> = {
  crlimt:'授信',
  loan:'分期',
  cash:'取现',
  cashLoan:'现金分期',
  splmt:'大额分期',
  cust:'客户层总结点',
  cc:'管控节点',
  custCr:'客户循环节点',
  sublmt:'大额子额度'
}

const data:Model.FromJSONData = reactive({
  nodes: [],
  edges: []
})
const {nodeList,meshList} = mockData
nodeList.forEach((item) => {
  const type = item.credNodeType
  const typeText = nodeTypeData[type] || type
  data.nodes?.push({
    id:item.credNodeNbr,
    data:{...item},
    attrs:{
      '.top':{text:'编号' + item.credNodeNbr},
      '.center':{text:'类型' + typeText},
      '.bottom':{text:item.credNodeName}
    },
    shape:'treeNode'
  })
})
meshList.forEach((item) => {
  data.edges?.push({
    source:{
      cell:item.credNodeNbr,
      anchor:{
        name:'center',
        args:{dx: item.relatType === '0' ? 20 : -20}
      }
    },
    target:{cell:item.relatNodeNbr},
    attrs:item.relatType === '0' ? {line:{strokeDasharray:'5'}} : {},
    data:{...item },
    connector:'normal',
    zIndex:10
  })
})
console.log(data)
setTimeout(() => {
  networkRef.value?.renderGraph()
},2000)

</script>

<style lang="scss" scoped>
.tree-wrapper {
  flex: 1;
}
</style>
