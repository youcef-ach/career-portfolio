# Achouri Youcef Islem · Engineering portfolio

One general portfolio and three focused views for applied AI, research engineering, and software and spatial systems. Each view links to its matching one-page CV. Thirteen case studies and authentic community stories are shared across the relevant views.

```sh
npm ci
npm run typecheck
npm run build
npm run preview
```

The build uses React to render static HTML. The case studies work without an application server. `dist/` contains the pages, fonts, images, walkthrough video and CVs. The virtual-staging case study shows a curated Matterport Pro3 sample view with aligned Mask2Former and SAM outputs. Its interactive furniture demo uses allowlisted synthetic room assets and precomputed model outputs. The AzuridTwinUp video uses synthetic inspection bays and includes an on-page transcript. The event photos came from the candidate’s existing archive.

Update the portfolio profiles in `src/profiles.ts`, the case studies and community records in `src/data.ts`, and the CVs in `public/resumes/`. `SITE_BASE` controls the path prefix and defaults to `/`. Set `SITE_BASE=/cv/` for a GitHub Pages project site at that path. Set `SITE_ORIGIN` to the deployment origin to populate canonical URLs.

## Deployment and evidence

The current deployment is [youcef-achouri.vercel.app](https://youcef-achouri.vercel.app/), using the existing Vercel project and `vercel.json`. The `.vercel/` account binding is local and ignored. The old `.openai/hosting.json` record is historical, not the current deployment target.

The default build requests `noindex,nofollow`. This is a public website: search-engine directives do not restrict access. Matterport sample reuse terms still need confirmation before broader redistribution or enabling indexing with `SITE_PUBLIC=true`. Raw E57 files, industrial customer captures and private organization source are excluded.

AzuridTwinUp hosting is in transition. Its case study provides a recorded, explicitly synthetic viewer demonstration and a project-discussion contact. Do not deploy to or test the former VPS as part of a portfolio release.

Majara and e-RCP describe the candidate's frontend work without publishing their private organizational code. DQN links to 90 archived runs, provenance and corrected results. No claim of production certification, comprehensive test coverage or measured accessibility compliance is made.

For a release, run typecheck and build, inspect desktop/mobile layouts, check local links, and compare the four deployed PDF hashes with the reviewed CV files. Keep CV facts, case-study scope and download versions synchronized.
