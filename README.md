# React Boilerplate

## Included

### Frontend Libraries
- React
- React Router
- Material UI
- Webpack
- Webpack Serve

### Backend
- Express
- Response compression
- Prometheus metrics
- Liveness + Readiness checks

## Using

### `npm run dev`
Starts the application for development using `webpack-serve`.

### `npm run build`
Builds the application and outputs it to `./dist`.

### `npm start`
> Requires `npm run build` to have been run.
Starts the application in production using an Express server.

## Configuring

### `PORT`
> Defaults to `3000` for `npm run dev` and `8080` for `npm start`

This configures the port which the application will listen to.
