# Vaibhav Garg Portfolio Frontend

Next.js 15 App Router frontend with TypeScript, Tailwind, Framer Motion, shadcn-style UI primitives, TanStack Query, Zustand, and Vercel Analytics.

## Local setup

1. Install dependencies
   ```bash
   npm install
   ```
2. Add environment file:
   ```bash
   # .env.local
   NEXT_PUBLIC_API_BASE_URL=http://127.0.0.1:8000/api
   ```
3. Run
   ```bash
   npm run dev
   ```

## LAN / mobile access

If `http://192.168.177.119:3000` is not opening, start Next.js on all interfaces:

```bash
npm run dev:network
```

Also set the frontend API URL to backend LAN URL in `.env.local`:

```bash
NEXT_PUBLIC_API_BASE_URL=http://192.168.177.119:8000/api
```

## Production deployment

- Deploy to **Vercel**
- Set `NEXT_PUBLIC_API_BASE_URL` to your deployed Django API base URL
