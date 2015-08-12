playlistArray = [];
playlistArrayPosition = 0;
songArray = []

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

    playlist.appendTemp($('.show-playlist-temp'));
    playlist.appendTitle($('#show-playlists'), playlistArray, playlistArrayPosition);

      $('#playlist-creator').val('');
      $('#playlist-name').val('');
      $('#playlist-picture').val('');
      $('#playlist-mood').val('');
      $('#playlist-description').val('');


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
    song.appendToTemp($('.show-playlist-temp'));
    song.appendToSongList($('#song-list'));

    songArray.push(song);


    for (var i = 0; i <= songArray.length; i++) {
      var colors = ['#A6FFC6', '#FAAEFF', '#FFB6FF', '#FFB6FF', '#E1FFC0', '#84B7F6'];
      var rand = Math.floor(Math.random()*colors.length);
      $('.song:eq('+i+')').css('background-color', colors[rand]);
    }

      $('#song-artist').val('');
      $('#song-title').val('');
      $('#song-genre').val('');
      $('#song-link').val('');



  });

  $('#finished').on('click', function(event){

    event.preventDefault();

    $('.show-playlist-temp').html('');
    $('.create-song').css('display', 'none');
    $('.create-playlist').css('display', 'inline');

    playlistArrayPosition += 1;

  });



});
