# Design Pattern Tutorial

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

## CI/CD Status

[![CI](https://github.com/Hatim-Bohra/Design-Pattern-Tutorial/actions/workflows/ci.yml/badge.svg)](https://github.com/Hatim-Bohra/Design-Pattern-Tutorial/actions/workflows/ci.yml)

## Environment Variables

This project requires environment variables to run correctly in production. Use `.env.example` as a template.

1. Copy `.env.example` to `.env.local` for local development.
2. Add the actual values to `.env.local`. **DO NOT COMMIT THIS FILE.**

## Deployment

### Vercel (Recommended)

This project is optimized for deployment on [Vercel](https://vercel.com).

1. **Push your code to GitHub.**
2. **Import project into Vercel:**
    - Go to your Vercel Dashboard.
    - Click "Add New..." -> "Project".
    - Import the `Design-Pattern-Tutorial` repository.
3. **Configure Environment Variables:**
    - In the import flow, expand "Environment Variables".
    - Add any variables defined in `.env.example` (e.g., `NEXT_PUBLIC_APP_URL`).
4. **Deploy:**
    - Click "Deploy". Vercel will auto-detect Next.js and build your app.

**Note:** Every Pull Request (PR) will automatically generate a **Preview Deployment** URL for testing. Pushing to `main` will automatically deploy to **Production**.

### GitHub Actions (CI)

This repository includes a CI pipeline (`.github/workflows/ci.yml`) that runs on every Push to `main` and Pull Request. It checks:
- Linting (`npm run lint`)
- Tests (`npm test`)
- Build (`npm run build`)

Ensure the pipeline passes before merging.
