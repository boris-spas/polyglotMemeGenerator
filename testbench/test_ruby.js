const fs = require('fs');

var makeMeme;

fs.readFile('../process_image.rb', 'utf8', function(err, contents) {
	var rubyMemeGen = contents;
    Interop.eval("application/x-ruby", rubyMemeGen);
	makeMeme = Interop.import("generateMeme");
	console.log("Ruby code is loaded!");
	var resultFile = makeMeme("test.jpeg", "Wow, so ruby\nMuch js", "Very polyglot");
	console.log("Result is saved to " + resultFile);
});
