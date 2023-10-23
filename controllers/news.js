const axios = require('axios');

class Controller {
    static async getNews(req, res, next) {
        try {
            const {page=1} = req.query
            const {data} = await axios({
                method: "get",
                url: "https://newsapi.org/v2/everything",
                params: {
                    apiKey: process.env.NEWS_API_KEY,
                    q: "book OR novel OR literature",
                    sortBy: "relevancy",
                    pageSize: 20,
                    page
                }
            })

            const output = data.articles.map((el) => {
                const {source, ...obj} =el 
                return {
                    ...obj,
                    source: el.source.name
                }
            })
            .filter((el) => el.description)

            res.status(200).json(output)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller