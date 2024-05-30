import { type LogErrorRepository } from '../../../../data/protocols/log-error-protocols'
import { MongoHelper } from '../../mongodb/helpers/mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  async logError(stack: string): Promise<void> {
    const errroCollection = await MongoHelper.getCollection('errors')
    errroCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
