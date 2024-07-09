class PlaylistSongsHandler {

  constructor(playlistSongsService, playlistService, playlistActivitiesService, songsService, validator) {
    this._playlistSongsService = playlistSongsService;
    this._playlistService = playlistService;
    this._playlistActivitiesService = playlistActivitiesService;
    this._songsService = songsService;
    this._validator = validator;

    this.postSongByPlaylistIdHandler = this.postSongByPlaylistIdHandler.bind(this);
    this.getSongByPlaylistIdHandler = this.getSongByPlaylistIdHandler.bind(this);
    this.deleteSongByPlaylistIdHandler = this.deleteSongByPlaylistIdHandler.bind(this);
  }


  async postSongByPlaylistIdHandler(request, h) {
    this._validator.validateAddPlaylistSongsPayload(request.payload);
    const { id: userId, username } = request.auth.credentials;
    const { songId: song_id } = request.payload;
    const { id: playlist_id } = request.params;

    await this._playlistService.verifyPlaylistAccess(playlist_id, userId);
    await this._songsService.verifySongById(song_id);

    const playlistSongId = await this._playlistSongsService.addSongsAtPlaylist(playlist_id, song_id);
    const song = await this._songsService.getSongById(song_id)

    await this._playlistActivitiesService.addPlaylistActivities(playlist_id, username,song.title, 'add')

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
    const { id: userId } = request.auth.credentials;
    await this._playlistService.verifyPlaylistAccess(id, userId);
    const playlist = await this._playlistService.getPlaylistById(id);
    const songsAtPlaylist = await this._playlistSongsService.getSongsAtPlaylist(id);

    playlist['songs'] = songsAtPlaylist;

    return {
      status: 'success',
      data: {
        playlist,
      },
    };
  }

  async deleteSongByPlaylistIdHandler(request) {
    this._validator.validateDeletePlaylistSongsPayload(request.payload);
    const { id: playlist_id } = request.params;
    const { id: userId, username } = request.auth.credentials;
    const { songId: song_id } = request.payload;
    await this._playlistService.verifyPlaylistAccess(playlist_id, userId);
    const song = await this._songsService.getSongById(song_id)

   

    await this._playlistSongsService.deleteSongsAtPlaylist(playlist_id, song_id);
    await this._playlistActivitiesService.addPlaylistActivities(playlist_id, username,song.title, 'delete')
    return {
      status: 'success',
      message: 'Songs berhasil dihapus',
      data: {
        songId: song_id,
      }
    };

  }
  
}
  
module.exports = PlaylistSongsHandler;