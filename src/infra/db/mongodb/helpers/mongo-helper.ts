import { MongoClient, type Collection } from 'mongodb'
import {} from '../account-repository/account-mapper'
export const MongoHelper = {
  client: null as MongoClient,
  uri: null as string,

  async connect(url: string): Promise<void> {
    this.uri = url
    this.client = await MongoClient.connect(this.uri as string)
  },

  async disconnect(): Promise<void> {
    await this.client.close()
    this.client = null
  },

  async getCollection(collectionName: string): Promise<Collection> {
    if (!this.client) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(collectionName)
  },

  map(collection: any): any {
    const { _id, ...rest } = collection
    const result = Object.assign({}, rest, { id: _id })
    delete result._id
    return result
  }
}
