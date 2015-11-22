var stringify = require('csv-stringify');
var fs = require('fs');
var output = fs.createWriteStream('testing.csv');
var img = require("./img-data");
var absPath = __dirname + '/images/';

stringifier = stringify();
stringifier.on('readable', function(){
  while(data = stringifier.read()) {
    output.write(data);
  }
});
stringifier.on('error', function(err){
  consol.log(err.message);
});
stringifier.on('finish', function(){
  console.log("Complete!");
});

// write headers first
stringifier.write(['order', 'file_path', 'thumbnail', 'capture_uuid', 'page_uri', 'book_uri', 'source_rotated', 'width', 'height', 'source_x', 'source_y', 'source_w' ,'source_h']);

var contents = fs.readdirSync(absPath);
var promises = contents.map(function(path) {
  return img.size(absPath + path);
});

Promise.all(promises).then(values => {
  return values.map(val => {
    return transform(val.path, val);
  });
}).then(values => {
  values.map((val, i) => {
    // add the "order" key
    val.unshift(i);
    stringifier.write(val);
  });

  // done
  stringifier.end();
});

function transform(path, obj) {
  // does not include "order" key
  return [path, path, path, path, path, 0, obj.width, obj.height, 0, 0, obj.width, obj.height];
}
