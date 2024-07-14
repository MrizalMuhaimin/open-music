/* eslint-disable no-undef */
class UploadsHandler {
  constructor(service, albumsService, validator) {
    this._service = service;
    this._albumsService = albumsService;
    this._validator = validator;
 
    this.postCoverAlbumsHandler = this.postCoverAlbumsHandler.bind(this);
  }
 
  async postCoverAlbumsHandler(request, h) {
    const {cover} = request.payload;
    const { id } = request.params;
 
    const filename = await this._service.writeFile(cover, cover.hapi);

    await this._albumsService.postCoverAlbumById(id, filename);

    const response = h.response({
      status: 'success',
      message: 'Sampul berhasil diunggah',
      data: {
        fileLocation: `http://${process.env.HOST}:${process.env.PORT}/upload/images/${filename}`,
      },
    });
    response.code(201);
    return response;
  }
}
 
module.exports = UploadsHandler;