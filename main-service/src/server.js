/* eslint-disable no-undef */

require('dotenv').config();

const Hapi = require('@hapi/hapi');
const Jwt = require('@hapi/jwt');
const Inert = require('@hapi/inert');
const path = require('path');


const albums = require('./api/albums');
const AlbumsService = require('./services/postgres/AlbumsService');
const AlbumsValidator = require('./validator/albums');

const songs = require('./api/songs');
const SongsService = require('./services/postgres/SongsService');
const SongsValidator = require('./validator/songs');

const users = require('./api/users');
const UsersService = require('./services/postgres/UsersService');
const UsersValidator = require('./validator/users');

const authentications = require('./api/authentications');
const AuthenticationsService = require('./services/postgres/AuthenticationsService');
const AuthenticationsValidator = require('./validator/authentications');
const TokenManager = require('./tokenize/TokenManager');

const playlist = require('./api/playlist');
const PlaylistService = require('./services/postgres/PlaylistService');
const PlaylistValidator = require('./validator/playlist');

const playlistSongs = require('./api/playlistSongs');
const PlaylistSongsService = require('./services/postgres/PlaylistSongsService');
const PlaylistSongsValidator = require('./validator/playlist_songs');

// collaborations
const collaborations = require('./api/collaborations');
const CollaborationsService = require('./services/postgres/CollaborationsService');
const CollaborationsValidator = require('./validator/collaborations');

// collaborations
const playlistActivities = require('./api/playlistActivities');
const PlaylistActivitiesService = require('./services/postgres/PlaylistActivitiesService');
const PlaylistActivitiesValidator = require('./validator/playlist_activities');

// Exports
const _exports = require('./api/exports');
const ProducerService = require('./services/rabbitmq/ProducerService');
const ExportsValidator = require('./validator/exports');

// uploads
const uploads = require('./api/uploads');
const StorageService = require('./services/storage/StorageService');
const UploadsValidator = require('./validator/uploads');

// likeService
const LikesAlbumsService = require('./services/postgres/LikesAlbumsService');

// cache
const CacheService = require('./services/redis/CacheService');

const ClientError = require('./exceptions/ClientError');


const init = async () => {
  const collaborationsService = new CollaborationsService();
  const playlistActivitiesService = new PlaylistActivitiesService()

  const albumsService = new AlbumsService();
  const cacheService = new CacheService();
  const likesAlbumsService = new LikesAlbumsService();
  const songsService = new SongsService();
  const usersService = new UsersService();
  const playlistService = new PlaylistService(collaborationsService);
  const playlistSongsService = new PlaylistSongsService();
  const authenticationsService = new AuthenticationsService()
  
  const storageService = new StorageService(path.resolve(__dirname, 'api/uploads/file/images'));

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
        
  });

  // registrasi plugin eksternal
  await server.register([
    {
      plugin: Jwt,
    },
    {
      plugin: Inert,
    },
  ]);

  // mendefinisikan strategy autentikasi jwt
  server.auth.strategy('openmusicapp_jwt', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      maxAgeSec: process.env.ACCESS_TOKEN_AGE,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
        username: artifacts.decoded.payload.username,
      },
    }),
  });

  await server.register([
    {
      plugin: albums,
      options: {
        service: albumsService,
        likeAlbumsService: likesAlbumsService,
        validator: AlbumsValidator,
        cacheService : cacheService,
      },
    },
    {
      plugin: songs,
      options: {
        service: songsService,
        validator: SongsValidator,
      },
    },
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator,
      },
    },
    {
      plugin: playlist,
      options: {
        service: playlistService,
        validator: PlaylistValidator,
      },
    },
    {
      plugin: playlistSongs,
      options: {
        playlistSongsService: playlistSongsService,
        playlistService: playlistService,
        playlistActivitiesService: playlistActivitiesService,
        songsService: songsService,
        validator: PlaylistSongsValidator,
      },
    },
    {
      plugin: authentications,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationsValidator,
      },
    },
    {
      plugin: collaborations,
      options: {
        collaborationsService,
        playlistService,
        usersService,
        validator: CollaborationsValidator,
      },
    },
    {
      plugin: playlistActivities,
      options: {
        service: playlistActivitiesService,
        playlistService: playlistService,
        validator: PlaylistActivitiesValidator,
      },
    },
    {
      plugin: _exports,
      options: {
        service: ProducerService,
        playlistService: playlistService,
        validator: ExportsValidator,
      },
    },
    {
      plugin: uploads,
      options: {
        service: storageService,
        albumsService: albumsService,
        validator: UploadsValidator,
      },
    }
  ]);

  server.ext('onPreResponse', (request, h) => {
    const { response } = request;

    // penanganan client error secara internal.
    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return h.continue;

  })

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`)
};

init();