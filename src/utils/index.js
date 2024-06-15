const mapAlbumsDBToModel = ({
  id,
  name,
  year,
}) => ({
  id,
  name,
  year: parseInt(year),
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
  year,
  genre,
  performer,
  duration,
  albumId,
});
  
module.exports = { mapAlbumsDBToModel, mapSongDBToModel };