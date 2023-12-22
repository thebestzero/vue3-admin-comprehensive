import i18n from '@/i18n'
export const validatePassword = () => {
  return (rule: any, value: any, callback: any) => {
    if (value.length < 6) {
      callback(new Error(i18n.global.t('msg.login.passwordRule')))
    } else {
      callback()
    }
  }
}
