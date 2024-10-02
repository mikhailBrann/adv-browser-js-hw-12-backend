import express from "express";
import cors from 'cors';


export default class Server {
    constructor() {
        this.app = express();

        //корс заглушка
        this.app.use(cors());
        //отключение кеширования
        this.app.enable('view cache');
        this.app.set('view cache', false);
        this.app.use(express.json());

        //middleware который задерживает ответ сервера с 0.2 до 9 секунд
        this.app.use((req, res, next) => {
            const delay = Math.random() * (9000 - 200) + 200;
            setTimeout(next, delay);
        });
    }
    
    setPostRouter(path, callback) {
        this.app.post(path, callback);
    }

    setGetRouter(path, callback) {
        this.app.get(path, callback);
    }
}