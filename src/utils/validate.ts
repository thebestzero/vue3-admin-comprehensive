export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path) //使用正则表达式进行判断。/^(https?:|mailto:|tel:)/ 是一个正则表达式，表示以 http:、https:、mailto: 或 tel: 开头的字符串。.test(path) 用于检测给定的路径 path 是否匹配该正则表达式。
}
