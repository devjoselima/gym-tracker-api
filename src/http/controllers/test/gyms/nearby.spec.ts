import request from 'supertest'
import { app } from '@/app'
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateUser } from '@/utils/create-and-authenticate-user'

describe('Search Gym (e2e)', () => {
    beforeAll(async () => {
        await app.ready()
    })

    afterAll(async () => {
        await app.close()
    })

    it('should be able to get nearby gyms', async () => {
        const { token } = await createAndAuthenticateUser(app)

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Javascript Gym',
                description: 'Some description.',
                phone: '2195635415',
                latitude: -22.8889271,
                longitude: -43.3190064,
            })

        await request(app.server)
            .post('/gyms')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'Typescript Gym',
                description: 'Some description.',
                phone: '2195635415',
                latitude: -22.7987937,
                longitude: -43.2058229,
            })

        const response = await request(app.server)
            .get('/gyms/nearby')
            .query({
                latitude: -22.8889271,
                longitude: -43.3190064,
            })
            .set('Authorization', `Bearer ${token}`)
            .send()

        expect(response.statusCode).toEqual(200)
        expect(response.body.gyms).toHaveLength(1)
        expect(response.body.gyms).toEqual([
            expect.objectContaining({
                title: 'Javascript Gym',
            }),
        ])
    })
})
