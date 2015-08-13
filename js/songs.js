
function Song(artist, title, genre, link){
  this.artist = artist;
  this.title = title;
  this.genre = genre;
  this.link = link || undefined;
}

Song.prototype.appendToTemp = function(DOMelement){
  DOMelement.append('<div class = \'col-xs-2 temp-show\'>' +
                    '<p><em>Artist : </em><br>' +
                    this.artist +
                    '<br><em>Song Title :</em><br> ' +
                    this.title + '<p></div>');
};

Song.prototype.appendToSongList = function(DOMelement){
  DOMelement.append('<div class = \'song col-xs-2\'>' +
                    '<p><em>Artist :</em><br>' +
                    this.artist +
                    '<br><em>Song Title :</em><br> ' +
                    this.title +
                    '<br><em>Genre :</em><br>' +
                    this.genre +
                    '<br><em>Link :</em><br>' +
                    '<a href=' + this.link +'>'+
                    'Listen Now</a><p></div>');
};

Song.prototype.showAfterPlaylist = function(DOMelement, number){
  DOMelement.after('<div class = \'song showAfter'+number+' col-xs-2\'>' +
                    '<p><em>Artist :</em><br>' +
                    this.artist +
                    '<br><em>Song Title :</em><br> ' +
                    this.title +
                    '<br><em>Genre :</em><br>' +
                    this.genre +
                    '<br><em>Link :</em><br>' +
                    '<a href=' + this.link +'>'+
                    'Listen Now</a><p></div>');
};
