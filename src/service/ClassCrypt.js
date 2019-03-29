import Aes from 'crypto-js/aes'
import Ecb from 'crypto-js/mode-ecb'
import Pkcs7 from 'crypto-js/pad-pkcs7'
import Base64 from 'crypto-js/enc-base64'
import Utf8 from 'crypto-js/enc-utf8'
const _options = {
  mode: Ecb,
  padding: Pkcs7
}

export default class ClassCrypto {
  // encrypt
  encrypt (plaintext, keyphrase, options) {
    let opt = options || _options
    let endata = Aes.encrypt(plaintext, keyphrase, opt)
    let ciphertext = endata.ciphertext.toString(Base64)
    return {
      endata: endata,
      ciphertext: ciphertext
    }
  }

  // decrypt
  decrypt (endata, keyphrase, options) {
    let opt = options || _options
    let dedata = Aes.decrypt(endata, keyphrase, opt)
    let plaintext = dedata.toString(Utf8)
    return {
      dedata: dedata,
      plaintext: plaintext
    }
  }
}
