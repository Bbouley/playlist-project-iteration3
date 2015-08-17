
function Song(artist, title, genre, link){
  this.artist = artist;
  this.title = title;
  this.genre = genre;
  this.link = link || 'https://www.youtube.com/watch?v=U_xoICJChu8';
}

Song.prototype.appendToTemp = function(DOMelement){
  DOMelement.append('<div class = \'col-xs-2 temp-show\'>' +
                    '<p><em>Artist : </em><br>' +
                    this.artist +
                    '<br><em>Song Title :</em><br> ' +
                    this.title + '<p></div>');
};

Song.prototype.appendToSongList = function(DOMelement){
  DOMelement.append('<div class = \'song songList col-xs-2\'>' +
                    '<p><em>Artist :</em><br>' +
                    this.artist +
                    '<br><em>Song Title :</em><br> ' +
                    this.title +
                    '<br><em>Genre :</em><br>' +
                    this.genre +
                    '<br><em>Link :</em><br>' +
                    '<div class = \'col-xs-12 songLink\'>LISTEN NOW' +
                    '</div>'+
                    '<div class = \'remove-song col-xs-12\'>DELETE SONG</div></div>');
};

Song.prototype.showAfterPlaylist = function(DOMelement, playlistIndex){
  DOMelement.after('<div class = \'song showAfter' + playlistIndex +
                    ' col-xs-2\'>' +
                    '<p><em>Artist :</em><br>' +
                    this.artist +
                    '<br><em>Song Title :</em><br> ' +
                    this.title +
                    '<br><em>Genre :</em><br>' +
                    this.genre +
                    '<div class = \'col-xs-12 songLinkShowAfter\'>LISTEN NOW' +
                    '</div>'+
                    '<div class = \'remove-songShowAfter col-xs-12\'>DELETE SONG</div></div>');
};
