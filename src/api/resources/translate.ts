import { Hono } from 'hono';
import { Ai } from '@cloudflare/ai';
import { Env } from '../../index';
import { TranslatorRequest } from '../domain/translator';

const translateApp = new Hono<{Bindings: Env}>().basePath('/translator');

translateApp.post('/', async (c) => {
  try {
    const body = await c.req.json() as Partial<TranslatorRequest>;
    const content = body.content;
    
    const ai = new Ai(c.env.AI);
    
    if (content) {
      const response = await ai.run(
        "@cf/meta/m2m100-1.2b",
        {
          text: content,
          source_lang: "spanish",
          target_lang: "english",
        }
      );

      return c.json(response);
    }

    c.status(500);
    return c.json({ message: 'Something weird happened, please try again.' });
  } catch (error) {
    const errorMsg = (error as Error).message;
    c.status(500);
    return c.json({ message: errorMsg });
  }
});

export default translateApp;
