const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const { mapPlaylistActivitiesDBToModel } = require('../../utils');

class PlaylistActivitiesService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylistActivities(playlistId, username, title, action) {
    const id = `playlist_activities-${nanoid(16)}`;
    const time = new Date().toISOString();

    const query = {
      text: 'INSERT INTO playlist_activities VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, playlistId, username, title, action, time],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Playlist Activities gagal ditambahkan');
    }
    return result.rows[0].id;
  }


  async getPlaylistActivities(playlistId) {
    const query = {
      text: 'SELECT * FROM playlist_activities WHERE playlist_id = $1',
      values: [playlistId],
    };


    const result = await this._pool.query(query);
    return result.rows.map(mapPlaylistActivitiesDBToModel);

  }


  async deletePlaylistActivities(playlistId) {
    const query = {
      text: 'DELETE FROM playlist_activities WHERE playlist_id = $1',
      values: [playlistId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Playlist Activities gagal dihapus');
    }
  }

}

module.exports = PlaylistActivitiesService;