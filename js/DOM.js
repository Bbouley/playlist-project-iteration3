playlistArray = [];
playlistArrayPosition = 0;
songArray = [];
playlist = {};
firebaseArray = [];
firebaseKeyArray = [];

var myFirebaseRef = new Firebase("https://g11playlist.firebaseio.com/");
var firebasePlaylists = myFirebaseRef.child('playlists');


function changeColour(){
  for (var i = 0; i <= songArray.length; i++) {
      var colors = ['#A6FFC6', '#FAAEFF', '#FFB6FF', '#FFB6FF', '#E1FFC0', '#84B7F6'];
      var rand = Math.floor(Math.random()*colors.length);
      $('.song:eq('+i+')').css('background-color', colors[rand]);
    }
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
  playlistArray.push(playlist);
  }
}

function populateSongArray(array){
  for (var i = 0; i < array.length; i++) {
    var songObjectArray = array[i].songs;
    var tempArray = [];
      for (var j = 0; j < songObjectArray.length; j++) {
        var song = new Song(
          songObjectArray[j].artist,
          songObjectArray[j].title,
          songObjectArray[j].genre,
          songObjectArray[j].link
          );
        tempArray.push(song);
        songArray.push(song);
      }
    playlistArray[i].songs = tempArray;
  }
}

 function populatePage(){
     for (var i = 0; i < playlistArray.length; i++) {
        playlistArray[i].appendTitle($('#show-playlists'), playlistArray, i);
     }

     for (var k = 0; k < songArray.length; k++) {
          songArray[k].appendToSongList($('#song-list'));
        }
    }

$(document).ready (function(){

   myFirebaseRef.once('value', function(snapshot){
    var playlists = snapshot.val();

    snapshot.forEach(function(childSnapshot){
      var childData = childSnapshot.val();
      console.log(childData);
      firebaseArray.push(childData);
    });
    console.log('ready');
    populatePlaylistArray(firebaseArray);
    populateSongArray(firebaseArray);
    populatePage();
    playlistArrayPosition = playlistArray.length;
    myFirebaseRef.set(null);
  });





  //grab the add-playlist button
  $('#add-playlist').on('click', function(event){

     changeColour();

    event.preventDefault();
    //creates a new playlist object using inputs from the form
      playlist = new Playlist(
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

     changeColour();

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
    song.appendToSongList($('#song-list'));
    //pushes song to song array
    songArray.push(song);
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


  $(document).on('click', '.playlist' ,function(event){

    changeColour();

    event.stopPropagation();
    event.preventDefault();

    var playlistIndex = ($('.playlist').index($(this)));

    var playlistSongArray = playlistArray[playlistIndex].songs;

    if($(this).hasClass('notClicked')){

      for (var i = playlistSongArray.length-1; i >= 0; i--) {

        playlistSongArray[i].showAfterPlaylist(($('.playlist:eq(' +playlistIndex + ')')), playlistIndex);

        }

        $(this).removeClass('notClicked').addClass('clicked');

        $(this).after('<div class = \'delete delete' +playlistIndex+ ' col-xs-2\'><h2>DELETE<br>THIS<br>PLAYLIST</h2><div>');

      } else {

        for (var j = 0; j < playlistSongArray.length; j++) {

          ($('.showAfter' + playlistIndex)).remove();

          }

          $('.delete'+playlistIndex).remove();

          $(this).addClass('notClicked').removeClass('clicked');

        }

    });


  $(document).on('click', '.delete', function(event){

    changeColour();

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

    playlist.appendTitle($('#show-playlists'), playlistArray, playlistArrayPosition);

    event.preventDefault();
    //clears temporary playlist view box
    $('.show-playlist-temp').html('');
    //hides the song form and shows the playlist form
    $('.create-song').css('display', 'none');
    $('.create-playlist').css('display', 'inline');
    //adds one to playlistArrayPosition
    playlistArrayPosition += 1;

  });

  $(document).on('click', '.remove-song', function(event){

    event.preventDefault();

    var songArrayIndex = ($('.songList').index($(this).parent()));

    var thisSong = songArray[songArrayIndex];

    for (var i = 0; i < playlistArray.length; i++) {

      for (var j = 0; j <= playlistArray[i].songs.length; j++) {

        if (playlistArray[i].songs[j] === thisSong){
          playlistArray[i].songs.splice(j, 1);

          var newSongsArray = playlistArray[i].songs;
          console.log(newSongsArray.length);

          if ($('.playlist:eq(' + i + ')').hasClass('clicked')){

           $('.showAfter'+i).remove();
           $('.delete'+i).remove();

            for (var m = newSongsArray.length-1; m >= 0; m--) {
              newSongsArray[m].showAfterPlaylist(($('.playlist:eq(' + i + ')')), i);
            }
            ($('.playlist:eq(' + i + ')').after('<div class = \'delete delete' +i+ ' col-xs-2\'><h2>DELETE<br>THIS<br>PLAYLIST</h2><div>'));
        }
      }

    }

    songArray.splice(songArrayIndex, 1);

    $('#song-list').html('');

      for (var k = 0; k < songArray.length; k++) {
        songArray[k].appendToSongList($('#song-list'));
      }
    }
  });

});

 $(window).unload(function(){

      $.each(playlistArray, function(i, object){
          myFirebaseRef.push(object);
        });
  });
