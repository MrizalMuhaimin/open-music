const mapAlbumsDBToModel = ({
  id,
  name,
  year,
}) => ({
  id,
  name,
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
  owner,
}) => ({
  id,
  name,
  username: owner,
});
  
module.exports = { mapAlbumsDBToModel, mapSongDBToModel, mapSongsDBToModel, mapPlaylistActivitiesDBToModel, mapPlaylistDBToModel };