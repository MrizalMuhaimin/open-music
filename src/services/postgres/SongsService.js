const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const { mapSongsDBToModel, mapSongDBToModel } = require('../../utils');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addSong({ title, year, genre, performer, duration, albumId }) {
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING id',
      values: [id, title, year.toString(), genre, performer, duration, albumId, createdAt, updatedAt],
    };

    const result = await this._pool.query(query);

    if (!result.rows[0].id) {
      throw new InvariantError('Song gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getSongs({title='',performer=''}) {
    let query = 'SELECT * FROM songs';
    if(title?.length > 0 & performer?.length > 0){
      query = `SELECT * FROM songs WHERE title ILIKE '%${title}%' AND performer ILIKE '%${performer}%'`;
    } else if(title?.length > 0) {
      query = `SELECT * FROM songs WHERE title ILIKE '%${title}%'`;
    } else if(performer?.length > 0) {
      query = `SELECT * FROM songs WHERE performer ILIKE '%${performer}%'`;
    }
    const result = await this._pool.query(query);
    return result.rows.map(mapSongsDBToModel);
  }

  async getSongById (id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new NotFoundError('Songs tidak ditemukan');
    }

    return result.rows.map(mapSongDBToModel)[0];

  }

  async verifySongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };
    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Songs tidak ditemukan');
    }
  }

  async editSongById (id, { title, year, genre, performer, duration, albumId }) {
    const updatedAt = new Date().toISOString();
    const query = {
      text: 'UPDATE songs SET title = $1, year = $2, genre = $3, performer = $4, duration = $5, album_id = $6, updated_at = $7 WHERE id = $8 RETURNING id',
      values: [title, year.toString(), genre, performer, duration.toString(),albumId, updatedAt, id],
    };

    const result = await this._pool.query(query);


    if (!result.rows.length) {
      throw new NotFoundError('Gagal memperbarui song. Id tidak ditemukan');
    }

  }

  async deleteSongById(id) {
    const query = {
      text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
      values: [id],
    };
  
    const result = await this._pool.query(query);
  
    if (!result.rows.length) {
      throw new NotFoundError('Song gagal dihapus. Id tidak ditemukan');
    }
  }
}

module.exports = SongsService;