<script setup lang="ts">
import IcmsForm from '@/components/IcmsForm/index.vue'
import { reactive, ref } from 'vue'
import { IFormData } from '@/components/IcmsForm/type'
const formRef = ref<InstanceType<typeof IcmsForm>>()
const formData = reactive<IFormData>({
  formItemSpan: 8,
  formItems: [
    {
      prop: 'divider1',
      cmpType: 'Divider',
      default: '',
      span: 24,
    },
    {
      label: '字段1',
      prop: 'test1',
      cmpType: 'Input',
      default: '',
      hidden: true,
    },
    {
      label: '字段2',
      prop: 'test2',
      cmpType: 'Input',
      default: '',
    },
    {
      label: '字段3',
      prop: 'test3',
      cmpType: 'Select',
      default: 'shanghai',
      itemAttributes: {
        options: [
          { label: 'shanghai', value: 'shanghai' },
          { label: 'beijing', value: 'beijing' },
        ],
      },
    },
    {
      label: '切换字段1显示/隐藏',
      prop: 'toggleTest1',
      cmpType: 'Switch',
      default: false,
    },
    {
      label: '切换字段2必填',
      prop: 'toggleRequired',
      cmpType: 'Switch',
      default: false,
    },
  ],
  rules: {
    test2: [{ required: false, message: '请输入Input', trigger: 'blur' }],
  },
  formChange({ formState, updateFormRule, updateFormItem }) {
    return () => {
      updateFormRule('test2', { required: formState['toggleRequired'] })
      updateFormItem('test1', { hidden: formState['toggleTest1'] })
    }
  },
})

const toggleLabel = () => {
  formRef.value?.updateFormItem('test3', { label: '字段3 New' })
}
const validate = () => {
  formRef.value?.validate()
}
const reset = () => {
  formRef.value?.resetField()
}
</script>

<template>
  <div>
    <el-button @click="toggleLabel">更改字段3Label</el-button>
    <el-button @click="validate">验证</el-button>
    <el-button @click="reset">重置</el-button>
    <IcmsForm :form-data="formData" ref="formRef"></IcmsForm>
  </div>
</template>

<style scoped lang="scss"></style>
