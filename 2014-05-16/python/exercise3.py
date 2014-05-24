# EXERCISE 3


from pyplasm import *
from collections import *
import sys

""" import modules from lar-cc/lib/py/ """
sys.path.insert(0, '/home/leonardo/lar-cc/lib/py/')
import architectural
from architectural import *

import sysml
from sysml import *



''' Takes a lar diagram model as input and returns its 
	corresponding HPC (re-)numbered 1-skeleton. '''
def DIAGRAM2NUMBERED_SKELETON(diagram, numScale=1, color=CYAN):
	V,CV = diagram
	hpc_skel = SKEL_1(STRUCT(MKPOLS(diagram)))
	hpc_skel = cellNumbering(diagram, hpc_skel)(range(len(CV)), color, numScale)
	return hpc_skel


''' Views the 1_SKEL of a LAR diagram. '''
VIEW_1_SKEL= COMP([VIEW,DIAGRAM2NUMBERED_SKELETON])


'''	Removes the cells in 'toRemove' from the given diagram 
	and returns the resulting diagram. '''
def REMOVE_CELLS((V,CV), toRemove):
	return V,[cell for k,cell in enumerate(CV) if not (k in toRemove)]


'''	Executes the merge of a list of diagrams against 
	a master's cells list in one time. '''
def MERGE_CELLS(master,diagrams,toMerge):
	V,CV = master
	for i in range(len(CV))[::-1]:
		if i in toMerge:
			k = toMerge.index(i)
			master = diagram2cell(diagrams[k],master,toMerge[k])
	return master


''' Automatizes the loop "merging-numbering-elimination" of blocks, 
	shown in lar-cc/test/py/sysml/text04.py, providing a software 
	interface where a single 3-array of blocks is mapped at the same 
	time against a number of master's blocks. '''
def MNR_CELLS(master, diagrams, toMerge, toRemove):
	# if on between toMerge and toRemove is empty there is no conflict
	if(toMerge and toRemove):
		# elems in diagrams and in toMerge are mapped 1-to-1 thus they must be equally numerous
		if (len(diagrams) == len(toMerge)):
			# foreach cell value in toRemove: decrease by 1 any lower value in toMerge
			for r in toRemove:
				for i in range(len(toMerge)):
					if (toMerge[i] >= r):
						toMerge[i] -= 1
	# When the follout of the removals has been mapped over the 
	# numbering of cells to be merged  the "REMOVE" and "MERGE" 
	# operations can be chained safely
	master = REMOVE_CELLS(master, toRemove)
	master = MERGE_CELLS(master, diagrams, toMerge)
	return master



'''	------------ TESTING ON THE APARTMENT DEFINITION ------------- '''

# MASTER DIAGRAM:
shape0 = [1,4,2]
sizePatterns0 = [[1], [1,1,1,1], [2,1]]
master = assemblyDiagramInit(shape0)(sizePatterns0)
VIEW_1_SKEL(master)

# DIAGRAM TO MERGE
shape1 = [2,2,2]
sizePatterns1 = [[0.5,0.5], [0.5,0.5], [0.5,0.5]]
diagram = assemblyDiagramInit(shape1)(sizePatterns1)
VIEW_1_SKEL(diagram)

''' HERE THE MERGE-NUMBERING-REMOVE IS AUTOMATIZED IN ONE SINGLE OPERATION: '''
diagrams = [diagram, diagram]
toMerge = [3, 7]
toRemove = [1, 5, 2]
master = MNR_CELLS(master, diagrams, toMerge, toRemove)
VIEW_1_SKEL(master)

