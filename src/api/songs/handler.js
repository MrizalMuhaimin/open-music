class SongsHandler {

  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  
    // this.postAlbumsHandler = this.postAlbumsHandler.bind(this);
    // this.getAlbumsHandler = this.getAlbumsHandler.bind(this);
    // this.getByIdAlbumsHandler = this.getByIdAlbumsHandler.bind(this);
    // this.putAlbumsHandler = this.putAlbumsHandler.bind(this);
    // this.deleteAlbumsHandler = this.deleteAlbumsHandler(this);
  }
  
  //   async postAlbumsHandler(request, h) {
  
  //   }
  
  //   async getAlbumsHandler() {
  //     const notes = await this._service.getNotes();
  //     return {
  //       status: 'success',
  //       data: {
  //         notes,
  //       },
  //     };
          
  //   }
  
  //   async getByIdAlbumsHandler(request, h) {
          
  //   }
  
  //   async putAlbumsHandler(request, h) {
          
  //   }
  
  //   async deleteAlbumsHandler(request, h) {
          
  //   }
  
}
  
module.exports = SongsHandler;