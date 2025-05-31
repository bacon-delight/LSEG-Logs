# Log Monitoring

This repository is intended for a coding challenge from LSEG. The application takes in CSV format logs with 4 columns:

- Time (HH:MM:SS)
- Job Name (String)
- Job Type (START / END)
- Job ID (Number)

## Tech Stack

This is a UI only application where the data is processed in the browser itself. No backend requests are sent for processing. The tech stack used here is:

- VueJS (Core Framework)
- PrimeVue (Component Library)
- ChartJS (Charts)

#### Cool Features

- Themes (Dark / Light) based on system preferences
- Meaningful charts
- Data table with sorts

#### Basic Assumptions

- I did not get enough time for CSV validations, so if you're uploading files which are of different CSV formats, the results will go haywire. The assumption is that the files that will be used for testing this will be of the same format.
- All jobs are completed within the same day, because the timestamps here are "HH:MM:SS" which doesn't comprise of a date. So it's not possible to provide a meaningful estimation if the job finishes the next day, or a few days later.

#### Future Scope

- Improve & incorporate unit tests
- Improve responsiveness (although I have added basic responsiveness)

## Project Setup

#### Install Dependencies

```sh
npm install
```

#### Compile and Hot-Reload for Development

```sh
npm run dev
```

#### Type-Check, Compile and Minify for Production

```sh
npm run build
```

#### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

#### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
