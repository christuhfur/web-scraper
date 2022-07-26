const PORT = 8000

const axios = require('axios')
const cheerio = require('cheerio')
const express = require('express')

const app = express()
const url = 'https://www.theguardian.com/uk'

axios(url)
    .then(response => {
        const html = response.data
        const cheer = cheerio.load(html)

        const articles = []

        cheer('.fc-item__title', html).each(function() {
            const title = cheer(this).text()
            const url = cheer(this).find('a').attr('href')
            articles.push({
                title,
                url
            })
        })
        console.log(articles)
    }).catch(err => console.log(err))


app.listen(PORT, () => console.log('server running on PORT ' + PORT) )
