# objExporter

Exports a model (V,FV) into an .obj format file at 'filePath'


``` py
def objExporter((V,FV), filePath):
	out_file = open(filePath,"w")
	out_file.write("# List of Vertices:\n")
	for v in V:
		out_file.write("v")
		for c in v:
			out_file.write(" " + str(c))
		out_file.write("\n")
	out_file.write("# Face Definitions:\n")
	for f in FV:
		out_file.write("f")
		for v in f:
			out_file.write(" " + str(v+1))
		out_file.write("\n")
	out_file.close()
```