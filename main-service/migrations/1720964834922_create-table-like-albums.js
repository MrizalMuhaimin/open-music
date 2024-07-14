/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = (pgm) => {
  pgm.createTable('like_albums', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    albums_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    user_id: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
  });

  pgm.addConstraint('like_albums', 'unique_albums_id_and_user_id', 'UNIQUE(albums_id, user_id)');
  pgm.addConstraint('like_albums', 'fk_like_albums.albums_id_albums.id', 'FOREIGN KEY(albums_id) REFERENCES albums(id) ON DELETE CASCADE');
  pgm.addConstraint('like_albums', 'fk_like_albums.user_id_users.id', 'FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE');
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = (pgm) => {
  pgm.dropTable('like_albums');
};
