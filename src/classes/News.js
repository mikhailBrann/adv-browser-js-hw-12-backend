import Server from "./Server.js";
import { faker, th } from '@faker-js/faker'
const port = process.env.PORT || 8787;

export default class News {
    constructor() {
        this.server = new Server();

        //rout init
        this.server.setGetRouter('/news', this.getNews.bind(this));

        //init port
        this.server.app.listen(port, async () => {
            console.log(`Server started on port ${port}`);
        });
    }

    async getNews(req, res) {
        try {
            //симуляция ошибки сервера, успешен один из 2х запросов в среднем 
            if((Math.floor(Math.random() * 2) + 1) != 1) {
                throw new Error("News server error");
            }

            const news = [];

            for (let i = 0; i < (Math.floor(Math.random() * 8) + 1); i++) {
                news.push(this._generateFakeNew());
            }

            return res.status(200).send({"status": "ok", "data": news});
        } catch (error) {
            return res.status(500).send({'status': 'error', 'message': error.message});
        }
    }

    _generateFakeNew() {
        const now = new Date();
        const twoHoursAgo = new Date(now.getTime() - 2 * 60 * 60 * 1000);

        return {
            "id": faker.string.uuid(),
            "data": faker.date.between({ from: twoHoursAgo, to: now }),
            "previewText": faker.lorem.words({ min: 2, max: 7 }),
        };
    }
}