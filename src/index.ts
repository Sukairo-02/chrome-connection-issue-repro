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

app.use('/headers', (c, next) => {
	c.header('Access-Control-Allow-Private-Network', 'true')
	c.header('Content-Security-Policy', 'treat-as-public-address')

	return next()
})

app.get('/', (c) => {
	return c.text('Connected')
})

app.get('/headers', (c) => {
	return c.text('Connected')
})

serve({
	port: Number(process.argv[2]),
	fetch: app.fetch
})
