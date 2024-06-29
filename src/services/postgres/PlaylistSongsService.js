const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');

class PlaylistSongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addSongsAtPlaylist(playlistId, songId) {
    const id = `playlist_songs-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO playlist_songs VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Playlist Songs gagal ditambahkan');
    }
    return result.rows[0].id;
  }

  async getSongsAtPlaylist(id) {
    const query = {
      text: `SELECT playlist.* FROM playlist
    LEFT JOIN playlist_songs ON playlist_songs.playlist_id = playlist.id
    WHERE playlist.id = $1 OR playlist_songs.playlist_id = $1
    GROUP BY notes.id`,
      values: [id],
    };
    const result = await this._pool.query(query);
    console.log(result.rows)
    return result.rows;
  }

  async deleteSongsAtPlaylist(playlistId, songId) {
    const query = {
      text: 'DELETE FROM playlist_songs WHERE note_id = $1 AND user_id = $2 RETURNING id',
      values: [playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Playlist Songs gagal dihapus');
    }
  }

  async verifySongsAtPlaylist(playlistId, songId) {
    const query = {
      text: 'SELECT * FROM playlist_songs WHERE note_id = $1 AND user_id = $2',
      values: [playlistId, songId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('Playlist Songs gagal diverifikasi');
    }
  }
}

module.exports = PlaylistSongsService;