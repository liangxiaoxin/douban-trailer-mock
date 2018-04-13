import qiniu from 'qiniu'
import {qiniuConfig} from '../config'
export default function (movies) {
  const bucket = qiniuConfig.bucket
  const mac = new qiniu.auth.digest.Mac(qiniuConfig.AK, qiniuConfig.SK)
  const cfg = new qiniu.conf.Config()
  const client = new qiniu.rs.BucketManager(mac, cfg)
  const upload = async (url, key) => {
    return new Promise((resolve, reject) => {
      client.fetch(url, bucket, key, (err, ret, info) => {
        if (err) {
          reject(err)
        }
        else {
          if (info.statusCode === 200) {
            resolve({ key })
          } else {
            reject(info)
          }
        }
      })
    })
  }
  // 上传数据到七牛云
  ;(async () => {
    for (let i = 0; i < movies.length; i++) {
      let movie = movies[i]

      if (movie.poster) {
        try {
          let posterData = await upload(movie.poster, movie.title + '.jpg')
          if (posterData.key) {
            movie.posterKey = posterData.key
          }
        } catch (err) {
          console.log(err)
        }
      }
    }
  })()
}