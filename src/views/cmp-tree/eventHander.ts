import { Model, Node, Edge } from '@antv/x6'
import { v4 as uuidv4 } from 'uuid'
import { componentOption } from '@/views/cmp-tree/mockData'
type Option = 'auth' | 'limit' | 'pric'
import { Flow } from '@/store/pages/cmpTree'
type Component = {
  label: string
  value: string
}
interface NodeProp {
  flowIndex: number
  branchIndex: number
  stepIndex: number
  newComponent?: {
    componentDesc: string
    componentNumber: string
  }
}
export function eventHander() {
  /* 创建新业务流*/
  const createComponentGroup = () => {
    const component: Component = componentOption['auth'][0]
    const flowList: Flow[] = [
      {
        branchList: [
          [
            {
              componentNumber: component.value,
              componentDesc: component.label,
              graphId: uuidv4(),
            },
          ],
        ],
      },
    ]
    return flowList
  }
  /* start添加节点 */
  const startAdd = (flowList: Flow[]) => {
    const component = componentOption['auth'][0]
    const newFlow = {
      branchList: [
        [
          {
            componentNumber: component.value,
            componentDesc: component.label,
            graphId: uuidv4(),
          },
        ],
      ],
    }
    flowList.unshift(newFlow)
    return flowList
  }

  /* 添加节点串行多分支 */
  const addNode = (
    { flowIndex, branchIndex, stepIndex }: NodeProp,
    flowList: Flow[],
  ) => {
    const component = componentOption['auth'][0]
    const newGroup = {
      componentNumber: component.value,
      componentDesc: component.label,
      graphId: uuidv4(),
    }
    flowList[flowIndex].branchList[branchIndex].splice(
      stepIndex + 1,
      0,
      newGroup,
    )
    return flowList
  }
  /* 删除节点 */
  const deleteNode = (
    { flowIndex, branchIndex, stepIndex }: NodeProp,
    flowList: Flow[],
  ) => {
    const branchList = flowList[flowIndex].branchList
    // 只有串行
    if (branchList.length === 1 && branchList[branchIndex].length === 1) {
      flowList.splice(flowIndex, 1)
      return flowList
    }
    // 有并行
    if (branchList[branchIndex].length === 1) {
      flowList[flowIndex].branchList.splice(branchIndex, 1)
      if (flowList[flowIndex].branchList.length === 1) {
        const newList = flowList[flowIndex].branchList[0].map((item: any) => {
          return {
            branchList: [
              [
                {
                  componentNumber: item.componentNumber,
                  componentDesc: item.componentDesc,
                  graphId: item.graphId,
                },
              ],
            ],
          }
        })
        flowList.splice(flowIndex, 1, ...newList)
      }
      return flowList
    }
    flowList[flowIndex].branchList[branchIndex].splice(stepIndex, 1)
    return flowList
  }
  /* 添加流程-串行单分支*/
  const addFlow = (
    { flowIndex, branchIndex, stepIndex }: NodeProp,
    flowList: Flow[],
  ) => {
    const component = componentOption['auth'][0]
    const newGroup = {
      branchList: [
        [
          {
            componentNumber: component.value,
            componentDesc: component.label,
            graphId: uuidv4(),
          },
        ],
      ],
    }
    flowList.splice(flowIndex + 1, 0, newGroup)
    return flowList
  }
  /* 添加流程-串行单分支*/
  const addBranch = (
    { flowIndex, branchIndex, stepIndex }: NodeProp,
    flowList: Flow[],
  ) => {
    const component = componentOption['auth'][0]
    const newGroup = {
      componentNumber: component.value,
      componentDesc: component.label,
      graphId: uuidv4(),
    }
    flowList[flowIndex].branchList.push([newGroup])
    return flowList
  }

  /* 修改节点 */
  const updateNode = ({
    flowIndex,
    branchIndex,
    stepIndex,
    newComponent,
  }: NodeProp,flowList:Flow[]) => {
    flowList[flowIndex].branchList[branchIndex][stepIndex].componentNumber = newComponent!.componentNumber
    flowList[flowIndex].branchList[branchIndex][stepIndex].componentDesc = newComponent!.componentDesc
    console.log(flowList,'updateflowList')
    return flowList
  }
  return {
    createComponentGroup,
    startAdd,
    addNode,
    deleteNode,
    addFlow,
    addBranch,
    updateNode
  }
}
