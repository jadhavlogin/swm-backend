import { ExpressServer } from '../../server';
import { SolidwastemanagementApp } from '../../application';
import {
  createRestAppClient,
  givenHttpServerConfig,
  Client,
  supertest,
} from '@loopback/testlab';
import { Server } from 'http';

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    // port: +process.env.PORT,
  });

  const app = new ExpressServer({
    rest: restConfig,
  });

  await app.boot();
  await app.start();

  let lbApp = app.lbApp;
  const client = supertest('http://127.0.0.1:4000');

  return { app, client, lbApp };
}

export interface AppWithClient {
  app: ExpressServer;
  client: Client;
  lbApp: SolidwastemanagementApp;
}
