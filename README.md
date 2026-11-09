# Achouri Youcef Islem · Engineering portfolio

One general portfolio and three focused views for applied AI, research engineering, and software and spatial systems. Each view links to its matching CV. The case studies and community stories are shared across the relevant views.

```sh
npm ci
npm run typecheck
npm run build
npm run preview
```

The build uses React to render static HTML. The deployed site requires no browser JavaScript or application server. `dist/` contains the pages, fonts, images, walkthrough video and CVs. The photos were sourced from the candidate’s existing event archive. Diagrams are illustrations, with the screenshot marked as a prototype capture. The AzuridTwinUp video uses synthetic inspection bays and includes an on-page transcript.

Update the portfolio profiles in `src/profiles.ts`, the case studies and community records in `src/data.ts`, and the CVs in `public/resumes/`. `SITE_BASE` controls the path prefix and defaults to `/`. Set `SITE_BASE=/cv/` for a GitHub Pages project site at that path. Set `SITE_ORIGIN` to the deployment origin to populate canonical URLs. The private review build asks search engines to avoid indexing it. Use `SITE_PUBLIC=true` for the public build after review. Configure access through the hosting provider.
