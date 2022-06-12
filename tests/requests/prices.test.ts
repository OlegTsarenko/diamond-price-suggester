import request from "supertest";
import app from "../../src/app";
import {closeConnection, createConnection} from "../db";

beforeAll(createConnection)

afterAll(closeConnection)

describe('Price Calculation', () => {
  it('should calculate a different types of price', async () => {
    expect(true).toBe(true)
    const res = await request(app)
      .get('/api/v1/prices/calculate')
      .set('Accept', 'application/json')
      .query({ shape: 'round', weight: 0.12,  color: 'D',  clarity: 'FL' })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('basicPrice')
    expect(res.body).toHaveProperty('averagePriceByDeals')
    expect(res.body).toHaveProperty('averagePriceByEstimation')
  })
})
