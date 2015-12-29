var http = require('http');
var url = require('url');
var cheerio = require('cheerio');
var couchtunerHost = 'couchtuner.ch';
var crypto = require('crypto');


http.createServer(function (req, res) {
  
  function loadPage(options, callback) {

    var request = http.request(options, function (res) {
        var data = '';
        res.on('data', function (chunk) {
            data += chunk;
        });
        res.on('end', function () {
            callback(data);
        });
    });
    request.on('error', function (e) {
        console.log(e.message);
    });
    request.end();    
  }
  
  function loadVideos(pageUrl) {
    var parsedUrl = url.parse(pageUrl);
    console.log(parsedUrl);
    loadPage({
      host: couchtunerHost,
      path: parsedUrl.path
    }, function(data) {
      var $ = cheerio.load(data);
      var anotherUrl = $('#content .post .entry strong a').attr('href');
      console.log(anotherUrl);
      var parsedUrl = url.parse(anotherUrl);
      loadPage({
        host: parsedUrl.host,
        path: parsedUrl.path
      }, function(data) {
      var $ = cheerio.load(data);
      var urls = $('.postTabs_divs iframe').map(function() {
        return $(this).attr('src')
      }).get();
      console.log(urls);
      urls.forEach(function(pageUrl) {
        if (pageUrl.match(/thevideo/)) {
          var parsedUrl = url.parse(pageUrl);
          loadPage({
            host: parsedUrl.host,
            path: parsedUrl.path
          }, function(data) {
            
            var videoUrl = data.match(/http.*\.mp4.*'/).pop().replace(/'/g, '');
            res.write('["'+ videoUrl + '"]');
            res.end();
          });
          
        }
      });
      
      })
      
    });
  }
  
  function loadReleases() {
    loadPage({
      host: couchtunerHost,
      path: '/'
    }, function(data) {
      var $ = cheerio.load(data);
      var links = $('#content .post .tvbox > a');
      res.write(JSON.stringify(links.map(function(index, node) {
        var parts = $(this).html().replace(/<span.*<\/span>/gi, '').split('<br>');
        var style = $('span', this).attr('style');
        var imageUrl = '';
        if (style) {
          imageUrl = '//' + couchtunerHost + style.match(/\(.*\)/gi)[0].replace('(', '').replace(')', '');
        }
        
        return {
          id: $(this).attr('href'),//crypto.createHash('md5').update($(this).attr('href')).digest('hex'),
          title: parts[0].trim(),
          subtitle: parts[1].trim(),
          imageUrl: imageUrl,
          episodeUrl: $(this).attr('href')
        };
      }).get()));
      
      res.end();
    });
  }
  
  var parsedUrl = url.parse(req.url);
  var pathname = parsedUrl.pathname;
  res.writeHead(200, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*'
  });
  switch (pathname) {
    case '/releases':
      if (parsedUrl.query) {
        loadVideos(parsedUrl.query.split('=').pop());
      } else {
        loadReleases();
      }
      break;
    case '/shows':
      res.write('shows');
      res.end();
      break;
  }
  
}).listen(8081, process.env.IP);