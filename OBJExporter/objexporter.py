import simplexn
from simplexn import *


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


''' Triangular facets extraction of a block diagram '''
def extractTriaFacets(master, emptyChain=[]):
	master = extractFacets(master,emptyChain)
	master = quads2tria(master)
	return master


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


''' Rimuove dalla lista dei vertici i vertici non effettivamente 
	utilizzati per la definizione delle celle '''
def clearUnusedVertices((V,CV)):
	UV = [v for cell in CV for v in cell]
	UnV = [k for k,vert in enumerate(V) if k not in UV]
	for cell in CV:
		for i in range(len(cell)):
			c = 0
			for v in UnV:
				if cell[i] > v:
					c += 1
			cell[i] -= c
	V = [vert for k,vert in enumerate(V) if k not in UnV]
	return V,CV