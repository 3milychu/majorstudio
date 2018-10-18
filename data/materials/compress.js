var fs = require('fs');
var lzwCompress = require('lzwcompress');

var json= fs.readFileSync('/Volumes/Samsung_t3/project-repos/majorstudio/data/materials/top8.json');
var compressed = lzwCompress.pack(json);

fs.writeFile('/Volumes/Samsung_t3/project-repos/majorstudio/data/materials/top8_compressed.json', compressed, function(err) {
    if(err) {
        return console.log(err);
    }

    console.log("The file was saved!");
}); 