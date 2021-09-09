import { ExpressServer } from './server';
import { ApplicationConfig } from '@loopback/core';

export { ExpressServer };

export async function main(options: ApplicationConfig = {}) {
  const app = new ExpressServer(options);
  await app.boot();
  await app.start();

  console.log("Server started!!!!!! ");

  return app;
}
