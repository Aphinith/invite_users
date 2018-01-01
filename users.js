$(document).ready(function() {

  function readFile(file) {
    var reader = new FileReader();
    reader.onload = function (evt) {
        var textContents = evt.target.result;
        parseData(textContents);
    };
    reader.readAsText(file);
  }

  var readFileBtn = $('#read-file');
  $(readFileBtn).click(function () {
      var inputFile = document.getElementById('input-file');
      readFile(inputFile.files[0]);
  });

  function parseData(textContents) {
    var data = textContents.split('\n');
    var allUsers = [];
    for (var i = 0; i < data.length; i++) {
      allUsers.push(JSON.parse(data[i]));
    }
    checkUsersDistance(allUsers);
  }

  function checkUsersDistance(allUsers) {
    var userIds = [];
    var invitedUsers = {};
    var dublinOffice = {'latitude': 53.3381985, 'longitude': -6.2592576};

    for (var i = 0; i < allUsers.length; i++) {
      var user = allUsers[i];
      var lat1 = dublinOffice.latitude;
      var lat2 = Number(user.latitude);
      var lon1 = dublinOffice.longitude;
      var lon2 = Number(user.longitude);

      distance = calculateDistance(lat1, lat2, lon1, lon2)
      
      if (distance <= 100) {
        userIds.push(user.user_id);
        invitedUsers[user.user_id] = user;
      }
    }

    renderInvitedUsers(userIds, invitedUsers);

  }

  function renderInvitedUsers(userIds, invitedUsers) {

    var userIds = userIds.sort(function(a, b) { return a - b });

    for (var i = 0; i < userIds.length; i++) {
      var id = userIds[i];
      var username = invitedUsers[id].name;
      var li = $('<li>User ID: '+ id + ' | Username: ' + username +'</li>');
      $('.invited-users-list').append(li);
    }
    $('.invited-users').show();
  }

  function calculateDistance(lat1, lat2, lon1, lon2) {
    var lat1InRadians = degreesToRadians(lat1);
    var lat2InRadians = degreesToRadians(lat2);
    var lon1InRadians = degreesToRadians(lon1);
    var lon2InRadians = degreesToRadians(lon2);
    var lonDiff = lon2InRadians - lon1InRadians;
    var a = Math.acos(Math.sin(lat1InRadians) * Math.sin(lat2InRadians) + Math.cos(lat1InRadians) * Math.cos(lat2InRadians) * Math.cos(lonDiff));
    var r = 6371; // km
    var distance = r * a;
    return distance;
  }

  function degreesToRadians(degree) {
    var pi = Math.PI;
    return degree * (pi/180);
  }

})