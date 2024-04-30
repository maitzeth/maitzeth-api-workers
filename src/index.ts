import { Ai } from '@cloudflare/ai';
import { Hono } from 'hono';
import steamRoutes from './api/resources/steam';
import translateRoutes from './api/resources/translate';

export type Env = {
  AI: Ai;
	BASE_URL: string;
	KEY: string;
	SteamID: string;
}

const app = new Hono<{Bindings: Env}>();

app.route("/", translateRoutes);
app.route("/", steamRoutes);

app.get('/', (c) => {
	return c.text('Hello world, maitzeth');
});

export default app;
 