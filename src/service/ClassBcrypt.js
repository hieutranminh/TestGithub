import bcrypt from 'bcryptjs'

export default class AppBcrypt {
  toHashPassword (source, num) {
    let salt = bcrypt.genSaltSync(num)
    let hash = bcrypt.hashSync(source, salt)
    console.log('toHashPassword', hash)
    return hash
  }

  toCheckPassword (source, hash) {
    let res = bcrypt.compareSync(source, hash)
    // let res = bcrypt.compareSync('not_bacon', hash)
    return res
  }
}
