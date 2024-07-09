class SongsHandler {

  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  
    this.postSongHandler = this.postSongHandler.bind(this);
    this.getSongsHandler = this.getSongsHandler.bind(this);
    this.getByIdSongHandler = this.getByIdSongHandler.bind(this);
    this.putSongHandler = this.putSongHandler.bind(this);
    this.deleteSongHandler = this.deleteSongHandler.bind(this);
  }
  
  async postSongHandler(request, h) {
    this._validator.validateAddSongPayload(request.payload);
    const { title = 'untitled', year, genre, performer, duration, albumId  } = request.payload;

    const songId = await this._service.addSong({ title, year, genre, performer, duration, albumId });

    const response = h.response({
      status: 'success',
      message: 'Song berhasil ditambahkan',
      data: {
        songId,
      },
    });
    response.code(201);
    return response;
  
  }
  
  async getSongsHandler(request) {
    const songs = await this._service.getSongs(request.query);
    return {
      status: 'success',
      data: {
        songs,
      },
    };
          
  }
  
  async getByIdSongHandler(request) {
    const { id } = request.params;
    const song = await this._service.getSongById(id);
    return {
      status: 'success',
      data: {
        song,
      },
    };
          
  }
  
  async putSongHandler(request) {
    this._validator.validateAddSongPayload(request.payload);
    const { id } = request.params;

    await this._service.editSongById(id, request.payload);

    return {
      status: 'success',
      message: 'Song berhasil diperbarui',
    };
          
  }
  
  async deleteSongHandler(request) {
    const { id } = request.params;
    await this._service.deleteSongById(id);

    return {
      status: 'success',
      message: 'Song berhasil dihapus',
    };      
          
  }
  
}
  
module.exports = SongsHandler;