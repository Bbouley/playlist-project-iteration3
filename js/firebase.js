//loop through array and assign each value to firebase

for (var i = 0; i < playlistArray.length; i++) {
  firebasePlaylist.push(playlistArray[i]);
}

for (var i = 0; i < songArray.length; i++) {
  firebaseSongs.push(songArray[i]);
}
