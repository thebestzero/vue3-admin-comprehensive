import { v4 as uuidv4 } from 'uuid'

export const componentOption:Record<string, any[]> = {
  auth: [],
  limit: [],
  pric: [],
}
export const flowList = [
  {
    branchList: [
      [
        {
          componentNumber: 'AUTH_01',
          componentDesc: '授权组件01',
          graphId: uuidv4(),
        },
      ],
    ],
  },
  {
    branchList: [
      [
        {
          componentNumber: 'LIMIT_01',
          componentDesc: '额度组件01',
          graphId: uuidv4(),
        },
      ],
    ],
  },
  {
    branchList: [
      [
        {
          componentNumber: 'PRIC_01',
          componentDesc: '定价组件01',
          graphId: uuidv4(),
        },
      ],
    ],
  },
]

Object.keys(componentOption).forEach((key) => {
  const componentNumber = key.toUpperCase() + '_'
  const componentDesc =
    key === 'auth' ? '授权组件' : key === 'limit' ? '额度组件' : '定价组件'
  for (let i = 1; i <= 10; i++) {
    componentOption[key].push({
      label:componentDesc + i,
      value:componentNumber + i,
    })
  }
})
