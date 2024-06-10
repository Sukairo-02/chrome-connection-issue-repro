import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {

    return c.text('Connected')
})

serve({
    port: Number(process.argv[2]),
    fetch: app.fetch
})