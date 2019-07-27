import jsonp from '@/assets/js/jsonp.js'

export default function getFilmList () {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'
  const data = {
    uin: 0,
    format: 'jsonp',
    inCharset: 'utf-8',
    outCharset: 'utf-8',
    notice: 0,
    platform: 'h5',
    needNewCode: 1,
  }
  return jsonp(url, data, { param: 'jsonpCallback' })
}
