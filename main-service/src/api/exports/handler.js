class ExportsHandler {
  constructor(service, playlistService, validator) {
    this._service = service;
    this._playlistService = playlistService;
    this._validator = validator;
    this.postExportPlaylistHandler = this.postExportPlaylistHandler.bind(this);
  }
 
  async postExportPlaylistHandler(request, h) {
    const { playlistId } = request.params;
    this._validator.validateExportPlaylistPayload(request.payload);
    const {id: userId} = request.auth.credentials;
    const { targetEmail } = request.payload;


    await this._playlistService.verifyPlaylistOwner(playlistId, userId);
 
    const message = {
      userId,
      targetEmail: targetEmail,
      playlistId,
    };

    await this._service.sendMessage('export:playlist', JSON.stringify(message));
 
    const response = h.response({
      status: 'success',
      message: 'Permintaan Anda dalam antrean',
    });
    response.code(201);
    return response;
  }
}


module.exports = ExportsHandler;