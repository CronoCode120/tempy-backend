import { MongoClient } from "mongodb"

export class CountryRepositoryMongo {
    private client: MongoClient
    private database: any
    private countries: any

    constructor() {
        this.client = new MongoClient('mongodb://localhost:27017/')
        this.database = this.client.db('TestDatabase')
        this.countries = this.database.collection('countries')
    }

    async connect() {
        console.log('Connecting');
        await this.client.connect()
        console.log('Connected');
    }

    async disconnect() {
        await this.client.close()
    }

    async getCountryList() {
        return await this.countries.find({}).toArray()
    }
}