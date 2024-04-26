<template>
  <div class="tree-wrapper">
    <el-button @click="query">查询</el-button>
    <NetWork
      :graph-data="data"
      :dagre-option="dragLayout"
      ref="networkRef"
      :event-config="eventConfig"
      @eventHandler="processEvent"
    ></NetWork>
    <el-dialog v-model="dialogVisible" title="请选择添加节点方式" width="400">
      <el-select v-model="addChoose">
        <el-option label="与主分支串行" :value="0"></el-option>
        <el-option label="与分支串行" :value="1"></el-option>
      </el-select>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button @click="handleClose">确认</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { Cell, Model } from '@antv/x6'
import { createVNode, reactive, ref } from 'vue'
import { flowList as mockList } from '@/views/cmp-tree/mockData'
import { processData, startNode } from '@/views/cmp-tree/processData'
import { DagreLayoutOptions } from '@antv/layout'
import NetWork from '@/components/NetWork/index.vue'
import { eventHander } from '@/views/cmp-tree/eventHander'
import { useTreeStore } from '@/store'
import { Flow } from '@/store/pages/cmpTree'
import { register } from '@antv/x6-vue-shape'
import SelectNode from '@/components/NetWork/selectNode.vue'

interface UpdateProp {
  branchIndex: number
  flowIndex: number
  stepIndex: number
  newComponent: {
    componentDesc: string
    componentNumber: string
  }
}
/* dialog */
const dialogVisible = ref(false)
const addChoose = ref(0)
const handleClose = () => {
  dialogVisible.value = false
  if (!addCell) return
  const { flowIndex, branchIndex, stepIndex } = addCell.data
  if (addChoose.value == 0) {
    const flowList = addFlow(
      { flowIndex, branchIndex, stepIndex },
      store.flowList,
    )
    render(flowList)
  } else {
    const flowList = addNode(
      { flowIndex, branchIndex, stepIndex },
      store.flowList,
    )
    render(flowList)
  }
}
/* 注册vue节点*/
register({
  shape: 'select-node',
  width: 250,
  height: 30,
  component: createVNode(SelectNode, {
    onUpdateNode: (data: UpdateProp) => {
      const flowList = updateNode(data, store.flowList)
      render(flowList)
    },
  }),
})
/******/
const store = useTreeStore()
const networkRef = ref<any>()
const dragLayout: DagreLayoutOptions = {
  type: 'dagre',
  rankdir: 'TB',
  nodesep: 80,
  ranksep: 20,
  begin:[100 ,30]
}
const eventConfig = {
  'node:dblclick': false,
  'edge:dblclick': false,
  'node:remove': true,
  'edge:remove': false,
  'mesh:click': false,
  'addS:click': true,
  'addP:click': true,
}
type EventConfig = typeof eventConfig
const {
  createComponentGroup,
  addFlow,
  addBranch,
  addNode,
  deleteNode,
  updateNode,
} = eventHander()
const data: Model.FromJSONData = reactive({
  nodes: [startNode],
  edges: [],
})
const render = (flowList: Flow[]) => {
  const { nodes, edges } = processData(flowList)!
  data.nodes = nodes
  data.edges = edges
  networkRef.value?.renderGraph()
}
let addCell: Cell
const processEvent = ({
  type,
  cell,
}: {
  type: keyof EventConfig
  cell: Cell
}) => {
  const storeFlowlist = store.flowList
  if (type === 'addS:click') {
    /* 从0开始 */
    if (data.nodes!.length === 1 && storeFlowlist.length === 0) {
      const flowList = createComponentGroup()
      render(flowList)
    }
    if (storeFlowlist.length !== 0) {
      const { flowIndex, branchIndex, stepIndex } = cell.data
      const branchListLength = storeFlowlist[flowIndex].branchList.length
      const branchLength =
        storeFlowlist[flowIndex].branchList[branchIndex].length
      /* 与主分支串行*/
      if (branchListLength === 1 || flowIndex === storeFlowlist.length - 1) {
        const flowList = addFlow(
          { flowIndex, branchIndex, stepIndex },
          storeFlowlist,
        )
        render(flowList)
        /* 与侧分支串行*/
      } else if (branchLength - 1 > stepIndex) {
        const flowList = addNode(
          { flowIndex, branchIndex, stepIndex },
          storeFlowlist,
        )
        render(flowList)
        console.log(flowList)
        /* 分支最后节点*/
      } else if (branchLength - 1 === stepIndex) {
        dialogVisible.value = true
        addCell = cell
      }
    }
  }
  if (type === 'addP:click') {
    const { flowIndex, branchIndex, stepIndex } = cell.data
    const flowList = addBranch(
      { flowIndex, branchIndex, stepIndex },
      storeFlowlist,
    )
    render(flowList)
    console.log(flowList)
  }
  if (type === 'node:remove') {
    const { flowIndex, branchIndex, stepIndex } = cell.data
    const flowList = deleteNode(
      { flowIndex, branchIndex, stepIndex },
      storeFlowlist,
    )
    render(flowList)
    console.log(flowList)
  }
}

const query = () => {
  render(mockList)
}
</script>

<style lang="scss" scoped>
.tree-wrapper {
  flex: 1;
}
</style>
