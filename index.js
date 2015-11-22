'use strict';

var stringify = require('csv-stringify');
var fs = require('fs');
var program = require('commander');
var path = require('path');
var img = require("./img-data");

program
  .option('-i, --input <dir>', 'folder location of the images',
      path.resolve(__dirname, 'images'))
  .option('-o, --output <dir>', 'output location',
      path.resolve(__dirname, 'groups.csv'))
  .option('-r, --rotation <n>', 'degree of rotation of the source image', parseInt, 0)
  .option('-x, --sourcex <n>', 'x location of the section of the source image', parseInt, 0)
  .option('-y, --sourcey <n>', 'y location of the section of the source image', parseInt, 0)
  .option('-w, --sourcew <n>', 'width of the source image', parseInt, 0)
  .option('-h, --sourceh <n>', 'height of the source image', parseInt, 0)
  .option('-f, --force', 'force overwrite output file')
  .parse(process.argv);

try {
  fs.statSync(program.input);
} catch(err) {
  console.log('Input directory doesn\'t exist.');
  process.exit(1);
}

try {
  fs.statSync(program.output);
  // file exists if here
  if (!program.force) {
    console.log("File exists. If you wish to overwrite, please use -f");
    process.exit(1);
  }
} catch(err) {}

try {
  fs.statSync(path.dirname(program.output));
} catch(err) {
  fs.mkdirSync(path.dirname(program.output));
}

// create output stream
var output = fs.createWriteStream(program.output);

// setup csv stringifier
var stringifier = stringify();
stringifier.on('readable', function(){
  var data;
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

// write headers to csv
stringifier.write(['order', 'file_path', 'thumbnail', 'capture_uuid',
    'page_uri', 'book_uri', 'source_rotated', 'width', 'height', 'source_x',
    'source_y', 'source_w', 'source_h']);

var contents = fs.readdirSync(program.input);
var promises = contents.map(function(loc) {
  return img.size(path.resolve(program.input, loc));
});

// resolve image metadata
Promise.all(promises).then(values => {
  return values.map(val => {
    return transform(val.path, val);
  });
}).then(values => {
  values.map((val, i) => {
    // add the "order", "file_path", "thumbnail", "caputure_uuid" keys
    // val[0] === path to file
    val.unshift(i, val[0], val[0], i);
    stringifier.write(val);
  });

  // done
  stringifier.end();
});


//
// helper functions
//

var transform = (loc, obj) => {
  var sourceW, sourceH;
  if (program.sourcew === 0)
    sourceW = obj.width;
  if (program.sourceh === 0)
    sourceH = obj.height;

  // does not include "order", "file_path", "thumbnail", or "caputure_uuid" keys
  return [loc, loc, program.rotation, obj.width, obj.height,
          program.sourcex, program.sourcey, sourceW, sourceH];
}
