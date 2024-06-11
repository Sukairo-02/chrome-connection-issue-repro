import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.use(
	'*',
	async (c, next) => {
		c.res.headers.set('Access-Control-Allow-Headers', '*')
		c.res.headers.set('Access-Control-Allow-Methods', 'GET,PUT,POST,OPTIONS')
		c.res.headers.set('Access-Control-Allow-Origin', '*')

		if (c.req.header('Access-Control-Request-Private-Network') === 'true') {
			c.res.headers.set('Access-Control-Allow-Private-Network', 'true')
		}

		return await next()
	}
)

app.options('*', (c) => {
    if(c.req.url.split('/').pop() === '') {
        c.res.headers.delete('Access-Control-Allow-Private-Network')
    }

	return c.text('OK')
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
