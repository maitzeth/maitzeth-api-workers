## Maitzeth Hono APIs

This is just an small repo to share how to deploy Workers to cloudflare using Hono framework.

## Routes

```
Base URL: https://maitzeth-api.andre801mz.workers.dev
```

#### Available routes: 

```
GET: 
/steam/profile
```

```
GET:
/steam/games
```

## Translator using Cloudflare AI

```
AI Model: m2m100-1.2b
Type POST: /translator
Content-Type: application/json
Body: { "content": "This is your string" }
```
