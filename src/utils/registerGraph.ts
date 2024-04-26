import { Cell, Graph } from '@antv/x6'

class RegisterGraph {
  static registerGraph:RegisterGraph = new RegisterGraph()
  registerTreeNode = () => {
    Graph.registerNode('treeNode', {
      inherit: 'rect',
      width: 150,
      height: 50,
      markup: [
        { tagName: 'rect', selector: 'body' },
        { tagName: 'text', attrs: { class: 'top' } },
        { tagName: 'text', attrs: { class: 'center' } },
        { tagName: 'text', attrs: { class: 'bottom' } },
      ],
      attrs: {
        body: { stroke: '#204b82', fill: '#fff', rx: 6, ry: 6 },
        '.top': { fill: '#000', fontSize: 12, x: 0, y: -15 },
        '.center': { fill: '#000', fontSize: 12, x: 0, y: 0 },
        '.bottom': { fill: '#000', fontSize: 12, x: 0, y: 15 },
      },
    })
  }

  registerAddBtn = () => {
    Graph.registerNodeTool('add-btn', {
      inherit: 'button-remove',
      markup: [
        {
          tagName: 'circle',
          selector: 'button',
          attrs: { r: 7, fill: '#629E82', cursor: 'pointer' },
        },
        {
          tagName: 'path',
          selector: 'icon',
          attrs: {
            d: 'M 0 -4 0 4 M -4 0 4 0',
            fill: 'none',
            stroke: '#ffffff',
            'stroke-width': 2,
            'pointer-events': 'none',
          },
        },
      ],
    })
  }
  registerMeshBtn = () => {
    Graph.registerNodeTool('mesh-btn', {
      inherit: 'button',
      markup: [
        {
          tagName: 'rect',
          selector: 'button',
          attrs: {
            width: 15,
            height: 15,
            rx: 4,
            ry: 4,
            fill: 'white',
            cursor: 'pointer',
          },
        },
        {
          tagName: 'text',
          selector: 'text',
          textContent: '🌍',
          attrs: {
            fill: '#fe854f',
            'font-size': 13,
            'text-anchor': 'middle',
            'pointer-events': 'none',
            x: 10,
            y: 10,
          },
        },
      ],
    })
  }
  registerEdgeBtn = () => {
    Graph.registerNodeTool('edge-remove', {
      inherit: 'button-remove',
    })
  }
  registerAddPBtn = () => {
       Graph.registerNodeTool('addP-btn',{
         inherit:'button-remove',
         markup:[
           {tagName:'circle',selector:'button',attrs:{r:7,fill:'#629e82',cursor:'pointer'}},
           {tagName:'path',selector:'icon',attrs:{d:'M 0 -4 0 4 M -4 0 4 0',fill:'none',stroke:'#fff',
             'stroke-width':2,'pointer-events':'none'
           }},
         ]
       })
  }
  registerAddSBtn = () => {
       Graph.registerNodeTool('addS-btn',{
         inherit:'button-remove',
         markup:[
           {tagName:'circle',selector:'button',attrs:{r:7,fill:'#629e82',cursor:'pointer'}},
           {tagName:'path',selector:'icon',attrs:{d:'M 0 -4 0 4 M -4 0 4 0',fill:'none',stroke:'#fff',
             'stroke-width':2,'pointer-events':'none'
           }},
         ]
       })
  }

  registerCell = () => {
    this.registerTreeNode()
    this.registerAddBtn()
    this.registerMeshBtn()
    this.registerEdgeBtn()
    this.registerAddPBtn()
    this.registerAddSBtn()
  }
}

export default RegisterGraph.registerGraph

