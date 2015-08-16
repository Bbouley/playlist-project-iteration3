window.onload = function(){

  SC.initialize({
    client_id: '3a76cf73e430887c16e9897fcf630bcc'
  });

  var track_url = 'https://soundcloud.com/calyxteebee/sawn-off';
    SC.oEmbed(track_url, { auto_play: false, maxheight: 100 }, document.getElementById('player'));


};
