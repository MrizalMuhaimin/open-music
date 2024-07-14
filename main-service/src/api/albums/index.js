const AlbumsHandler = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'albums',
  version: '1.0.0',
  register: async (server, { service, likeAlbumsService, validator, cacheService }) => {
    const albumsHandler = new AlbumsHandler(service, likeAlbumsService, validator,cacheService);
    server.route(routes(albumsHandler));
  },
};