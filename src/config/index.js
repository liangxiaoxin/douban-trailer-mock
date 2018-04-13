// 七牛云配置
export const qiniuConfig = {
  bucket: 'douban-trailer',
  AK: 'g2v-QQx_dvcpxKXkDKKOjcXWbTTK2yIje8nwD70p',
  SK: 'gWe08SvD9i55yq7fRDAtbCeLwoJ5dBAgemiMVU4s'
}
/**
 *
 * @param sort 热度T   时间R  评价S
 * @param range 0,10
 * @param tags 地区 类型 形式等
 * @returns {string}
 */
export const doubanUrl = (sort,range,tags) => {
  return `https://movie.douban.com/tag/#/?sort=${sort}&range=${range}&tags=${tags}`
}