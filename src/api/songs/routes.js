const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.postSongHandler,
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.getSongsHandler,
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: handler.getByIdSongHandler,
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: handler.putSongHandler,
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: handler.deleteSongHandler,
  }
];

module.exports = routes;