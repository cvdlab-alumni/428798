
''' Facets extraction of a block diagram '''
def extractFacets(master, emptyChain=[]):
	solidCV = [cell for k,cell in enumerate(master[1]) if not (k in emptyChain)]
	exteriorCV =  [cell for k,cell in enumerate(master[1]) if k in emptyChain]
	exteriorCV += exteriorCells(master)
	CV = solidCV + exteriorCV
	V = master[0]
	FV = [f for f in larFacets((V,CV),3,len(exteriorCV))[1] if len(f) >= 4]
	BF = boundaryCells(solidCV,FV)
	boundaryFaces = [FV[face] for face in BF]
	B_Rep = V,boundaryFaces
	return B_Rep

''' Exports a model (V,FV) into an .obj format file at 'filePath' '''
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