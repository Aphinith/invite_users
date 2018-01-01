var assert = require('assert');
var fs = require('fs');
var path = require('path');

describe('File Type', function() {
  describe('txt files', function() {
    it('should accept text files', function(){
      var filePath = path.join(__dirname, '/../customers.txt');
      var ext = path.extname(filePath);
      assert.equal(ext, '.txt');
    })
  })
})

describe('File Data', function() {
  var filePath = path.join(__dirname, '/../customers.txt');

  describe('JSON format', function() {
    it('should contain data in JSON format', function(done) {
      fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
          return console.log('error: ', err);
        }
        var data = data.split('\n');
        var testData = data[0];
        function isJsonString(str) {
          if (/^[\],:{}\s]*$/.test(str.replace(/\\["\\\/bfnrtu]/g, '@')
            .replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']')
            .replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
            return true;
          } else {
            return false;
          }
        }
        assert.equal(isJsonString(testData), true);
        done();
      })
    })
  })

  describe('Name and User Id', function() {
    it('should contain a name and user id', function(done) {
      fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
          return console.log('error: ', err);
        }
        var data = data.split('\n');
        var testData = JSON.parse(data[0]);
        var hasNameAndId = checkData(testData);

        function checkData (data) {
          if ('name' in data && 'user_id' in data) {
            return true;
          } else {
            return false;
          }
        }
        assert.equal(hasNameAndId, true);
        done();
      })
    }) 
  })

  describe('Latitude and Longitude Coordinates', function() {
    it('should contain lattitude and longitude coordinates', function(done) {
      fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
          return console.log('error: ', err);
        }
        var data = data.split('\n');
        var testData = JSON.parse(data[0]);
        var hasLatAndLonCoord = checkData(testData);

        function checkData (data) {
          if ('latitude' in data && 'longitude' in data) {
            return true;
          } else {
            return false;
          }
        }
        assert.equal(hasLatAndLonCoord, true);
        done();
      })
    }) 
  })
})

// describe('File Type', function() {
//   describe('txt files', function() {
//     it('should accept text files', function(){
//       var filePath = path.join(__dirname, '/../customers.txt');
//       var ext = path.extname(filePath);
//       assert.equal(ext, '.txt');
//     })
//   })
// })

describe('Invited Users', function() {
  var filePath = path.join(__dirname, '/../customers.txt');
  describe('User Id', function() {
    it('should be sorted in accending order when rendered', function(done) {
      fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
          return console.log('error: ', err);
        }
        var data = data.split('\n');
        var allUserIds = [];
        for (var i = 0; i < data.length; i++) {
          var user = JSON.parse(data[i]);
          allUserIds.push(user.user_id);
        }
        var sortedUsers = allUserIds.sort(function(a, b) { return a - b })

        function isSorted (users) {
          for (var i = 0; i < users.length - 1; i++) {
            if (users[i] > users[i + 1]) {
              return false;
            }
          }
          return true;
        }
        assert.equal(isSorted(sortedUsers), true);
        done();
      })
    })
  })
})