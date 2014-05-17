# EXERCISE 1

from pyplasm import *
from collections import *
import sys

""" import modules from lar-cc/lib/py/ """
sys.path.insert(0, '../lar-cc/lib/py/')
import architectural
from architectural import *

import boolean2
from boolean2 import *

import lar2psm
from lar2psm import *

import larcc
from larcc import *

import largrid
from largrid import *

import mapper
from mapper import *

import myfont
from myfont import *

import morph
from morph import *

import simplexn
from simplexn import *

import splines
from splines import *

import sysml
from sysml import *

# LENGTH = X axis
# WIDTH = Y axis
# HEIGHT = Z axis

# WALLS MESURES
apart_perimWalls_thickness = 0.3
apart_innerWalls_thickness = 0.1
apart_walls_height = 2.5

# ROOMS AND SPACES MESURES
livingRoom_width = 4
kitchen_width = 3
kitchen_length = 4
bathRoom_width = 2
hallway_width = kitchen_width + apart_innerWalls_thickness + bathRoom_width
hallway_length = 1.5
ref_length = hallway_length + kitchen_length
bedRoom_width = 2.5

# DOORS AND WINDOWS MESURES
door_height = 2
door_width = 0.7
door_length = apart_innerWalls_thickness
window_height = 
window_width = 
window_length = apart_perimWalls_thickness

# WHOLE APARTMENT MESURES
apart_lenght = 2*apart_perimWalls_thickness + ref_length
apart_width = 2*apart_perimWalls_thickness + livingRoom_width + hallway_width + bedRoom_width + 2*apart_innerWalls_thickness
apart_base_heigth = 0.1
apart_height = apart_walls_height + apart_base_heigth


'''
Helps to visualize a LAR model diagram '''
DRAW = COMP([VIEW,STRUCT,MKPOLS])

'''
Takes a lar diagram model as input and returns its 
corresponding HPC (re-)numbered 1-skeleton '''
def larDiagram2HpcNumberedSkeleton(lar_diagr, numScale=1, color=CYAN):
	V,CV = lar_diagr
	hpc_skel = SKEL_1(STRUCT(MKPOLS(lar_diagr)))
	hpc_skel = cellNumbering(lar_diagr, hpc_skel)(range(len(CV)), color, numScale)
	return hpc_skel

'''
Creates a diagram and returns a couple (lar_diagr, hpc_skel) where:
	lar_diagr	is the LAR model diagram built upon the given inputs 'shape' and 'sizePatterns'
	hpc_skel	is the corresponding HPC 1-skeleton with (re-)numbered cells '''
def createDiagram(shape, sizePatterns, numScale=1, color=CYAN):
	lar_diagr = assemblyDiagramInit(shape)(sizePatterns)
	hpc_skel = larDiagram2HpcNumberedSkeleton(lar_diagr, numScale, color)
	return lar_diagr, hpc_skel

'''
Takes as inputs
	lar_diagr		a LAR diagram
	cellsToRemove	a list of cells to be removed from within the lar_diagr
	numScale		an optional scale factor to be applied to the cells cellNumbering
	color			the numbering color
and returns a couple (lar_diagr, hpc_skel) where:
	lar_diagr		is the very input diagram lacking the cells that were to be removed
	hpc_skel		is the lar_diagr corresponding HPC 1-skeleton with (re-)numbered cells '''
def removeCellsFromDiagram(lar_diagr, cellsToRemove, numScale=1, color=CYAN):
	V,CV = lar_diagr
	lar_diagr = V,[cell for k,cell in enumerate(CV) if not (k in cellsToRemove)]
	hpc_skel = larDiagram2HpcNumberedSkeleton(lar_diagr, numScale, color)
	return lar_diagr, hpc_skel

'''
Takes as inputs
	diagram 		the LAR diagram to be mapped
	master 			the master LAR diagram containing a target cell
	targetCell		the cell of the 'master' diagram to be mapped with 'diagram'
	numScale		an optional scale factor to be applied to the cells cellNumbering
	color			the numbering color
and returns a couple (lar_diagr, hpc_skel) where:
	lar_diagr		is the diagram whose cell 'targetCell' has been mapped with 'diagram'
	hpc_skel		is the lar_diagr corresponding HPC 1-skeleton with (re-)numbered cells '''
def mergeDiagramWithCell(diagram, master, targetCell, numScale=1, color=CYAN):
	master = diagram2cell(diagram, master, targetCell)
	master_hpc_skel = larDiagram2HpcNumberedSkeleton(master, numScale, color)
	return master, master_hpc_skel



# INITIAL ASSEMBLY:
# apartment = livingRoom + hallway + (kitchen + bathroom) + bedroom
shape1 = [5,7,2]
sizePatterns1 = [
	[apart_perimWalls_thickness, hallway_length, apart_innerWalls_thickness, kitchen_length, apart_perimWalls_thickness],
	[apart_perimWalls_thickness, livingRoom_width, apart_innerWalls_thickness, 
	hallway_width, apart_innerWalls_thickness, bedRoom_width, apart_perimWalls_thickness],
	[apart_base_heigth, apart_height]]
apartment, hpc_apart = createDiagram(shape1, sizePatterns1, 2)

# REMOVING cells to create void spaces of livingroom, hallway and bedroom
cellsToRemove = [17, 31, 45, 21, 25, 39, 53]
apartment, hpc_apart = removeCellsFromDiagram(apartment, cellsToRemove, 2)

# -----VIEWCHECK----#
VIEW(hpc_apart)
DRAW(apartment)
# --------END-------#


# ASSEMBLY 3:
# apart_subDiagram2 = kitchen + bathroom
shape3 = [1,3,1]
sizePatterns3 = [
	[kitchen_length],
	[kitchen_width, apart_innerWalls_thickness, bathRoom_width],
	[apart_walls_height]]
apart_subDiagram2, hpc_apartSubDiagr2 = createDiagram(shape3, sizePatterns3, 2)

# -----VIEWCHECK----#
VIEW(hpc_apartSubDiagr2)
# --------END-------#

# EMBEDDING apart_subDiagram2 into a proper cell
# apartment = livingRoom + hallway + kitchen + bathroom + bedroom
targetCell = 43
apartment, hpc_apart = mergeDiagramWithCell(apart_subDiagram2, apartment, targetCell, 2)

# REMOVING cells to create void spaces of kitchen and bathroom
cellsToRemove = [62, 64]
apartment, hpc_apart = removeCellsFromDiagram(apartment, cellsToRemove, 2)

# -----VIEWCHECK----#
VIEW(hpc_apart)
DRAW(apartment)
# --------END-------#


# ASSEMBLY 4:
# apart_entrance
shape4 = [1,3,2]
sizePatterns4 = [
	[apart_perimWalls_thickness],
	[0.3, door_width, livingRoom_width-(1+door_width)],
	[door_height, apart_walls_height - door_height]]
apart_entrance, hpc_apartEntrance = createDiagram(shape4, sizePatterns4, 2)

# -----VIEWCHECK----#
VIEW(hpc_apartEntrance)
# --------END-------#

# EMBEDDING apart_entrance into a proper cell
targetCell = 3
apartment, hpc_apart = mergeDiagramWithCell(apart_entrance, apartment, targetCell, 2)

# REMOVING cells to create the void space for the entrance door
cellsToRemove = [64]
apartment, hpc_apart = removeCellsFromDiagram(apartment, cellsToRemove, 2)

# -----VIEWCHECK----#
#VIEW(hpc_apart)
#DRAW(apartment)
# --------END-------#


# ASSEMBLY 4:
# kitch_bath_doors
shape4 = [1,5,2]
sizePatterns4 = [
	[apart_innerWalls_thickness],
	[1.2, door_width, 1.7, door_width, 0.7],
	[door_height, apart_walls_height - door_height]]
kitch_bath_doors, hpc_kitchBathDoors = createDiagram(shape4, sizePatterns4, 2)

# -----VIEWCHECK----#
#VIEW(hpc_kitchBathDoors)
# --------END-------#

# EMBEDDING kitch_bath_doors into a proper cell
targetCell = 30
apartment, hpc_apart = mergeDiagramWithCell(kitch_bath_doors, apartment, targetCell, 2)

# REMOVING cells to create voids for the kitchen and batchroom doors
cellsToRemove = [68, 72]
apartment, hpc_apart = removeCellsFromDiagram(apartment, cellsToRemove, 2)

# -----VIEWCHECK----#
#VIEW(hpc_apart)
#DRAW(apartment)
# --------END-------#


# ASSEMBLY 5:
# hallway_door
shape5 = [3,1,2]
sizePatterns5 = [
	[hallway_length/2, door_width, hallway_length/2],
	[apart_innerWalls_thickness],
	[door_height, apart_walls_height - door_height]]
hallway_door, hpc_hallwayDoor = createDiagram(shape5, sizePatterns5, 2)

# -----VIEWCHECK----#
#VIEW(hpc_hallwayDoor)
# --------END-------#

# EMBEDDING hallway_door into proper cells
targetCell = 17
apartment, hpc_apart = mergeDiagramWithCell(hallway_door, apartment, targetCell, 2)
targetCell = 19
apartment, hpc_apart = mergeDiagramWithCell(hallway_door, apartment, targetCell, 2)

# REMOVING cells to create voids for the kitchen and batchroom doors
cellsToRemove = [74, 80]
apartment, hpc_apart = removeCellsFromDiagram(apartment, cellsToRemove, 2)

# -----VIEWCHECK----#
VIEW(hpc_apart)
DRAW(apartment)
# --------END-------#


# ASSEMBLY 6:
# window
shape6 = [1,3,3]
sizePatterns6 = [
	[apart_perimWalls_thickness],
	[1,1,1],
	[1,1,1]]
window, hpc_window = createDiagram(shape6, sizePatterns6, 2)

# -----VIEWCHECK----#
VIEW(hpc_window)
# --------END-------#

# EMBEDDING window into proper cells
targetCell = 47
apartment, hpc_apart = mergeDiagramWithCell(window, apartment, targetCell, 2)
targetCell = 54
apartment, hpc_apart = mergeDiagramWithCell(window, apartment, targetCell, 2)

# REMOVING cells to create voids for the kitchen and batchroom doors
cellsToRemove = [84, 93]
apartment, hpc_apart = removeCellsFromDiagram(apartment, cellsToRemove, 2)

# -----VIEWCHECK----#
#VIEW(hpc_apart)
#DRAW(apartment)
# --------END-------#


# ASSEMBLY 7:
# kitch_bath_windows
shape7 = [1,5,3]
sizePatterns7 = [
	[apart_perimWalls_thickness],
	[1.2, 1, 1.7, 1, 0.7],
	[0.75, 1, 0.75]]
kitch_bath_windows, hpc_kitchBathWindows = createDiagram(shape7, sizePatterns7, 2)

# -----VIEWCHECK----#
#VIEW(hpc_kitchBathWindows)
# --------END-------#

# EMBEDDING window into proper cells
targetCell = 50
apartment, hpc_apart = mergeDiagramWithCell(kitch_bath_windows, apartment, targetCell, 2)

# REMOVING cells to create voids for the kitchen and batchroom windows
cellsToRemove = [99, 105]
apartment, hpc_apart = removeCellsFromDiagram(apartment, cellsToRemove, 2)

# -----VIEWCHECK----#
#VIEW(hpc_apart)
#DRAW(apartment)
# --------END-------#


# ASSEMBLY 8:
# window2
shape8 = [3,1,3]
sizePatterns8 = [
	[hallway_length/3,hallway_length/3,hallway_length/3],
	[apart_perimWalls_thickness],
	[hallway_length/3,hallway_length/3,hallway_length/3]]
window2, hpc_window2 = createDiagram(shape8, sizePatterns8, 2)

# -----VIEWCHECK----#
VIEW(hpc_window2)
# --------END-------#

# EMBEDDING window into proper cells
targetCell = 21
apartment, hpc_apart = mergeDiagramWithCell(window2, apartment, targetCell, 0.5)

# REMOVING cells to create voids for the kitchen and batchroom doors
cellsToRemove = [111]
apartment, hpc_apart = removeCellsFromDiagram(apartment, cellsToRemove, 2)

# -----VIEWCHECK----#
VIEW(hpc_apart)
DRAW(apartment)
# --------END-------#

