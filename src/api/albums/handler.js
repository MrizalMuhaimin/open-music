class AlbumsHandler {

  constructor(service, validator) {
    this._service = service;
    this._validator = validator;


    this.getAlbumsHandler = this.getAlbumsHandler.bind(this);
    this.postAlbumsHandler = this.postAlbumsHandler.bind(this);
    this.getByIdAlbumsHandler = this.getByIdAlbumsHandler.bind(this);
    this.putAlbumsHandler = this.putAlbumsHandler.bind(this);
    this.deleteAlbumsHandler = this.deleteAlbumsHandler.bind(this);
  }

  async postAlbumsHandler(request, h) {
    console.log('post')
    this._validator.validateAddAlbumsPayload(request.payload);
    const { name = 'untitled', year } = request.payload;

    const albumId = await this._service.addAlbum({ name, year });

    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {
        albumId,
      },
    });
    response.code(201);
    return response;

  }

  async getAlbumsHandler() {
    const albums = await this._service.getAlbums();
    return {
      status: 'success',
      data: {
        albums,
      },
    };
        
  }

  async getByIdAlbumsHandler(request) {
    const { id } = request.params;
    const album = await this._service.getAlbumsById(id);
    return {
      status: 'success',
      data: {
        album,
      },
    };
        
  }

  async putAlbumsHandler(request) {
    this._validator.validateAddAlbumsPayload(request.payload);
    const { id } = request.params;

    await this._service.editAlbumById(id, request.payload);

    return {
      status: 'success',
      message: 'Album berhasil diperbarui',
    };
        
  }

  async deleteAlbumsHandler(request) {
    const { id } = request.params;
    await this._service.deleteAlbumsById(id);

    return {
      status: 'success',
      message: 'Album berhasil dihapus',
    };      
  }

}

module.exports = AlbumsHandler;