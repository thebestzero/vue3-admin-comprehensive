<template>
  <el-form
    ref="formRef"
    :model="formState"
    label-width="auto"
    label-position="right"
    :style="{ width: '100%' }"
    v-bind="formData.formAttributes"
    :rules="formRules"
  >
    <el-row>
      <template v-for="(formItem, index) in formData.formItems">
        <el-col
          :span="formItem.span || formData.formItemSpan || 12"
          v-if="!formItem.hidden"
          :key="index"
        >
          <el-form-item :label="formItem.label" :prop="formItem.prop">
            <el-divider
              v-if="formItem.cmpType === 'Divider'"
              direction="horizontal"
              >{{ formState[formItem.prop] }}</el-divider
            >
            <div v-else-if="formItem.cmpType === 'Checkbox'">
              <el-checkbox-group v-model="formState[formItem.prop]">
                <el-checkbox
                  v-for="item in formItem.options"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value"
                />
              </el-checkbox-group>
            </div>
            <div v-else-if="formItem.cmpType === 'Radio'">
              <el-radio-group v-model="formState[formItem.prop]">
                <el-radio
                  v-for="item in formItem.options"
                  :label="item.label"
                  :value="item.value"
                  :key="item.value"
                />
              </el-radio-group>
            </div>
            <div v-else>
              <component
                :is="getComponent(formItem.cmpType)"
                v-model="formState[formItem.prop]"
                v-bind="formItem.itemAttributes"
              ></component>
            </div>
            <template v-if="formItem.cmpType === 'Slot'">
              <slot :name="formItem.prop"></slot>
            </template>
          </el-form-item>
        </el-col>
      </template>
    </el-row>
  </el-form>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref, toRefs, watch } from 'vue'
import { FormState, IFormData, FormType } from './type'
import {
  FormInstance,
  ElSwitch,
  ElInput,
  ElInputNumber,
  ElSelectV2,
  ElCheckbox,
  ElRadio,
  ElDivider,
  ElDatePicker,
} from 'element-plus'
const formRef = ref<FormInstance>()
const emits = defineEmits(['updateFormData'])
const formState = reactive<FormState>({})
const props = defineProps<{
  formData: IFormData
}>()
const formData = reactive(props.formData)
const formRules = computed(() => {
  return formData.rules || {}
})
const getComponent = (type: FormType) => {
  switch (type) {
    case 'Datepicker':
      return ElDatePicker
    case 'InputNumber':
      return ElInputNumber
    case 'Select':
      return ElSelectV2
    case 'Switch':
      return ElSwitch
    case 'Input':
      return ElInput
    default:
      return ElInput
  }
}
const formIndex = new Map<string, number>()
const initDefault = () => {
  formData.formItems.forEach((item, index) => {
    if (item.prop) formState[item.prop] = item.default ?? ''
    formIndex.set(item.prop, index)
  })
}
const formAction = {
  validate: () => {
    formRef.value?.validate((isValid, invalidFields) => {
      console.log(isValid, invalidFields)
    })
  },
  resetField: () => {
    formRef.value?.resetFields()
  },
  updateFormState: (state: Record<string, any>) => {
    Object.keys(formState).forEach((key) => {
      if (Object.prototype.hasOwnProperty.call(state, key)) {
        formState[key] = state[key]
      }
    })
  },
  updateFormItem: (field: string, itemProp: any) => {
    const index = formIndex.get(field)
    if (!index) return
    formData.formItems[index] = Object.assign(
      formData.formItems[index],
      itemProp,
    )
  },
  updateFormRule: (field: string, itemProp: any, index = 0) => {
    if (formData.rules && formData.rules[field]) {
      formData.rules[field][index] = {
        ...formData.rules[field][index],
        ...itemProp,
      }
    }
    console.log(formRules)
  },
}

watch(
  formState,
  () => {
    formData.formChange &&
      formData.formChange({
        formState,
        formData,
        updateFormItem: formAction.updateFormItem,
        updateFormRule: formAction.updateFormRule,
      })()
    console.log(formState, 'formState')
  },
  { deep: true },
)
onMounted(() => {
  initDefault()
})

defineExpose({ ...formAction })
</script>
