//loop through array and assign each value to firebase

for (var i = 0; i < playlistArray.length; i++) {
  firebasePlaylist.push(playlistArray[i]);
}

for (var i = 0; i < songArray.length; i++) {
  firebaseSongs.push(songArray[i]);
}

function populatePlaylistArray(array){
for (var i = 0; i < array.length; i++) {
  var playlist = new Playlist(
    array[i].creator,
    array[i].title,
    array[i].picture,
    array[i].mood,
    array[i].description
    );
  playlist.songs = array[i].songs;
  playlistArray.push(playlist);
  }
}

function populateSongArray(array){
  for (var i = 0; i < array.length; i++) {
    var firebaseSongs = array[i].songs;
      for (var j = 0; j < firebaseSongs.length; j++) {
        var song = new Song(
          firebaseSongs[j].artist,
          firebaseSongs[j].title,
          firebaseSongs[j].genre,
          firebaseSongs[j].link
          );
        firebaseSongs[i].push(song);
      }
  }
}
