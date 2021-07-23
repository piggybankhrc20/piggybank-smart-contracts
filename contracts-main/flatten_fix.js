var fs = require('fs');
var process = require("process");
var root = 'flatten-contracts/'
fs.readdir(root, function (err, files) {
  if (err) {
    console.error("Could not list the directory.", err);
    process.exit(1);
  }
  console.log('-- files : ', files)

  files.forEach(function (file, index) {
    fs.readFile(root + file, 'utf8', function (err,data) {
      if (err) {
        return console.log('-- err1 : ', err);
      }
      var result = data.replace(/\/\/ SPDX-License-Identifier: MIT/g, '');
      result = result.replace(/\/\/ SPDX-License-Identifier: GPL-3.0-or-later/g, '');

      result = '\/\/ SPDX-License-Identifier: GPL-3.0-or-later Or MIT\n' + result;
    
      fs.writeFile(root + file, result, 'utf8', function (err) {
         if (err) return console.log('-- err2 : ', err);
      });
    });
  })
})
