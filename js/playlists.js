
var Playlist = function(creator, title, picture, mood, description){
  this.creator = creator;
  this.title = title;
  this.picture = picture || undefined;
  this.mood = mood;
  this.description = description;
  this.songs = [];
};

Playlist.prototype.addSong= function(song){
  this.songs.push(song);
};

Playlist.prototype.appendTitle = function(DOMelement){
  DOMelement.append('<div class = \'col-xs-4 temp-show\'>' +
                      '<h2>' + this.title + '</h2>' + '</div>');
};
