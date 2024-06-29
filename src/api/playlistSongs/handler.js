class PlaylistSongsHandler {

  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postSongByPlaylistIdHandler = this.postSongByPlaylistIdHandler.bind(this);
    this.getSongByPlaylistIdHandler = this.getSongByPlaylistIdHandler.bind(this);
    this.deleteSongByPlaylistIdHandler = this.deleteSongByPlaylistIdHandler.bind(this);
  }


  async postSongByPlaylistIdHandler(request, h) {
    this._validator.validateAddPlaylistSongsPayload(request.payload);
    const { songId } = request.payload;
    const { id } = request.params;

    const playlistSongId = this._service.addSongsAtPlaylist(id, songId);

    const response = h.response({
      status: 'success',
      message: 'Song berhasil ditambahkan ke playlist',
      data: {
        playlistSongId,
      },
    });
    response.code(201);
    return response;
  }

  async getSongByPlaylistIdHandler(request) {
    const { id } = request.params;

  }

  async deleteSongByPlaylistIdHandler(request) {

  }
  
}
  
module.exports = PlaylistSongsHandler;