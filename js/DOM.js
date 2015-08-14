playlistArray = [];
playlistArrayPosition = 0;
songArray = [];
songArrayPosition = 0;

function changeColour(){
  for (var i = 0; i <= songArray.length; i++) {
      var colors = ['#A6FFC6', '#FAAEFF', '#FFB6FF', '#FFB6FF', '#E1FFC0', '#84B7F6'];
      var rand = Math.floor(Math.random()*colors.length);
      $('.song:eq('+i+')').css('background-color', colors[rand]);
    }
}


$(document).ready (function(){

  $(document).on('click', function(){
      // changeColour();
  });

  setInterval(function(){
    changeColour();
  },1000);


  //grab the add-playlist button
  $('#add-playlist').on('click', function(event){

    event.preventDefault();
    //creates a new playlist object using inputs from the form
    var playlist = new Playlist(
      $('#playlist-creator').val(),
      $('#playlist-name').val(),
      $('#playlist-picture').val(),
      $('#playlist-mood').val(),
      $('#playlist-description').val()
      );
    //pushes the playlist to an array set at top of file
    playlistArray.push(playlist);
    //adds playlist title to temporary show area underneath forms
    playlist.appendTemp($('.show-playlist-temp'));
    //adds playlist title and mood of playlist to a playlist box and appends this to DOM
    playlist.appendTitle($('#show-playlists'), playlistArray, playlistArrayPosition);

      //resets form values
      $('#playlist-creator').val('');
      $('#playlist-name').val('');
      $('#playlist-picture').val('');
      $('#playlist-mood').val('');
      $('#playlist-description').val('');

    //changes which form view is shown
    $('.create-song').css('display', 'inline');
    $('.create-playlist').css('display', 'none');

  });


  $('#submit-song').on('click', function(event){

    event.preventDefault();

    //creates a new song instance using form values
    var song = new Song(
      $('#song-artist').val(),
      $('#song-title').val(),
      $('#song-genre').val(),
      $('#song-link').val()
      );

    //pushes song to playlist.songs at playlistArrayPosition(starts at 0)
    playlistArray[playlistArrayPosition].songs.push(song);
    //appends song to temporary show area
    song.appendToTemp($('.show-playlist-temp'));
    //adds song to list of all songs at bottom of page
    song.appendToSongList($('#song-list'), songArrayPosition);
    //pushes song to song array
    songArray.push(song);
    //add counter for songs
    songArrayPosition += 1;
      //resets song form input values on click
      $('#song-artist').val('');
      $('#song-title').val('');
      $('#song-genre').val('');
      $('#song-link').val('');

    });


  $(document).on('mouseenter', '.playlist', function(event){
    event.stopPropagation();
    event.preventDefault();

    //takes the index of the playlist box being moused over
    var playlistIndex = ($('.playlist').index($(this)));
    //changes the playlist box html to show description
    playlistArray[playlistIndex].appendDescriptionText($(this), playlistArray, playlistIndex);

  });

  $(document).on('mouseleave', '.playlist', function(event){
    event.stopPropagation();
    event.preventDefault();
    //same variable as above, finds index of which playlist is being moused over
    var playlistIndex = ($('.playlist').index($(this)));
    //reappends title and mood to the text of the box
    playlistArray[playlistIndex].reAppendTitle($(this), playlistArray, playlistIndex);

  });

  //clicking on a playlist displays the songs in that playlist.songs array
  //songs are displayed on the line underneath the playlist or after the playlist, so box size will have to have the same height as the playlist box
  //box colour should be different
  //test using same song elements as used for songs at bottom of page
  //find index of song being clicked
  //this gives the index at which we want to display all songs in playlist.songs
  //use after() jquery to append 1 song element after that
  $(document).on('click', '.playlist' ,function(event){

    // changeColour();

    event.stopPropagation();
    event.preventDefault();

    var playlistIndex = ($('.playlist').index($(this)));

    var playlistSongArray = playlistArray[playlistIndex].songs;

    if($(this).hasClass('notClicked')){

      for (var i = 0; i < playlistSongArray.length; i++) {

        playlistSongArray[i].showAfterPlaylist(($('.playlist:eq(' +playlistIndex + ')')), playlistIndex);

        $(this).removeClass('notClicked').addClass('clicked');

        }

        $(this).after('<div class = \'delete delete' +playlistIndex+ ' col-xs-2\'><h2>DELETE<br>THIS<br>PLAYLIST</h2><div>');

      } else {

        for (var j = 0; j < playlistSongArray.length; j++) {

          ($('.showAfter' + playlistIndex)).remove();

          }

          $('.delete').remove();

          $(this).addClass('notClicked');

        }

    });


  $(document).on('click', '.delete', function(event){

    // changeColour();

    var previous = ($(this).prev());

    var previousIndex = ($('.playlist').index(previous));

    var tempSongArray = playlistArray[previousIndex].songs;

    if(confirm('Are you sure you want to delete this playlist?')){

    for (var i = 0; i < tempSongArray.length; i++) {
      for (var j = 0; j < songArray.length; j++) {
        if(songArray[j] === tempSongArray[i]){
          songArray.splice(j, 1);
        }
      }
    }

    playlistArray.splice(previousIndex, 1);

    $('.showAfter' + previousIndex).remove();

    previous.remove();

    $(this).remove();

     playlistArrayPosition -=1;

      $('#song-list').html('');

      for (var k = 0; k < songArray.length; k++) {
        songArray[k].appendToSongList($('#song-list'));
      }
    }

   });



  $('#submit-playlist').on('click', function(event){

    event.preventDefault();
    //clears temporary playlist view box
    $('.show-playlist-temp').html('');
    //hides the song form and shows the playlist form
    $('.create-song').css('display', 'none');
    $('.create-playlist').css('display', 'inline');
    //adds one to playlistArrayPosition
    playlistArrayPosition += 1;

  });



});
