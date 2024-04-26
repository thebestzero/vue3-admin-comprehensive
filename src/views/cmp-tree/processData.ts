import { Model, Node, Edge } from '@antv/x6'
import { v4 as uuidv4 } from 'uuid'
import { Flow } from '@/store/pages/cmpTree'
import { useTreeStore } from '@/store'

export const startNode = {
  id: 'start',
  label: '开始',
  width: 250,
  height: 35,
  shape: 'rect',
  attrs: {
    body: {
      stroke: '#ffa940',
      fill: '#ffd591',
      rx: 10,
      ry: 10,
    },
    label: { fill: '#fff' },
  },
}
const store = useTreeStore()
export function processData(flowList: Flow[]) {
  const nodes: Node.Metadata[] = [startNode]
  const edges: Edge.Metadata[] = []
  if (flowList.length === 0) return { nodes, edges }
  flowList.forEach((flow, flowIndex) => {
    flow.branchList.forEach((branch, branchIndex) => {
      branch.forEach((item, stepIndex) => {
        if (!item.graphId) item.graphId = uuidv4()
        nodes.push({
          data: {
            flowIndex,
            branchIndex,
            stepIndex,
            componentNumber: item.componentNumber,
            componentDesc: item.componentDesc,
            center:item.componentNumber.split('_')[0]
          },
          id: item.graphId,
          label: item.componentNumber,
          width: 250,
          height: 35,
          shape: 'select-node',
          attrs: {
            body: { stroke: '#204b82', fill: '#2d6bba' },
            label: { fill: '#fff' },
          },
        })
      })
    })
  })

  for (let i = 0; i < flowList.length - 1; i++) {
    const currentStep = flowList[i]
    const nextStep = flowList[i + 1]
    for (let j = 0; j < currentStep.branchList.length; j++) {
      const currentBranch = currentStep.branchList[j]

      for (let k = 0; k < nextStep.branchList.length; k++) {
        const nextBranch = nextStep.branchList[k]
        edges.push({
          source: currentBranch[currentBranch.length - 1].graphId,
          target: nextBranch[0].graphId,
        })
        if (currentBranch.length > 1) {
          for (let l = 0; l < currentBranch.length - 1; l++) {
            edges.push({
              source: currentBranch[l].graphId,
              target: currentBranch[l + 1].graphId,
            })
          }
        }
      }
    }
  }

  const firstFlow = flowList[0].branchList
  firstFlow.forEach((branch) => {
    if (!branch[0]) return
    edges.push({
      source: 'start',
      target: branch[0].graphId,
    })
  })
  store.setFlowList(flowList)
  return { nodes, edges }
}
