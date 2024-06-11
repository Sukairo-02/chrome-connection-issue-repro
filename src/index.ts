import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('*', cors({
 origin: '*'
}))

app.get('/', (c) => {

    return c.text('Connected')
})

serve({
    port: Number(process.argv[2]),
    fetch: app.fetch
})