class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUserHandler = this.getByIdUserHandler.bind(this);
    this.getByIdUserHandler = this.getByIdUserHandler.bind(this);
  }

  async postUserHandler(request, h) {
    this._validator.validateAddUsersPayload(request.payload)
    const { username, password, fullname } = request.payload;

    const userId = await this._service.addUser({ username, password, fullname });

    const response = h.response({
      status: 'success',
      message: 'User berhasil ditambahkan',
      data: {
        userId,
      },
    });
    response.code(201);
    return response;


  }

  async getByIdUserHandler(request){
    const { id } = request.params;
    const user = await this._service.getUserById(id);
    return {
      status: 'success',
      data: {
        user,
      },
    };
  }
}

module.exports = UsersHandler;