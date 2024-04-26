<template>
  <div class="tree-container" ref="container"></div>
</template>

<script setup lang="ts">
import { onActivated, onDeactivated, ref } from 'vue'
import { Cell, Graph, Model } from '@antv/x6'
import {
  DagreLayout,
  Model as LayoutModel,
  DagreLayoutOptions,
} from '@antv/layout'
import useGroup from '@/components/NetWork/useGroup'
type EventOption = {isActive:boolean,option:Record<string, any>}
interface Props {
  dagreOption?: DagreLayoutOptions
  useGroup?: boolean
  graphData: Model.FromJSONData
  eventConfig?: {
    'node:dblclick'?: boolean | EventOption
    'edge:dblclick'?: boolean | EventOption
    'node:remove'?: boolean | EventOption
    'edge:remove'?: boolean | EventOption
    'mesh:click'?: boolean | EventOption
    'addS:click'?: boolean | EventOption
    'addP:click'?: boolean | EventOption
  }
}

const emit = defineEmits(['eventHandler'])
const props = withDefaults(defineProps<Props>(), {
  graphData: () => ({ nodes: [], edges: [] }),
  dagreOption: () => ({ type: 'dagre' }),
  useGroup: () => false,
  eventConfig: () => ({
    'node:dblclick': false,
    'edge:dblclick': false,
    'node:remove': false,
    'edge:remove': false,
    'mesh:click': false,
    'addS:click': false,
    'addP:click': false,
  }),
})

let graph: Graph
const container = ref<HTMLDivElement>()
const data: Model.FromJSONData = {
  nodes: [],
  edges: [],
}
const option = Object.assign(
  {},
  {
    type: 'dagre',
    rankdir: 'BT',
    nodesep: 40,
    ranksep: 30,
  },
  props.dagreOption,
)
const dagreLayout = new DagreLayout(option)
const init = () => {
  const containerEl = container.value
  graph = new Graph({
    container: containerEl,
    grid: true,
    width: containerEl?.clientWidth,
    height: containerEl?.clientHeight,
    panning: true,
    mousewheel: true,
  })
  const model = dagreLayout.layout(data as LayoutModel)
  graph.fromJSON(model)
  graph.zoomToFit({ maxScale: 1, padding: 20 })
  registerEvent()
}
const action = {
  resize: () => {
    const containerEl = container.value
    if (!graph) return
    if (!containerEl || !containerEl.clientHeight || !containerEl.clientWidth)
      return
    console.log(containerEl.clientHeight , containerEl.clientWidth)
    graph.resize(containerEl.clientWidth, containerEl.clientHeight)
    graph.zoomToFit({ maxScale: 1, padding: 20 })
  },
  resizeWatcher: () => {
    if (!graph) return
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', action.resize)
      window.addEventListener('reload', action.resize)
    }
  },
  removeResizeWatcher: () => {
    window.removeEventListener('resize', action.resize)
    window.removeEventListener('reload', action.resize)
  },
}
const renderGraph = () => {
  if (!graph) {
    init()
  }
  data.edges = []
  data.nodes = []
  console.log('renderGraph', data)
  const modelData = dagreLayout.layout(props.graphData as LayoutModel)
  graph.fromJSON(modelData)
  graph.zoomToFit({ maxScale: 1, padding: 20 })
  if (props.useGroup) useGroup(props.graphData?.nodes, graph)
}

const registerEvent = () => {
  if (!graph) return
  if (props.eventConfig['node:dblclick']) {
    graph.on('node:dblclick', ({ cell }) => {
      if (cell.shape !== 'treeNode') return
      emit('eventHandler', { type: 'node:dblclick', cell })
    })
  }
  if (props.eventConfig['edge:dblclick']) {
    graph.on('edge:dblclick', ({ cell }) => {
      emit('eventHandler', { type: 'edge:dblclick', cell })
    })
  }
  if (props.eventConfig['edge:remove']) {
    graph.on('edge:mouseenter', ({ cell }) => {
      cell.addTools([
        {
          name: 'edge-remove',
          args: {
            onClick() {
              emit('eventHandler', { type: 'edge:remove', cell })
            },
          },
        },
      ])
    })
  }
  graph.on('edge:mouseleave', ({ cell }) => {
    cell.removeTools()
  })
  graph.on('node:mouseenter', ({ cell }) => {
    if (props.eventConfig['node:remove']) {
      if (cell.id !== 'start') cell.addTools({
        name: 'button-remove',
        args: {
          x: 0,
          y: 0,
          offset: {
            x: 10,
            y: 10,
          },
          onClick: () => {
            emit('eventHandler', { type: 'node:remove', cell })
          },
        },
      })
    }
    if (props.eventConfig['mesh:click']) {
      cell.addTools({
        name: 'mesh-btn',
        args: {
          x: '100%',
          y: '100%',
          offset: {
            x: -20,
            y: -20,
          },
          onClick: () => {
            emit('eventHandler', { type: 'mesh:click', cell })
          },
        },
      })
    }
    if (props.eventConfig['addS:click']) {
      cell.addTools({
        name: 'addS-btn',
        args: {
          x: '0%',
          y: '100%',
          offset: {
            x: 40,
            y: 0,
          },
          onClick: () => {
            emit('eventHandler', { type: 'addS:click', cell })
          },
        },
      })
    }
    if (props.eventConfig['addP:click']) {
      if (cell.id !== 'start') cell.addTools({
        name: 'addP-btn',
        args: {
          x: '100%',
          y: '50%',
          offset: {
            x: 0,
            y: 0,
          },
          onClick: () => {
            emit('eventHandler', { type: 'addP:click', cell })
          },
        },
      })
    }
  })
  graph.on('node:mouseleave', ({ node }) => {
    node.removeTools()
  })
}
onActivated(() => {
  renderGraph()
  action.resizeWatcher()
})
onDeactivated(() => {
  action.removeResizeWatcher()
})
defineExpose({ renderGraph })
</script>

<style lang="scss" scoped>
.tree-container {
  width: 95%;
  height: 95%;
  border: 1px solid #1f2d3d;
}
</style>
