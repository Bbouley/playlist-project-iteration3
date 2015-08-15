
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
                    '<a href=\'' + this.link +
                    '\' target=\'_blank\'>'+
                    'Listen Now</a><p><div class = \'remove-song col-xs-12\'>DELETE SONG</div></div>');
};

Song.prototype.showAfterPlaylist = function(DOMelement, playlistIndex){
  DOMelement.after('<div class = \'song showAfter' + playlistIndex + '                col-xs-2\'>' +
                    '<p><em>Artist :</em><br>' +
                    this.artist +
                    '<br><em>Song Title :</em><br> ' +
                    this.title +
                    '<br><em>Genre :</em><br>' +
                    this.genre +
                    '<br><em>Link :</em><br>' +
                    '<a href =\' ' + this.link +
                    '\' target=\'_blank\'>'+
                    'Listen Now</a><p></div>');
};
