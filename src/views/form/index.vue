<script setup lang="ts">
import IcmsForm from '@/components/IcmsForm/index.vue'
import { reactive } from 'vue'
import { IFormData } from '@/components/IcmsForm/type'
const formData = reactive<IFormData>({
  formItems: [
    {
      label: 'Activity name',
      prop: 'name',
      cmpType: 'Input',
      default: '',
    },
    {
      label: 'Activity zone',
      prop: 'region',
      cmpType: 'Select',
      default: 'shanghai',
      options: [
        { label: 'shanghai', value: 'shanghai' },
        { label: 'beijing', value: 'beijing' },
      ],
      itemAttributes: {
        options: [
          { label: 'shanghai', value: 'shanghai' },
          { label: 'beijing', value: 'beijing' },
        ],
      },
    },
    {
      label: 'Activity date',
      prop: 'date',
      cmpType: 'Datepicker',
      default: '',
      itemAttributes: {
        type: 'date',
      },
    },
    {
      label: 'Instant delivery',
      prop: 'delivery',
      cmpType: 'Switch',
      default: false,
    },
    {
      label: 'Activity type',
      prop: 'aType',
      cmpType: 'Checkbox',
      default: ['Online activities'],
      options: [
        { label: 'Online activities', value: 'Online activities' },
        { label: 'Promotion activities', value: 'Promotion activities' },
        { label: 'Offline activities', value: 'Offline activities' },
        { label: 'Simple brand exposure', value: 'Simple brand exposure' },
      ],
      span: 24,
    },
    {
      label: 'Resources',
      prop: 'resource',
      cmpType: 'Radio',
      default: 'Sponsor',
      options: [
        { label: 'Sponsor', value: 'Sponsor' },
        { label: 'Venue', value: 'Venue' },
      ],
    },
    {
      label: 'Activity form',
      prop: 'desc',
      cmpType: 'Input',
      default: '',
      span: 24,
      itemAttributes: {
        type: 'textarea',
        style: { width: '500px' },
      },
    },
  ],
})
</script>

<template>
  <IcmsForm :form-data="formData"></IcmsForm>
</template>

<style scoped lang="scss"></style>
