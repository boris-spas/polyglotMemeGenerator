// I know, it is awful code
// It will be improved, I swear ( ._.)

document.getElementById("file_name_field").addEventListener("change", load, true);
function load() {
	var reader = new FileReader();
	reader.onloadend = function() {
		document.getElementById("image").src = reader.result;
	}
	var file = document.getElementById("file_name_field").files[0];
	if (file) {
		reader.readAsDataURL(file);
	}
}