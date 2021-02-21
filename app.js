const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const cheerio = require('cheerio');
const _ = require('lodash');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



app.get('/api/:user', (req, res, next) => {
  const { user  } = req.params;
  const colors = [ '#ebedf0', '#9be9a8','#40c463', '#30a14e', '#216e39'];
  // Render 400 if invalid format given
  const url = `https://www.github.com/${user}`;
  request.get(url, (err, response, body) => {
    // Return error if request had an error
    if (err) return next(err);

    // Return 404 if user not found
    if (response.statusCode === 404) return next({
      status: 404,
      message: `User '${user}' not found`
    });

    // Parse github profile page
    const $ = cheerio.load(body);
    const data = $('rect').get().reduce((data, rect) => {
      // Parse contributions value
      const value = (() => {
        return  { count: $(rect).data('count'), level:  $(rect).data('level'), color: colors[$(rect).data('level')] }
      })();

      // Parse contributions date
      if ($(rect).data('date')!==undefined) {
        const [year, month, day] = $(rect).data('date').split('-').map(
            dateNum => parseInt(dateNum));
        _.setWith(data, $(rect).data('date'), value, Object);
      }

      return data;

    }, {});

    // Render parsed contributions data
    res.json({ data });
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ message: err.message });
});

module.exports = app;
