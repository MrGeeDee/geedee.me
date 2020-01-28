var user = cookie.get('user');
if (!user) {
  user = prompt('Choose a username:');
  if (!user) {
    alert('You have to enter a username!');
  } else {
    cookie.set('user', user);
  }
}
