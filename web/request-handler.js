var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //check url to determine type of get
  var currentPath = req.url;
  // var pathname = currentPath[url.pathname];
  
  if (req.method === 'GET') {
    // var statusCode = 200;
    if (currentPath === '/') {

      httpHelpers.serveIndex(res, 'index.html', (data) => {
        res.writeHead(200, httpHelpers.headers);
        res.write(data);
        res.end();
        // httpHelpers.serveIndex(res, 'styles.css', (data) => {
        //   res.writeHead(200, httpHelpers.headers);
        //   res.write(data);
        //   res.end(); 
        // });


      });
      // fs.readFile(archive.paths.siteAssets + '/index.html', 'utf-8', (err, data) => {
      //   if (err) { throw err; }
      //   res.writeHead(statusCode, httpHelpers.headers);
      //   res.write(data);
      //   res.end();
        // fs.readFile(archive.paths.siteAssets + '/styles.css', 'utf-8', (err, data) => {
        //   if (err) { throw err; }
        //   res.writeHead(statusCode, httpHelpers.headers);
        //   res.write(data);
        //   
        // });
      // });


    } else if (currentPath) {
      console.log('currentPath', currentPath);
      archive.isUrlArchived(currentPath.slice(1), function (exists) {
        if (!exists) {
          // statusCode = 404;
          res.writeHead(404, httpHelpers.headers);
          res.end('error. 404 nonexistent file');
        } else {
          httpHelpers.serveAssets(res, currentPath, function (data) {
            res.writeHead(200, httpHelpers.headers);
            res.end(data); 
          });
        }
      });
      
    }
  } else if (req.method === 'POST') {
    
    let body = '';
    req.on('data', function(chunk) {
      body += chunk;
    }); 

    req.on('end', function() {

      console.log('body', body);
      var parsedBody = querystring.parse(body);
console.log('body', parsedBody);
console.log(parsedBody.url);
      var curURL = parsedBody.url;
      // res.writeHead(302, httpHelpers.headers);
      //check if urlisarchived
      archive.isUrlArchived(curURL, function(exists) {
        console.log('exists', exists);
        if (exists) {
          console.log('inside cb exists')
          httpHelpers.serveAssets(res, curURL, function(data) {
            console.log('Inside the serve assets');//status not being hit
            res.writeHead(302, httpHelpers.headers);
            console.log('Data:', data);
            res.end(data);
          });
        } else {
          console.log('inside else')
          console.log('curURL',curURL)
          httpHelpers.serveIndex(res, 'loading.html', function(data) {
            console.log('inside serveindex', data);
            res.writeHead(302, httpHelpers.headers);
            res.write(data); //serve loading.html
            res.end();
            // archive.isUrlInList(curURL, function(exists) {
            //   if (!exists) {
            //     archive.addUrlToList(curURL, function() {
            //       console.log('added to list!');
            //     });
            //   }
              
            //   archive.isUrlArchived(curURL, function(exists) {
            //     if (exists) {
            //       httpHelpers.serveAssets(res, curURL, function(data) {
            //         res.writeHead(302, httpHelpers.headers);
            //         res.end(data);
            //       });
            //     } else {
            //       //keep checking
            //       console.log('working on it');
            //     }
            //   });
            // });
          });
        }
      });
      //if true, serve asset
      //if false, serve loading
        //is url in the list
          //if false, add url to list
        //check is url archived
          //if true, serve asset
          //if false, keep waiting

      // res.end();
    });
  }
  //Commented out this line because it was throwing off the get render
  //res.end(archive.paths.list);
};