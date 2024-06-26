import { SignUpController } from '../../presentation/controllers/signup/signup'
import { EmailValidatorAdapter } from '../../utils/email-validator-adapter'
import { AccountMongoRepository } from '../../infra/db/mongodb/account-repository/account'
import { DbAddAccount } from '../../data/usecases/add-account/db-add-account'
import { BcryptAdapter } from '../../infra/cryptography/bcrypt-adapter'
import { type Controller } from '../../presentation/protocols'
import { LogControllerDecorator } from '../decoratos/log'
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log'

export const makeSignUpController = (): Controller => {
  const logErrorRepository = new LogMongoRepository()
  const salt = 12
  const emailValidator = new EmailValidatorAdapter()
  const bcrypt = new BcryptAdapter(salt)
  const addAccountRepository = new AccountMongoRepository()
  const dbAddAccount = new DbAddAccount(bcrypt, addAccountRepository)
  const signUpController = new SignUpController(emailValidator, dbAddAccount)
  return new LogControllerDecorator(signUpController, logErrorRepository)
}
