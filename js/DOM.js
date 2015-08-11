playlistArray = [];
playlistArrayPosition = 0;

$(document).ready (function(){


  //grab the add-playlist button
  $('#add-playlist').on('click', function(event){

    event.preventDefault();

    var playlist = new Playlist(
      $('#playlist-creator').val(),
      $('#playlist-name').val(),
      $('#playlist-picture').val(),
      $('#playlist-mood').val(),
      $('#playlist-description').val()
      );

    playlistArray.push(playlist);

    playlist.appendTitle($('.show-playlist-temp'));

    $('.create-song').css('display', 'inline');
    $('.create-playlist').css('display', 'none');

  });


  $('#submit-song').on('click', function(event){

    event.preventDefault();

    var song = new Song(
      $('#song-artist').val(),
      $('#song-title').val(),
      $('#song-genre').val(),
      $('#song-link').val()
      );

    playlistArray[0].songs.push(song);
    console.log(playlistArray[0].songs);
    song.appendBasic($('.show-playlist-temp'));

      $('#song-artist').val('');
      $('#song-title').val('');
      $('#song-genre').val('');
      $('#song-link').val('');

  });



});
