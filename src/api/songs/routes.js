const routes = (handler) => [
  {
    method: 'POST',
    path: '/songs',
    handler: handler.postSongsHandler,
  },
  {
    method: 'GET',
    path: '/songs',
    handler: handler.getSongsHandler,
  },
  {
    method: 'GET',
    path: '/songs/{id}',
    handler: handler.getByIdSongsHandler,
  },
  {
    method: 'PUT',
    path: '/songs/{id}',
    handler: handler.putSongsHandler,
  },
  {
    method: 'DELETE',
    path: '/songs/{id}',
    handler: handler.deleteSongsHandler,
  }
];

module.exports = routes;