const PlaylistSongsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlistSongs',
  version: '1.0.0',
  register: async (server, { playlistSongsService, playlistService, playlistActivitiesService, songsService, validator }) => {
    const playlistSongsHandler = new PlaylistSongsHandler(playlistSongsService, playlistService, playlistActivitiesService, songsService, validator);
    server.route(routes(playlistSongsHandler));
  },
};