JSONC = require('jsoncomp');

var compressedJSON = JSONC.compress( '/Volumes/Samsung_t3/project-repos/majorstudio/data/materials/top8.json' );

var fs = require('fs');
fs.writeFile("/Volumes/Samsung_t3/project-repos/majorstudio/data/materials/top8_compressed.json", myData, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 