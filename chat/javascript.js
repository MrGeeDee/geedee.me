var user = cookie.get('user');
if (!user) {
  user = prompt('Choose a username:');
  if (!user) {
    alert('Please enter a username.');
  } else {
    cookie.set('user', user);
  }
}

var socket = io();

// Usercount
socket.on('count', function (data) {
  $('.user-count').html(data);
});

// Message Received
socket.on('message', function (data) {
  $('.chat').append('<p><strong>' + data.user + '</strong>: ' + data.message + '</p>');
});

// Message Sent
$('form').submit(function (e) {
  e.preventDefault();

  // Get Message
  var message = $(e.target).find('input').val();

  // Send message to server
  socket.emit('message', {
    user: cookie.get('user') || 'Anonymous',
    message: message
  });

  // Clear textbox
  e.target.reset();
  $(e.target).find('input').focus();
});
