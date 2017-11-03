var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.getAsset = function(assetPath) {
  var content;
  //From stack overflow
  fs.readFile(assetPath, function read(data) {
    content = data;      
  });
  console.log('Content: ', content);
  return content;
};
exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)

  //read a file using fs.readFile
  fs.readFile(archive.paths.archivedSites + '/' + asset, 'utf-8', (err, data) => {
    if (err) { 
      throw err; 
    }
    callback(data);
  });


    //if error, throw error
    //if success, take the data and put it in res' body
      //make sure response ends
};

exports.serveIndex = function (res, url, callback) {
  var needCSS = url.slice(-4) === 'html';
  console.log('inside si');
  fs.readFile(archive.paths.siteAssets + '/' + url, 'utf-8', (err, data) => {
    console.log('url',url);
    if (err) { 
      console.log('error from serveindex', err);
      throw err; 
    }
    
    if (needCSS) {
      fs.readFile(archive.paths.siteAssets + '/styles.css'), 'utf-8', (err, data) => {
        if (err) { 
          console.log('error from styles read file', err);
          throw err; 
        }
        callback('<script>' + data + '</script>');
      };
    } 

    callback(data);
  });
};



// As you progress, keep thinking about what helper functions you can put here!
