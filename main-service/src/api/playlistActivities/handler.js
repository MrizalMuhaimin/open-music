class PlaylistActivitiesHandler {

  constructor(service,playlistService, validator) {
    this._service = service;
    this._playlistService = playlistService;
    this._validator = validator;

    this.getActivitiesPlaylistIdHandler = this.getActivitiesPlaylistIdHandler.bind(this);
  }

  async getActivitiesPlaylistIdHandler(request) {
    const { id } = request.params;
    const { id: userId } = request.auth.credentials;
    await this._playlistService.getPlaylistById(id);
    await this._playlistService.verifyPlaylistAccess(id, userId)
    const activities = await this._service.getPlaylistActivities(id);

    return {
      status: 'success',
      data: {
        playlistId: id,
        activities
      },
    };
  }
  
}
  
module.exports = PlaylistActivitiesHandler;