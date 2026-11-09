# Achouri Youcef Islem · Engineering portfolio

One general portfolio and three focused views for applied AI, research engineering, and software and spatial systems. Each view links to its matching CV. The case studies and community stories are shared across the relevant views.

```sh
npm ci
npm run typecheck
npm run build
npm run preview
```

The build uses React to render static HTML. The case studies work without an application server. `dist/` contains the pages, fonts, images, walkthrough video and CVs. The Babylon.js demo uses browser JavaScript, with its own allowlisted synthetic room assets and precomputed model outputs. The AzuridTwinUp video uses synthetic inspection bays and includes an on-page transcript. The event photos came from the candidate’s existing archive.

Update the portfolio profiles in `src/profiles.ts`, the case studies and community records in `src/data.ts`, and the CVs in `public/resumes/`. `SITE_BASE` controls the path prefix and defaults to `/`. Set `SITE_BASE=/cv/` for a GitHub Pages project site at that path. Set `SITE_ORIGIN` to the deployment origin to populate canonical URLs. The private review build asks search engines to avoid indexing it. Use `SITE_PUBLIC=true` for the public build after review. Configure access through the hosting provider.
