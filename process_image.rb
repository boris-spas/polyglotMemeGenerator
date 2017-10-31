def test
	print "hello from ruby script"
end

Truffle::Interop.export_method(:test)