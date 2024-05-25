import { type AccountModel } from '../../../../domain/models/account'

export const mapAccount = (value: any): AccountModel => {
  const { _id, ...rest } = Object.assign({}, value, {
    id: value._id.toString()
  })
  const account = {
    id: rest.id,
    name: rest.name,
    email: rest.email,
    password: rest.password
  }
  return account
}
