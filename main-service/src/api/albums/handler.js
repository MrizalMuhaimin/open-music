class AlbumsHandler {

  constructor(service, likeAlbumsService, validator, cacheService) {
    this._service = service;
    this._likeAlbumsService = likeAlbumsService;
    this._validator = validator;
    this._cacheService = cacheService;


    this.getAlbumsHandler = this.getAlbumsHandler.bind(this);
    this.postAlbumsHandler = this.postAlbumsHandler.bind(this);
    this.getByIdAlbumsHandler = this.getByIdAlbumsHandler.bind(this);
    this.putAlbumsHandler = this.putAlbumsHandler.bind(this);
    this.deleteAlbumsHandler = this.deleteAlbumsHandler.bind(this);
    this.postLikeAlbumsHandler = this.postLikeAlbumsHandler.bind(this);
    this.getLikeAlbumsHandler = this.getLikeAlbumsHandler.bind(this);
    this.deleteLikeAlbumsHandler = this.deleteLikeAlbumsHandler.bind(this);
  }

  async postAlbumsHandler(request, h) {
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

  async postLikeAlbumsHandler(request, h) {
    const { id } = request.params;
    const { id: userId } = request.auth.credentials;
    await this._likeAlbumsService.addLikeAlbums(id,userId);

    const response = h.response({
      status: 'success',
      message: 'Album berhasil ditambahkan',
      data: {
        albumId: id,
      },
    });

    await this._cacheService.delete(`likes:${id}`);

    response.code(201);
    return response;
  }

  async getLikeAlbumsHandler(request, h) {
    const { id } = request.params;

    try {
      // mendapatkan dari cache
      const count = await this._cacheService.get(`likes:${id}`);
      const response = h.response({
        status: 'success',
        data: {
          likes: parseInt(count),
        },
      });
      response.header('X-Data-Source', 'cache')
      response.code(200);
      return response;

    } catch {
      const count = await this._likeAlbumsService.countLikeAlbums(id);
      await this._cacheService.set(`likes:${id}`, count);
      return {
        status: 'success',
        data: {
          likes: parseInt(count),
        },
      };

    }
    
  }

  async deleteLikeAlbumsHandler(request) {
    const { id } = request.params;
    const { id: userId } = request.auth.credentials;
    await this._likeAlbumsService.deleteLikeAlbums(id,userId);
    await this._cacheService.delete(`likes:${id}`);
    return {
      status: 'success',
      message: 'Batal menyukai Albums',
    };    
  }

}

module.exports = AlbumsHandler;