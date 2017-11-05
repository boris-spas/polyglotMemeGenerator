require "mini_magick"

def generateMeme(filename, top_caption, bot_caption)
	img = MiniMagick::Image.open("../diagram.png")
		img.combine_options do |c|
		c.gravity "south"
		c.draw "text 0,0 'Wololo'"
		c.pointsize 40
		c.stroke("black")
		c.font "./fonts/Impact.ttf"
		c.weight "bold"
		c.fill("white")
	end
	meme_file = File.join(File.dirname(filename), File.basename("MEMEGEN" + filename))
	img.write(meme_file)
	meme_file
end

Truffle::Interop.export_method(:test)