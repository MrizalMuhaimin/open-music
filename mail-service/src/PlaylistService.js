const { Pool } = require('pg');
const NotFoundError = require('./exceptions/NotFoundError');
const { mapSongsDBToModel, mapPlaylistDBToModel } = require('./utils');

class PlaylistService {
  constructor() {
    this._pool = new Pool();
  }

  async getPlaylistById (id) {
    const query = {
      text: 'SELECT playlist.*, users.username FROM playlist LEFT JOIN users ON users.id = playlist.owner WHERE playlist.id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Playlist tidak ditemukan');
    }
    return result.rows.map(mapPlaylistDBToModel)[0];
  }

  async getSongsAtPlaylist(id) {
    const query = {
      text: `SELECT * FROM songs
    LEFT JOIN playlist_songs ON playlist_songs.song_id = songs.id
    WHERE playlist_songs.playlist_id = $1`,
      values: [id],
    };
    const result = await this._pool.query(query);
    return result.rows.map(mapSongsDBToModel);
  }
}

module.exports = PlaylistService;