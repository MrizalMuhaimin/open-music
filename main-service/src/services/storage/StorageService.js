const fs = require('fs');
 
class StorageService {
  constructor(folder) {
    this._folder = folder;
 
    if (!fs.existsSync(folder)) {
      fs.mkdirSync(folder, { recursive: true });
    }
  }
 
  writeFile(file, meta) {
    const filename = +new Date() + meta.filename;
    const path = `${this._folder}/${filename}`;
 
    const fileStream = fs.createWriteStream(path);
 
    return new Promise((resolve, reject) => {
      fileStream.on('error', (error) => reject(error));
      file.pipe(fileStream);
      file.on('end', () => resolve(filename));
    });
  }

  removeFile(filename) {
    const path = `${this._folder}/${filename}`;

    fs.stat(path, function (err, stats) {
      console.log(stats);//here we got all information of file in stats variable
   
      if (err) {
        return console.error(err);
      }
   
      fs.unlink(path,function(err){
        if(err) return console.log(err);
        console.log('file deleted successfully');
      });  
    });
  }
}
 
module.exports = StorageService;