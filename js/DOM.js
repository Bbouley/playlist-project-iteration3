playlistArray = [];
playlistArrayPosition = 0;
songArray = [];
playlist = {};
firebaseArray = [];

var myFirebaseRef = new Firebase("https://g11playlist.firebaseio.com/");

//function that will randomly change colour of any song box with class .song
function changeColour(){
  for (var i = 0; i <= songArray.length; i++) {
      var colors = ['#A6FFC6', '#FAAEFF', '#FFB6FF', '#FFB6FF', '#E1FFC0', '#84B7F6'];
      var rand = Math.floor(Math.random()*colors.length);
      $('.song:eq('+i+')').css('background-color', colors[rand]);
    }
}

//takes an array(firebaseArray) and turns each object in that array back into an instance of playlist and then pushes each playlist instance back into playlistArray at top of page
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

//goes through array (firebaseArray) and turns each song object from firebase back into an instance of song and then pushes each song back into songArray
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
     //goes through playlist array and adds each playlist title back onto display playlist section
     for (var i = 0; i < playlistArray.length; i++) {
        playlistArray[i].appendTitle($('#show-playlists'), playlistArray, i);
     }
     //adds each song in songArray back to song list, appends them to that section of the DOM
     for (var k = 0; k < songArray.length; k++) {
          songArray[k].appendToSongList($('#song-list'));
        }
    }

$(document).ready (function(){


   myFirebaseRef.once('value', function(snapshot){
    //only hits firebase once, all playlists are given in function below
    var playlists = snapshot.val();
    //the way it's stored in firebase means that each instance of playlist is stored in firebase as a seperate child with an individual ID, so we need the child of each node to get each playlsit
    snapshot.forEach(function(childSnapshot){
      //this logs the data at each individual node
      var childData = childSnapshot.val();
      //this pushes that data the firebase array, data is given back just as objects, it is no longer instances of playlist class or ssong class
      firebaseArray.push(childData);
    });
    //runs functions described above
    populatePlaylistArray(firebaseArray);
    populateSongArray(firebaseArray);
    populatePage();
    //sets playlistArrayPosistion to length so functions can be used below
    playlistArrayPosition = playlistArray.length;
    //wipes firebase storage
    myFirebaseRef.set(null);
  });

   //login for soundcloud API
  SC.initialize({
    client_id: '3a76cf73e430887c16e9897fcf630bcc'
    });

  //takes a track and embeds it into soundcloud widget player, with a height to fit div in navbar and not set to auto_play so track does not start playing straight away.
  var track_url = 'https://soundcloud.com/calyxteebee/sawn-off';
    SC.oEmbed(track_url, { auto_play: false, maxheight: 100 }, document.getElementById('player'));


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


  //on clicking anything with playlist class
  $(document).on('click', '.playlist' ,function(event){

    event.stopPropagation();
    event.preventDefault();
    //finds the index of playlist in playlist array, by finding the index of where the div is appended. These indices should be the same as all playlists are appended to the DOM
    var playlistIndex = ($('.playlist').index($(this)));
    //this gets the individual group of songs that are in that particular playlist
    var playlistSongArray = playlistArray[playlistIndex].songs;
    //this makes sure only the div clicked activates on click event, any div nested inside playlist does not set off the onclick event for playlist
    if(event.target === this){
    //playlists are appended with class 'notClicked'
    if($(this).hasClass('notClicked')){
      //runs through song array of this playlist
      for (var i = playlistSongArray.length-1; i >= 0; i--) {
        //appends each song to DOM after playlist with a class that has this playlist num in it
        playlistSongArray[i].showAfterPlaylist(($('.playlist:eq(' + playlistIndex + ')')), playlistIndex);

        }

        $(this).removeClass('notClicked').addClass('clicked');
        //appends a delete div after the playlist
        $(this).after('<div class = \'delete delete' +playlistIndex+ ' col-xs-2\'><h2>DELETE<br>THIS<br>PLAYLIST</h2><div>');

      } else {

        for (var j = 0; j < playlistSongArray.length; j++) {
          //removes all songs with that playlistIndex class, which were given in event above
          ($('.showAfter' + playlistIndex)).remove();

          }
          //removes delete div
          $('.delete'+playlistIndex).remove();

          $(this).addClass('notClicked').removeClass('clicked');

        }
      }

    });


  $(document).on('click', '.delete', function(event){
    //runs changeColour function
    changeColour();
    //get's previous sibling, which will always be a playlist
    var previous = ($(this).prev());
    //gets that playlist index
    var previousIndex = ($('.playlist').index(previous));
    //get's all songs of that playlist comparing div array to actual playlist array
    var tempSongArray = playlistArray[previousIndex].songs;

    if(confirm('Are you sure you want to delete this playlist?')){
      //goes through this playlists song array and checks to see if that song is in the main songArray, if it is, it deletes that song from the song list
    for (var i = 0; i < tempSongArray.length; i++) {
      for (var j = 0; j < songArray.length; j++) {
        if(songArray[j] === tempSongArray[i]){
          //removing song from songArray
          songArray.splice(j, 1);
        }
      }
    }
    //splices out the playlist from playlistArray
    playlistArray.splice(previousIndex, 1);
    //if any of the songs are being shown after the playlist, it takes them off of the page
    $('.showAfter' + previousIndex).remove();
    //removes the playlist div
    previous.remove();
    //removes the delete div
    $(this).remove();
    //puts playlistArray back to new position as there is one less playlist
     playlistArrayPosition = playlistArray.length;
     //wipes song list html
      $('#song-list').html('');
      //reAppends each song to song list, leaving out any of the songs that were in the deleted playlist as these have been removed from songArray now
      for (var k = 0; k < songArray.length; k++) {
        songArray[k].appendToSongList($('#song-list'));
      }
    }

   });

  //songLink is the listen button on bottom of song Divs
  $(document).on('click', '.songLink', function(event){
    //finds the index in songArray by comparing the div index with what the index in songArray will be
    var songArrayIndex = ($('#song-list').children().index($(this).parent()));
    //get's the link of the soundcloud url given to that song
    var track_url = songArray[songArrayIndex].link;
    //embeds that song in the widget
    SC.oEmbed(track_url, { auto_play: true, maxheight: 100}, document.getElementById('player'));

  });



  $('#submit-playlist').on('click', function(event){
    //on form when you click submit playlist, appends title to show playlist section of page
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

 //.remove-song is delete div at bottom of each song in song-list
  $(document).on('click', '.remove-song', function(event){

    event.preventDefault();
    //finds index in songArray of this song bu finding index in songlist of this div's parents, which will be an individual song box
    var songArrayIndex = ($('.songList').index($(this).parent()));
    //song to delete is thisSong, it's the song in songArray at given index, found above
    var thisSong = songArray[songArrayIndex];
    //loops through playlist array
    for (var i = 0; i < playlistArray.length; i++) {
      //for each playlist array loops through songs
      for (var j = 0; j <= playlistArray[i].songs.length; j++) {
        //if song in playlist array = variable in song listed above, then it splices that song out of that playlistArray
        if (playlistArray[i].songs[j] === thisSong){
          playlistArray[i].songs.splice(j, 1);
          //logs the songs in that playlist array without deleted songs
          var newSongsArray = playlistArray[i].songs;
          //checks to see if that playlist has class clicked and is therefore showing songs after it
          if ($('.playlist:eq(' + i + ')').hasClass('clicked')){
            //if it does, it wipes everything showing after that playlist
           $('.showAfter'+i).remove();
           $('.delete'+i).remove();
           //and then reappends those songs minus the deleted song and adds a delete div after it again
            for (var m = newSongsArray.length-1; m >= 0; m--) {
              newSongsArray[m].showAfterPlaylist(($('.playlist:eq(' + i + ')')), i);
            }
            ($('.playlist:eq(' + i + ')').after('<div class = \'delete delete' +i+ ' col-xs-2\'><h2>DELETE<br>THIS<br>PLAYLIST</h2><div>'));
        }
      }
     }
    }
      //splices that song out of the songArray
      songArray.splice(songArrayIndex, 1);
      //wipes the song list html
      $('#song-list').html('');
      //reappends all songs in the song list
      for (var k = 0; k < songArray.length; k++) {
        songArray[k].appendToSongList($('#song-list'));
      }
  });


  $(document).on('click', '.remove-songShowAfter', function(){

      event.preventDefault();
      // loops through playlist numbers to find which showafter class it has
      for (var i = 0; i < playlistArray.length; i++) {
        if ($(this).attr('class', '.showAfter'+i)){
          var thisIndex = (($('.showAfter'+i)).index($(this).parent()));

            playlistArray[i].songs.splice(thisIndex, 1);

            songArray.splice(thisIndex, 1);

            $('#song-list').html('');

             for (var k = 0; k < songArray.length; k++) {
                songArray[k].appendToSongList($('#song-list'));
              }

            $(this).parent().remove();

        }
      }

    });

  $(document).on('click', '.songLinkShowAfter', function(){

    event.preventDefault();
    event.stopPropagation();

    for (var i = 0; i < playlistArray.length; i++) {

        if ($(this).attr('class', '.showAfter'+i)){

          var thisIndex = (($('.showAfter'+i)).index($(this).parent()));

          var track_url = songArray[thisIndex].link;
          //embeds that song in the widget
          SC.oEmbed(track_url, { auto_play: true, maxheight: 100}, document.getElementById('player'));
        }
      }
  });


});

//when window is closed, it for each playlist instance in array, it pushes the playlist to firebase, so it creates a new random child node of g11-playlist and saves playlist in there
 $(window).unload(function(){

      $.each(playlistArray, function(i, object){
          myFirebaseRef.push(object);
        });
  });


