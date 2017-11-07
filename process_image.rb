require "mini_magick"

def generateMeme(filename, top_caption, bot_caption)
	img = MiniMagick::Image.open(filename)
		img.combine_options do |c|
		c.gravity "south"
		c.draw "text 0,0 '" + bot_caption + "'"
		c.gravity "north"
		c.draw "text 0,0 '" + top_caption + "'"
 		c.pointsize 40
		c.stroke("black")
		c.font "./fonts/Impact.ttf"
		c.weight "bold"
		c.fill("white")
	end
	meme_file = File.join(File.dirname(filename), "MEMEGEN" + File.basename(filename))
	img.write(meme_file)
	meme_file
end

Truffle::Interop.export_method(:test)


# generateMeme("../diagram.png", "wow, so diagram", "very graphic")