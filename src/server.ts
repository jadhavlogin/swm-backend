// Copyright IBM Corp. 2019. All Rights Reserved.
// Node module: @loopback/example-express-composition
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

import {SolidwastemanagementApp} from './application';
import {ApplicationConfig} from '@loopback/core';
import {Request, Response} from 'express';
import * as express from 'express';
import * as path from 'path';
import pEvent from 'p-event';
import * as http from 'http';
import * as sql from 'mssql';

const config = {
  server: 'solidwastemanagement.ctkfwt1fpsdw.ap-south-1.rds.amazonaws.com',
  user: 'admin',
  password: 'target2020',
  database: 'devsolidwastemanagement',
  port: 1433,
  options: {
    trustedConnection: true,
    useUTC: true,
  },
};

function addUpdateGarbageCollection(
  req: any,
  res: any,
  type: any,
  recordset: any,
) {
  let query = '';
  if (type == 'UPDATE') {
    query =
      'update GarbageCollection set wetCollected=' +
      (req.body.wetCollected ? 1 : 0) +
      ', ' +
      'dryCollected=' +
      (req.body.dryCollected ? 1 : 0) +
      ', deadlyCollected=' +
      (req.body.deadlyCollected ? 1 : 0) +
      ', ' +
      'ewasteCollected=' +
      (req.body.ewasteCollected ? 1 : 0) +
      ', noCollection=' +
      (req.body.noCollection ? 1 : 0) +
      ' ' +
      'where garbageId=' +
      recordset.garbageId;
  } else {
    query =
      'insert into GarbageCollection(homeId, wetCollected, dryCollected, deadlyCollected, ewasteCollected, collectionDate, employeeId, isActive, actionOn, noCollection) values(' +
      '' +
      req.body.homeId +
      ', ' +
      (req.body.wetCollected ? 1 : 0) +
      ', ' +
      (req.body.dryCollected ? 1 : 0) +
      ', ' +
      (req.body.deadlyCollected ? 1 : 0) +
      ', ' +
      '' +
      (req.body.ewasteCollected ? 1 : 0) +
      ", '" +
      req.body.collectionDate +
      "', " +
      req.body.employeeId +
      ', ' +
      (req.body.isActive ? 1 : 0) +
      ', ' +
      "'" +
      req.body.actionOn +
      "', " +
      (req.body.noCollection ? 1 : 0) +
      ')';
  }

  const conn = new sql.ConnectionPool(config);
  try {
    conn.connect((err: any) => {
      if (err) {
        console.log('Error test: ' + err);
        return;
      }
      const sqlRequest = new sql.Request(conn);
      sqlRequest.query(query, (err: any, recordset: any) => {
        if (err) console.log(err);
        setTimeout(() => {
          res.status(200).json({
            message: 'success',
            status: 200,
          });
        }, 100);
      });
    });
  } catch (error) {
    res.status(201).json({
      message: 'No db connection...',
      status: 201,
    });
    conn.close();
  }
}

function getDateTime() {
  const date = new Date();
  const month = date.getMonth() + 1;
  const dateString =
    '' +
    date.getFullYear() +
    '-' +
    month +
    '-' +
    date.getDate() +
    ' ' +
    date.getHours() +
    ':' +
    date.getMinutes() +
    ':' +
    date.getSeconds();
  return dateString;
}

export class ExpressServer {
  private app: express.Application;
  public readonly lbApp: SolidwastemanagementApp;
  private server: http.Server;
  private sqlRequest: any;

  constructor(options: ApplicationConfig = {}) {
    this.app = express();
    // const AWS = require('aws-sdk');
    // const multerS3 = require('multer-s3');
    const bodyParser = require('body-parser');
    const cors = require('cors');

    this.lbApp = new SolidwastemanagementApp(options);

    this.app.use((req: Request, res: Response, next) => {
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
      );
      res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE',
      );
      if (req.method === 'OPTIONS') {
        res.setHeader(
          'Access-Control-Allow-Methods',
          'GET, POST, PATCH, DELETE, PUT',
        );
        return res.status(200).json({});
      }
      next();
    });

    this.app.use(
      cors({
        allowedHeaders: ['sessionId', 'Content-Type'],
        exposedHeaders: ['sessionId'],
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTION',
        preflightContinue: false,
      }),
    );

    // parse application/json
    this.app.use(bodyParser.json());

    // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({extended: false}));

    // Expose the front-end assets via Express, not as LB4 route
    this.app.use('/api', this.lbApp.requestHandler);

    // Custom Express routes
    this.app.get('/', function(_req: Request, res: Response) {
      res.sendFile(path.join(__dirname, '../public/express.html'));
    });

    // login API
    this.app.post('/admin/login', function(req: Request, res: Response) {
      const conn = new sql.ConnectionPool(config);
      try {
        conn.connect((err: any) => {
          if (err) {
            console.log('Error test: ' + err);
            return;
          }
          const sqlRequest = new sql.Request(conn);
          sqlRequest.query(
            'Select * from Employee where userName=' +
              "'" +
              req.body.userName +
              "' and password=" +
              "'" +
              req.body.password +
              "'",
            (err: any, recordset: any) => {
              if (err) console.log(err);
              setTimeout(() => {
                if (recordset && recordset.recordset.length > 0) {
                  res.status(200).json({
                    message: 'success',
                    status: 200,
                    data: recordset.recordsets[0],
                  });
                  conn.close();
                } else {
                  res.status(201).json({
                    message: 'Not Found',
                    status: 201,
                  });
                  conn.close();
                }
              }, 100);
            },
          );
        });
      } catch (error) {
        res.status(201).json({
          message: 'No db connection...',
          status: 201,
        });
        conn.close();
      }
    });

    //search user API
    this.app.get('/admin/search/:searchstring', function(
      req: Request,
      res: Response,
    ) {
      const conn = new sql.ConnectionPool(config);
      try {
        conn.connect((err: any) => {
          if (err) {
            console.log('Error test: ' + err);
            return;
          }
          const sqlRequest = new sql.Request(conn);
          const query =
            'Select * from PalikaHomes where ownerName LIKE ' +
            "N'%" +
            req.params.searchstring +
            "%' or homeNo='" +
            req.params.searchstring +
            "'";
          sqlRequest.query(query, (err: any, recordset: any) => {
            if (err) console.log(err);
            setTimeout(() => {
              if (recordset && recordset.recordset.length > 0) {
                res.status(200).json({
                  message: 'success',
                  status: 200,
                  data: recordset.recordsets[0],
                });
                conn.close();
              } else {
                res.status(201).json({
                  message: 'Not Found',
                  status: 201,
                });
                conn.close();
              }
            }, 100);
          });
        });
      } catch (error) {
        res.status(201).json({
          message: 'No db connection...',
          status: 201,
        });
        conn.close();
      }
    });

    //search user API New
    this.app.get('/admin/search/:vehicleNo/:searchstring', function(
      req: Request,
      res: Response,
    ) {
      const conn = new sql.ConnectionPool(config);
      try {
        conn.connect((err: any) => {
          if (err) {
            console.log('Error test: ' + err);
            return;
          }
          const sqlRequest = new sql.Request(conn);
          let query =
            'Select * from PalikaHomes where ownerName LIKE ' +
            "N'%" +
            req.params.searchstring +
            "%' or homeNo='" +
            req.params.searchstring +
            "'";
          if (req.params.vehicleNo && req.params.vehicleNo !== '') {
            query =
              'Select * from PalikaHomes where ownerName LIKE ' +
              "N'%" +
              req.params.searchstring +
              "%' or homeNo='" +
              req.params.searchstring +
              "' and vehicleNo='" +
              req.params.vehicleNo +
              "'";
          }
          sqlRequest.query(query, (err: any, recordset: any) => {
            if (err) console.log(err);
            setTimeout(() => {
              if (recordset && recordset.recordset.length > 0) {
                res.status(200).json({
                  message: 'success',
                  status: 200,
                  data: recordset.recordsets[0],
                });
                conn.close();
              } else {
                res.status(201).json({
                  message: 'Not Found',
                  status: 201,
                });
                conn.close();
              }
            }, 100);
          });
        });
      } catch (error) {
        res.status(201).json({
          message: 'No db connection...',
          status: 201,
        });
        conn.close();
      }
    });

    //update language API
    this.app.post('/admin/changeLanguage', function(
      req: Request,
      res: Response,
    ) {
      const conn = new sql.ConnectionPool(config);
      try {
        conn.connect((err: any) => {
          if (err) {
            console.log('Error test: ' + err);
            return;
          }
          const sqlRequest = new sql.Request(conn);
          const query =
            "update Employee set language= '" +
            req.body.language +
            "' where employeeId=" +
            req.body.userId;
          sqlRequest.query(query, (err: any, recordset: any) => {
            if (err) console.log(err);
            res.status(200).json({
              message: 'success',
              status: 200,
            });
          });
        });
      } catch (error) {
        res.status(201).json({
          message: 'No db connection...',
          status: 201,
        });
        conn.close();
      }
    });

    //get collection report
    this.app.get('/admin/getCollectionReport/:startdate', function(
      req: Request,
      res: Response,
    ) {
      const conn = new sql.ConnectionPool(config);
      try {
        conn.connect((err: any) => {
          if (err) {
            console.log('Error test: ' + err);
            return;
          }
          const sqlRequest = new sql.Request(conn);
          const query =
            "Select * from GarbageCollection where collectionDate = '" +
            req.params.startdate +
            "'";
          sqlRequest.query(query, (err: any, recordset: any) => {
            if (err) console.log(err);
            setTimeout(() => {
              if (recordset && recordset.recordset.length > 0) {
                res.status(200).json({
                  message: 'success',
                  status: 200,
                  data: recordset.recordsets[0],
                });
                conn.close();
              } else {
                res.status(201).json({
                  message: 'Not Found',
                  status: 201,
                });
                conn.close();
              }
            }, 100);
          });
        });
      } catch (error) {
        res.status(201).json({
          message: 'No db connection...',
          status: 201,
        });
        conn.close();
      }
    });

    //get homes by ward
    this.app.get('/admin/palikahomes/:wardId', function(
      req: Request,
      res: Response,
    ) {
      const conn = new sql.ConnectionPool(config);
      try {
        conn.connect((err: any) => {
          if (err) {
            console.log('Error test: ' + err);
            return;
          }
          const sqlRequest = new sql.Request(conn);
          const query =
            'Select * from PalikaHomes where wardId = ' + req.params.wardId;
          sqlRequest.query(query, (err: any, recordset: any) => {
            if (err) console.log(err);
            setTimeout(() => {
              if (recordset && recordset.recordset.length > 0) {
                res.status(200).json({
                  message: 'success',
                  status: 200,
                  data: recordset.recordsets[0],
                });
                conn.close();
              } else {
                res.status(201).json({
                  message: 'Not Found',
                  status: 201,
                });
                conn.close();
              }
            }, 100);
          });
        });
      } catch (error) {
        res.status(201).json({
          message: 'No db connection...',
          status: 201,
        });
        conn.close();
      }
    });

    //garbage update api
    this.app.post('/admin/garbagecollection', function(
      req: Request,
      res: Response,
    ) {
      const conn = new sql.ConnectionPool(config);
      try {
        conn.connect((err: any) => {
          if (err) {
            console.log('Error test: ' + err);
            return;
          }
          const sqlRequest = new sql.Request(conn);
          const query =
            "Select * from GarbageCollection where collectionDate = '" +
            req.body.collectionDate +
            "' and homeId=" +
            req.body.homeId;
          sqlRequest.query(query, (err: any, recordset: any) => {
            if (err) console.log(err);
            setTimeout(() => {
              if (recordset && recordset.recordset.length > 0) {
                addUpdateGarbageCollection(
                  req,
                  res,
                  'UPDATE',
                  recordset.recordset[0],
                );
                conn.close();
              } else {
                addUpdateGarbageCollection(req, res, 'CREATE', null);
                conn.close();
              }
            }, 100);
          });
        });
      } catch (error) {
        res.status(201).json({
          message: 'No db connection...',
          status: 201,
        });
        conn.close();
      }
    });

    // Serve static files in the public folder
    this.app.use(express.static(path.join(__dirname, '../public')));
  }

  public async boot() {
    await this.lbApp.boot();
  }

  public async start() {
    const port = this.lbApp.restServer.config.port || 4000;
    const host = this.lbApp.restServer.config.host || 'localhost';
    this.server = this.app.listen(port, '0.0.0.0');
    this.server.timeout = 90000000;
    this.server.setTimeout(800000);
    await pEvent(this.server, 'listening');
  }

  // For testing purposes
  public async stop() {
    if (!this.server) return;
    this.server.close();
    await pEvent(this.server, 'close');
  }
}

function getOrgbyID(res: any, orgID: any) {
  const conn = new sql.ConnectionPool(config);
  try {
    conn.connect((err: any) => {
      if (err) {
        console.log('Error test: ' + err);
        return;
      }
      const sqlRequest = new sql.Request(conn);

      const query =
        'select * from MasterOrganisation where ID_PkOrgID=' + orgID;
      sqlRequest.query(query, (err: any, recordset: any) => {
        if (err) console.log(err);
        if (recordset && recordset.recordset.length > 0) {
          res.status(200).json({
            message: 'success',
            status: 200,
            data: recordset.recordsets[0],
          });
          conn.close();
        } else {
          res.status(201).json({
            message: 'Not Found',
            status: 201,
            data: [],
          });
          conn.close();
        }
      });
    });
  } catch (error) {
    res.status(201).json({
      message: 'No db connection...',
      status: 201,
      data: [],
    });
    conn.close();
  }
}
