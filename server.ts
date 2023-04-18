import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import { DBUtil } from './Util/DBUtil';
import userRouter from './router/userRouter';

const app: Application = express();

app.use(express.json());

dotenv.config({
    path: "./.env"
});

const port: string | Number = process.env.PORT || 2525;
const hostname: string | undefined = process.env.EXPRESS_HOST_NAME;
const dbUrl: string | undefined = process.env.MONGO_DB_CLOUD_URL;
const dbName: string | undefined = process.env.MONGO_DB_DATABASE;


app.get("/", (request: Request, response: Response) => {
    response.status(200);
    response.json({
        msg: "welcome to Express Sever"
    });
});

app.use("/user",userRouter)

if (port && hostname) {
    app.listen(Number(port),hostname, () => {
        if (dbUrl && dbName) {
            console.log(`${dbUrl} - ${dbName}`);
            DBUtil.connectToDB(dbUrl, dbName).then((dbResponse) => {
                console.log(dbResponse);
            }).catch((error) => {
                console.error(error);
                process.exit(0); 
            });
        }
        console.log(`Express Server is started at http://${hostname}:${port}`);
    });
}


