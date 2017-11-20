const fs = require('fs');

var makeMeme;
var file = 'process_image.rb'

fs.exists(file, function (fileok) {
	if (fileok)
		fs.readFile(file, 'utf8', function(err, contents) {
			var rubyMemeGen = contents;
		    Interop.eval("application/x-ruby", rubyMemeGen);
			makeMeme = Interop.import("generateMeme");
			console.log("Ruby code is loaded!");
			var resultFile = makeMeme("./testbench/test.jpeg", "Wow, so ruby\nMuch js", "Very polyglot");
			console.log("Result is saved to " + resultFile);
		});
	else
		console.log("File " + file + " does not exist")

});
