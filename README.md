# CFQ-R questionnaire

[![Netlify Status](https://api.netlify.com/api/v1/badges/512d9a1f-ff4d-45e7-839b-24fafc75e894/deploy-status)](https://app.netlify.com/sites/cfqr-app/deploys)

## Preview

You can find a live version of the application at [http://cfqr-app.netlify.app/](http://cfqr-app.netlify.app/).

<a href="https://www.netlify.com">
  <img src="https://www.netlify.com/img/global/badges/netlify-dark.svg" alt="netlify-logo" />
</a>

## Requirements

* Node.js 24 or later (see `.nvmrc`)

## Install

```bash
git clone https://github.com/cphcrd/cfqr-app.git
cd cfqr-app && npm install
```

Copy your Firebase and Google Analytics values into a `.env` file:

```
FIREBASE_API_KEY=...
FIREBASE_AUTH_DOMAIN=...
FIREBASE_DATABASE_URL=...
GOOGLE_ANALYTICS_ID=...
```

## Run

```bash
npm run dev       # development server
npm run build     # production build in dist/
npm run preview   # serve the production build
npm run lint
```

## Deploy

Netlify builds the app with `npm run build` and publishes `dist/` (see `netlify.toml`).
The environment variables above must be set in the Netlify site settings.
