import { ExtractPropTypes } from 'vue'
export interface FormState {
  [key: string]: any
}
interface FormAttributes{
  styles:Record<string, any>
  [key:string]:any
}
export interface IFormData {
  formAttributes?: FormAttributes
  formItems: FormItem[]
  rules?: Record<string, Array<Record<string, unknown>> | never> | null
  formChange?: FormChange // watch form
  formItemSpan?:string | number
}
export type FormType = keyof ComponentProps
interface BasicForm {
  prop: string
  label?: string
  span?: string | number
  hidden?: boolean
  default?:any
  options?:any[]
}
interface FormItem<T extends FormType = FormType> extends BasicForm{
  cmpType:T;
  itemAttributes?:ComponentProps[T]
}
export interface ComponentProps {
  Input: ExtractPropTypes<
    typeof import('element-plus/es/components/input')
  >['default']
  InputNumber: ExtractPropTypes<
    typeof import('element-plus/es/components/input-number')
  >['default']
  Select: ExtractPropTypes<
    typeof import('element-plus/es/components/select-v2')
  >['default']
  // @ts-ignore
  Checkbox: ExtractPropTypes<
    typeof import('element-plus/es/components/checkbox')
  >['default']
  Radio: ExtractPropTypes<
    typeof import('element-plus/es/components/radio')
  >['default']
  Divider: ExtractPropTypes<
    typeof import('element-plus/es/components/divider')
  >['default']
  Datepicker: ExtractPropTypes<
    typeof import('element-plus/es/components/date-picker')
  >['default']
  Switch: ExtractPropTypes<
    typeof import('element-plus/es/components/switch')
  >['default']
  Slot: {
    slotProp?: Record<string, any>
  }
}
interface ChangeProp {
  formState: FormState
  formData: IFormData
  updateFormItem: (field: string, itemProp: any) => void
  updateFormRule: (field: string, itemProp: any, index?: number) => void
}
type FormChange = ({
  formState,
  formData,
  updateFormItem,
  updateFormRule,
}: ChangeProp) => () => void
