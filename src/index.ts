import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

const app = new Hono()

app.use(
	'*',
	cors({
		origin: '*',
		allowMethods: ['GET', 'PUT', 'POST', 'OPTIONS'],
		allowHeaders: ['*']
	})
)

app.get('/', (c) => {
	return c.text('Connected')
})

app.get('/headers', (c) => {
    c.res.headers.set('Access-Control-Allow-Private-Network', 'true')
	c.res.headers.set('Content-Security-Policy', 'treat-as-public-address')

	return c.text('Connected')
})

serve({
	port: Number(process.argv[2]),
	fetch: app.fetch
})
