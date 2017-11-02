var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelpers = require('./http-helpers');
var fs = require('fs');
var url = require('url');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  //check url to determine type of get
  var currentPath = req.url;
  var pathname = currentPath[url.pathname];
  
  if (req.method === 'GET') {
    var statusCode = 200;
    if (currentPath === '/') {
      fs.readFile(archive.paths.siteAssets + '/index.html', 'utf-8', (err, data) => {
        if (err) { throw err; }
        res.writeHead(statusCode, httpHelpers.headers);
        res.write(data);
        res.end();
      });
    } else if (currentPath !== '/') {
      statusCode = 404;
      res.writeHead(statusCode, httpHelpers.headers);
    } //else {
      //isUrlArchived(pathname, );
      
    //}
  } 
  //Commented out this line because it was throwing off the get render
  //res.end(archive.paths.list);
};
