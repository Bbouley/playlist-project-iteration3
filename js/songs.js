
function Song(artist, title, genre, link){
  this.artist = artist;
  this.title = title;
  this.genre = genre;
  this.link = link || undefined;
}

Song.prototype.appendBasic = function(DOMelement){
  DOMelement.append('<div class = \'col-xs-2 temp-show\'><p><em>Artist : </em><br>' + this.artist + '<br><em>Song Title :</em><br> ' + this.title + '<p></div>');
};
