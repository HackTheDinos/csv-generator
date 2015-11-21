var stringify = require('csv-stringify');
var fs = require('fs');
var output = fs.createWriteStream('testing.csv');

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

// load all images, parse, and write info
// TODO implement this part


// done
stringifier.end();
