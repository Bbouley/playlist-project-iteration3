
var Playlist = function(creator, title, picture, mood, description){
  this.creator = creator;
  this.title = title;
  this.picture = picture || null;
  this.mood = mood;
  this.description = description;
  this.songs = [];
};

Playlist.prototype.addSong= function(song){
  this.songs.push(song);
};

Playlist.prototype.appendTemp = function(DOMelement){
  DOMelement.append('<div class = \'col-xs-4 temp-show\'>' +
                      '<h2>' + this.title + '</h2>' + '</div>');
};

Playlist.prototype.appendTitle = function(DOMelement, array, index){
  DOMelement.append('<div class = \'playlist notClicked col-xs-4\'>' +
                    '<h2>' + array[index].title +
                    '</h2>' + '<p>' + array[index].mood +
                    '</p>' + '</div>');
                    };

Playlist.prototype.appendDescriptionText = function(DOMelement, array, index){
  DOMelement.text(array[index].description);
};

Playlist.prototype.reAppendTitle = function(DOMelement, array, index){
  DOMelement.html('<h2>' + array[index].title +
                    '</h2>' + '<p>' + array[index].mood +
                    '</p>');
};

