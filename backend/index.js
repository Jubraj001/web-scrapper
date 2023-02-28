const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
var cors = require('cors');
const app = express();
app.use(cors);
app.get('/articles/:domain/:page', (req, res) => {
  const domain = req.params.domain;
  const page = req.params.page;
  const url = `https://medium.com/tag/${domain}/latest`;
  let article=[];
  axios.get(url)
  .then(response => {
    const html = response.data;
    const $ = cheerio.load(html);
    const headings=$('h2');
    const description = $('div.h.k>p');
    for(let i=0;i<10;i++)
    {
      if(headings.length>i)
      {
        let arr = {
          'title': $(headings[i]).text(),
        }
        article.push(arr);
      }
    }
    res.send(article);
  })
  .catch(error => {
    console.log(error);
  });
  console.log(article);
});

app.listen(5000, () => {
  console.log('Server is listening on port 5000');
});