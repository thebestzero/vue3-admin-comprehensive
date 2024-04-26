import {Graph,Model,Node} from '@antv/x6'

const netColor = [
  '#204b82',
  '#ff5900',
  '#9ACD32',
  '#1E90FF',
  '#000',
  '#d03131'
]

export default function(nodes:Node.Metadata[],graph:Graph){
  if (!graph) return
  if (nodes.length === 0) return
  const netData:Record<string, any[]> = {}

  nodes.forEach((item) => {
    const netId = item.data.netId
    const node = graph.getCellById(item.id!)
    if (!netData[netId]){
      netData[netId] = [node]
    }else {
      netData[netId].push(node)
    }
  })

  Object.keys(netData).forEach((key,index) => {
    const initPosition = netData[key][0].position()
    let minX:number = initPosition.x
    let maxX:number = initPosition.x
    let minY:number = initPosition.y
    let maxY:number = initPosition.y
    netData[key].forEach((node) => {
        const pos = node.position()
        minX = typeof minX === 'undefined' ? pos.x : pos.x <= minX ? pos.x : minX
        maxX = typeof maxX === 'undefined' ? pos.x : pos.x >= maxX ? pos.x : maxX
        minY = typeof minY === 'undefined' ? pos.y : pos.y <= minY ? pos.y : minY
        maxY = typeof maxY === 'undefined' ? pos.y : pos.y >= maxY ? pos.y : maxY
    })
    const x = minX - 20
    const y = minY - 25
    const width = maxX + 200 - minX
    const height = maxY + 100 - minY
    const parent = graph.addNode({
      x,
      y,
      width,
      height,
      zIndex:index,
      markup:[
        {tagName:'rect',selector:'body'},
        {tagName:'text',attrs:{class:'title'}}
      ],
      attrs:{
        body:{
          stroke:netColor[index],
          strokeWidth:2,
          strokeDasharray:"5 10",
          fill:'transparent',
          rx:6,
          ry:6
        }
      },
      '.title':{
        fill:'#000',
        fontSize:14,
        x:-width/2 + 20,
        y:-height/2 + 10,
        text: '网' + key
      }
    })

    netData[key].forEach((node) => {
      node.attr('body/stroke',netColor[index])
      parent.addChild(node)
    })
  })
}
