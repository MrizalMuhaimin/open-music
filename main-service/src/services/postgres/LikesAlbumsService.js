const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class LikesAlbumsService {
  constructor() {
    this._pool = new Pool();
  }

  async verifyLikeAlbums(albumsId, userId) {
    const query = {
      text: 'SELECT * FROM like_albums WHERE albums_id = $1 AND user_id = $2',
      values: [albumsId, userId],
    };
  
    const result = await this._pool.query(query);

    if (result.rows.length) {
      return false;
    }

    return true;
  }

  async addLikeAlbums(albumsId, userId) {
    const isNotExist = await this.verifyLikeAlbums(albumsId, userId)
    if(!isNotExist) {
      throw new InvariantError('album telah disukai');
    }
    const id = `like-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO like_albums VALUES($1, $2, $3) RETURNING id',
      values: [id, albumsId, userId],
    };

    try {
      const result = await this._pool.query(query);
      if (!result.rows.length) {
        throw new InvariantError('like_albums gagal ditambahkan');
      }
      return result.rows[0].id;

    } catch {
      throw new NotFoundError('Album tidak ditemukan')

    }
  }

  async deleteLikeAlbums(albumsId, userId) {
    const isExist = await this.verifyLikeAlbums(albumsId, userId)
    if(isExist) {
      throw new InvariantError('album telah dihapus dari daftar disukai ');
    }
    const query = {
      text: 'DELETE FROM like_albums WHERE albums_id = $1 AND user_id = $2 RETURNING id',
      values: [albumsId, userId],
    };

    const result = await this._pool.query(query);

    if (!result.rows.length) {
      throw new InvariantError('like_albums gagal dihapus');
    }
  }

 

  async countLikeAlbums(albumsId) {
    const query = {
      text: 'SELECT COUNT(id) FROM like_albums WHERE albums_id = $1',
      values: [albumsId],
    };
  
    const result = await this._pool.query(query);

    return result.rows[0].count || 0;
  }
}

module.exports = LikesAlbumsService;