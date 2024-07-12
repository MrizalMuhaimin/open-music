const mapSongsDBToModel = ({
  song_id,
  title,
  performer,
}) => ({
  id: song_id,
  title,
  performer,
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
  
module.exports = { mapSongsDBToModel, mapPlaylistDBToModel };