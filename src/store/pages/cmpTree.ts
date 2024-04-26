import { defineStore } from 'pinia'
interface Group {
  componentNumber: string
  componentDesc: string
  graphId: string
}
export interface Flow {
  branchList: Group[][]
}
interface TreeStore{
  flowList:Flow[]
}

export const useTreeStore = defineStore('treeStore', {
  state: ():TreeStore => {
    return {
      flowList: [],
    }
  },
  getters: {

  },
  actions: {
   setFlowList(flowList:Flow[]){
     this.flowList = flowList
   }
  },
})
