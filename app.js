import express, { json, urlencoded } from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { config } from 'dotenv';
import Sequelize from "sequelize";
import cors from 'cors';
import axios from 'axios';

import db from './db.js';
import indexRouter from './route.js';

var app = express();

config();

const port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(join(__dirname, 'public')));
app.use(cors());
app.use('/', indexRouter);

// const seq = db;

const seq = new Sequelize('mysql://root:CtkHleNgIv3HoFOwmhyI@containers-us-west-51.railway.app:5738/railway') // Example for sqlite

seq.authenticate().then(() => {
  console.log('Connection has been established sucessfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  console.log("next-------------------------------------")
})

// async function sendLine(body) {
//   let params = {
//     url: "https://notify-api.line.me/api/notify",
//     method: "POST",
//     headers: {
//       Authorization: "Bearer " +'RPoTqpvOSJUE1TPC3I8UqG6r1htyfyvWOEVwr8mzR2q',
//       "Content-Type": "application/x-www-form-urlencoded",
//       // 'X-Line-Retry-Key': '<UUID>'
//       // 'Content-Type': 'multipart/form-data'
//     },
//     params: {
//       message: `${body}預算水位警告 目前剩餘庫存：${body} 請與廠商補貨`,
//     },
//   };

//   try {
//     await axios(params);
//     console.log("line successed ");
//     return;
//   } catch (err) {
//     console.log("err: ", err);
//     return;
//   }
// }
// sendLine('愛你');


export default app;
export { seq };

