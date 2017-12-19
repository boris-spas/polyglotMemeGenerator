// Simple test script
// The code below triggers different Truffle exceptions

var dbm = Java.type('DBManager').getInstance();

// Testing byte[] (Exception 1)
for (var i of dbm.testByteArray("hohoho")) {
	console.log(i);
}

// Testing java.util.HashMap<Integer, String> (Exception 2)
var imagesHashMap = dbm.getNImages(3);