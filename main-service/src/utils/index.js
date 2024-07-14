/* eslint-disable no-undef */
const mapAlbumsDBToModel = ({
  id,
  name,
  cover,
  year,
}) => ({
  id,
  name,
  coverUrl: cover ? `http://${process.env.HOST}:${process.env.PORT}/upload/images/${cover}`: cover,
  year: parseInt(year),
});

const mapSongsDBToModel = ({
  id,
  title,
  performer,
}) => ({
  id,
  title,
  performer,
});

const mapSongDBToModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId,
}) => ({
  id,
  title,
  year: parseInt(year),
  genre,
  performer,
  duration: parseInt(duration),
  albumId,
});

const mapPlaylistActivitiesDBToModel = ({
  id,
  username,
  title,
  action,
  time
}) => ({
  id,
  username,
  title,
  action,
  time
});

const mapPlaylistDBToModel = ({
  id,
  name,
  username,
}) => ({
  id,
  name,
  username,
});
  
module.exports = { mapAlbumsDBToModel, mapSongDBToModel, mapSongsDBToModel, mapPlaylistActivitiesDBToModel, mapPlaylistDBToModel };