import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'
import HmacSHA256 from 'crypto-js/hmac-sha256'

export default class AppJWT {
  // base64url
  base64url (source) {
    // Encode in classical base64
    let encodedSource = Base64.stringify(source)
    // Remove padding equal characters
    encodedSource = encodedSource.replace(/=+$/, '')

    // Replace characters according to base64url specifications
    encodedSource = encodedSource.replace(/\+/g, '-')
    encodedSource = encodedSource.replace(/\//g, '_')

    return encodedSource
  }

  // JWT生成
  genJwt (data) {
    // 署名用の暗号化キー
    let secret = 'fsahifhoasifhoisahfosdiahfoisahf'

    // ヘッダ部生成
    let header = {
      'alg': 'HS256',
      'typ': 'JWT'
    }
    let stringifiedHeader = Utf8.parse(JSON.stringify(header))
    let encodedHeader = this.base64url(stringifiedHeader)

    // データ部生成
    let stringifiedData = Utf8.parse(JSON.stringify(data))
    let encodedData = this.base64url(stringifiedData)

    // 署名生成
    let token = encodedHeader + '.' + encodedData
    let signature = HmacSHA256(token, secret)
    signature = this.base64url(signature)

    // JWT生成
    let jwt = token + '.' + signature

    return jwt
  }
}
