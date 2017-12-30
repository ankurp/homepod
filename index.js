const AirTunesServer = require('nodetunes');
const Speaker = require('speaker');
const Volume = require('pcm-volume');
const speaker = new Speaker({
  channels: 2,
  bitDepth: 16,
  sampleRate: 44100,
});
const volume = new Volume();
volume.pipe(speaker);
const server = new AirTunesServer({ serverName: 'Homepod' });
server.on('clientConnected', function(stream) {
  stream.pipe(volume);
});
server.on('volumeChange', function(e) {
  if(e == -144) { // muted
    volume.setVolume(0);
  } else { // set volume
    var newVolume = (e - -30) * (1 - 0) / (0 - -30) + 0;
    volume.setVolume(newVolume);
  }
});
server.start();
