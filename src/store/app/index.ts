import { defineStore } from 'pinia'
import { TAGS_VIEW } from '@/constant'
import { getItem, setItem } from '@/utils/storage'
interface AppStore {
  tagsViewList: any[]
  sensBtnArr:any[]
}
interface PayLoad {
  type: 'other' | 'right' | 'index';
  index: number
}
export const useAppStore = defineStore('appStore', {
  state: (): AppStore => {
    return {
      tagsViewList: [],
      sensBtnArr:[]
    }
  },
  getters: {
    getTagsViewList: (state) => {
      return state.tagsViewList || getItem(TAGS_VIEW)
    },
  },
  actions: {
    /**
     * 添加 tags
     */
    addTagsViewList(tag: any) {
      const isFind = this.tagsViewList.find((item) => {
        return item.path === tag.path
      })
      // 处理重复
      if (!isFind) {
        this.tagsViewList.push(tag)
        setItem(TAGS_VIEW, this.tagsViewList)
      }
    },
    changeTagsView({ index, tag }: { index: number; tag: any }) {
      this.tagsViewList[index] = tag
      setItem(TAGS_VIEW, this.tagsViewList)
    },
    /**
     * 删除 tag
     * @param {type: 'other'||'right'||'index', index: index} payload
     */
    removeTagsView(payload:PayLoad) {
      if (payload.type === 'index') {
        this.tagsViewList.splice(payload.index, 1)
        return
      } else if (payload.type === 'other') {
        this.tagsViewList.splice(
          payload.index + 1,
          this.tagsViewList.length - payload.index + 1,
        )
        this.tagsViewList.splice(0, payload.index)
      } else if (payload.type === 'right') {
        this.tagsViewList.splice(
          payload.index + 1,
          this.tagsViewList.length - payload.index + 1,
        )
      }
      setItem(TAGS_VIEW, this.tagsViewList)
    },
  },
})
