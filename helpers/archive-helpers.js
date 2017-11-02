var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  var content;
  fs.readFile(this.paths.list, 'utf-8', (err, data) => {
    if (err) { throw err; }
    content = data;
    content = content.split('\n');
    callback(content);
  });
  
};

exports.isUrlInList = function(url, callback) {
  var content;
  fs.readFile(this.paths.list, 'utf-8', (err, data) => {
    if (err) {
      throw err;
    }
    content = data.split('\n');
    for (var i = 0; i < content.length; i++) {
      if (content[i] === url) {
        callback(true);
        return;
      }
    }
    callback(false);
  });  
};

exports.addUrlToList = function(url, callback) {
  fs.writeFile(this.paths.list, url, 'utf-8', () => {
    callback();  
  });
};

exports.isUrlArchived = function(url, callback) {
  //check fs if url is archived
  var content;
  fs.readFile(this.paths.archivedSites + '/' + url, 'utf-8', (err, data) => {
    if (err) { 
      callback(false); 
      return; 
    }
 
    callback(true);
  
  });
};

exports.downloadUrls = function(urls) {
  //get url and go to the internet and fetch the asset
  //add the asset to the archive
};
