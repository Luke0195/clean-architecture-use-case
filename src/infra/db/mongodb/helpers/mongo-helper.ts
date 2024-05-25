import { MongoClient, type Collection } from 'mongodb'
import {} from '../account-repository/account-mapper'
export const MongoHelper = {
  client: null as MongoClient,

  async connect(url: string): Promise<void> {
    this.client = await MongoClient.connect(url)
  },

  async disconnect(): Promise<void> {
    await this.client.close()
  },

  getCollection(collectionName: string): Collection {
    return this.client.db().collection(collectionName)
  },

  map(collection: any): any {
    const { _id, ...rest } = collection
    const result = Object.assign({}, rest, { id: _id })
    delete result._id
    return result
  }
}
