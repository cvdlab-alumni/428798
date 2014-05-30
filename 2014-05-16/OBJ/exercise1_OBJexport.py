# EXERCISE 1


from pyplasm import *
from collections import *
import sys

""" import modules from lar-cc/lib/py/ """
sys.path.insert(0, '/home/leonardo/lar-cc/lib/py/')
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



'''	------------ MESURES ------------- '''

# WALLS MESURES
perimWalls_thickness = 0.3
innerWalls_thickness = 0.1
walls_Z = 2.5

# ROOMS MESURES
room_default_X = 4
kitchen_X = room_default_X
kitchen_Y = 3
bathRoom_X = room_default_X
bathRoom_Y = 2
hallway_X = 1.5
hallway_Y = kitchen_Y + innerWalls_thickness + bathRoom_Y
livingRoom_X = hallway_X + innerWalls_thickness + room_default_X
livingRoom_Y = 4
bedRoom_X = livingRoom_X
bedRoom_Y = 2.5

# APARTMENT MESURES
floor_Z = 0.1
aprtmt_X = 2*perimWalls_thickness + innerWalls_thickness + hallway_X + room_default_X
aprtmt_Y = 2*perimWalls_thickness + livingRoom_Y + kitchen_Y + bathRoom_Y + bedRoom_Y + 3*innerWalls_thickness
aprtmt_Z = floor_Z + walls_Z

# DOORS MESURES
door_default_height = 2
door_default_width = 0.7
door_default_upperOffset = walls_Z - door_default_height
# 	ENTRANCE DOOR
entranceDoor_thickness = perimWalls_thickness / 3
entranceDoor_offSet = (perimWalls_thickness - entranceDoor_thickness) / 2
#	INNER DOOR
innerDoor_thickness = innerWalls_thickness / 3
innerDoor_offSet = (innerWalls_thickness - innerDoor_thickness) / 2
# DOOR WALLS MESURES
#	ENTRANCE DOOR WALL
entranceDoorVoid_X = perimWalls_thickness
entranceDoorVoid_leftOffset = 0.3
entranceDoorVoid_rightOffset = livingRoom_Y - entranceDoorVoid_leftOffset - door_default_width
#	KITCHEN DOOR WALL
kitchenDoorVoid_X = innerWalls_thickness
kitchenDoorVoid_leftOffset = (kitchen_Y - door_default_width) / 2
kitchenDoorVoid_rightOffset = kitchenDoorVoid_leftOffset
#	BATHROOM DOOR WALL
bathroomDoorVoid_X = innerWalls_thickness
bathroomDoorVoid_leftOffset = (bathRoom_Y - door_default_width) / 2
bathroomDoorVoid_rightOffset = bathroomDoorVoid_leftOffset
#	BATHROOM DOOR WALL
bedroomDoorVoid_Y = innerWalls_thickness
bedroomDoorVoid_leftOffset = (hallway_X - door_default_width) / 2
bedroomDoorVoid_rightOffset = bedroomDoorVoid_leftOffset

# WINDOW MESURES
windowFrame_width = 0.1
windowFrame_thickness = perimWalls_thickness / 3
windowFrame_offset = (perimWalls_thickness - windowFrame_thickness) / 2
# WINDOW WALLS VOIDS MESURES
windowWallVoid_thickness = perimWalls_thickness
windowWallVoid_upperOffset = door_default_upperOffset
largeWindowWallVoid_height = door_default_height
windowGlass_height = (largeWindowWallVoid_height - 3*windowFrame_width) / 2
smallWindowWallVoid_height = 2*windowFrame_width + windowGlass_height
smallWindowWallVoid_lowerOffset = walls_Z - windowWallVoid_upperOffset - smallWindowWallVoid_height
# WINDOW GLASS MESURES
windowGlass_width = 0.5
windowGlass_thickness = windowFrame_thickness / 3
windowGlass_offset = (windowFrame_thickness - windowGlass_thickness) / 2
# WINDOW SHUTTER MESURES
windowShutter_width = 2 * windowFrame_width + windowGlass_width
doubleShutterWindow_width = 2 * windowShutter_width
quadrupleShutterWindow_width = 4 * windowShutter_width
#	LIVINGROOM WINDOW WALL
livingroomWindowWallVoid_offset = (livingRoom_Y - quadrupleShutterWindow_width) / 2
#	KITCHEN WINDOW WALL
kitchenWindowWallVoid_offset = (kitchen_Y - doubleShutterWindow_width) / 2
#	BATHROOM WINDOW WALL
bathroomWindowWallVoid_offset = (bathRoom_Y - doubleShutterWindow_width) / 2
#	BEDROOM WINDOW WALL 1
bedroomWindowWall1Void_offset = (bedRoom_Y - doubleShutterWindow_width) / 2
#	BEDROOM WINDOW WALL 2
bedroomWindowWall2Void_offset = (bedRoom_X - doubleShutterWindow_width) / 2



'''	------------ SUPPORT FUNCTIONS ------------- '''

''' Turns a LAR model into an HPC structured object '''
MODEL2HPC = COMP([STRUCT,MKPOLS])


''' Helps to visualize a LAR model diagram '''
DRAW = COMP([VIEW,MODEL2HPC])


''' Takes a lar diagram model as input and returns its 
	corresponding HPC (re-)numbered 1-skeleton '''
def DIAGRAM2NUMBERED_SKELETON(diagram, numScale=1, color=CYAN):
	V,CV = diagram
	hpc_skel = SKEL_1(STRUCT(MKPOLS(diagram)))
	hpc_skel = cellNumbering(diagram, hpc_skel)(range(len(CV)), color, numScale)
	return hpc_skel


'''	Creates a diagram and returns a couple (lar_diagr, hpc_skel) where:
		diagram		is the LAR model diagram built upon the given inputs 'shape' and 'sizePatterns'
		hpc_skel	is the corresponding HPC 1-skeleton with (re-)numbered cells '''
def CREATE_DIAGRAM(shape, sizePatterns, numScale=1, color=CYAN):
	diagram = assemblyDiagramInit(shape)(sizePatterns)
	hpc_skel = DIAGRAM2NUMBERED_SKELETON(diagram, numScale, color)
	return diagram, hpc_skel


'''	Takes as inputs
		diagram			a LAR diagram
		toRemove		a list of cells to be removed from within the diagram
		numScale		an optional scale factor to be applied to the cells numbering
		color			the numbering color
	and returns a couple (diagram, hpc_skel) where:
		diagram			is the input diagram where cells have been removed
		hpc_skel		is the diagram corresponding HPC 1-skeleton with (re-)numbered cells '''
def REMOVE_CELLS(diagram, toRemove, numScale=1, color=CYAN):
	def REMOVE_CELLS0((V,CV), toRemove):
		return V,[cell for k,cell in enumerate(CV) if not (k in toRemove)]
	diagram = REMOVE_CELLS0(diagram, toRemove)
	hpc_skel = DIAGRAM2NUMBERED_SKELETON(diagram, numScale, color)
	return diagram, hpc_skel


'''	Takes as inputs
		master 			the master LAR diagram containing the cells to merge
		diagram 		a list of LAR diagrams to be mapped into some master's cells
		toMerge			a list of the master's cells to map
		numScale		an optional scale factor to be applied to the cells cellNumbering
		color			the numbering color
	and returns a couple (master, hpc_skel) where:
		master			is the master diagram whose cell 'toMerge' has been mapped with 'diagram'
		hpc_skel		is the master diagram corresponding HPC 1-skeleton with (re-)numbered cells '''
def MERGE_CELLS(master, diagrams, toMerge, numScale=1, color=CYAN):
	def MERGE_CELLS0(master,diagrams,toMerge):
		V,CV = master
		for i in range(len(CV))[::-1]:
			if i in toMerge:
				k = toMerge.index(i)
				master = diagram2cell(diagrams[k],master,toMerge[k])
		return master
	master = MERGE_CELLS0(master, diagrams, toMerge)
	hpc_skel = DIAGRAM2NUMBERED_SKELETON(master, numScale, color)
	return master, hpc_skel


''' Allows for the insertion of RGB colors with parameters ranging in [0,255] '''
def RGB(color):
	return [color[0]/255., color[1]/255., color[2]/255.]


''' Boundary extraction of a block diagram '''
def extractBoundaries(master, emptyChain=[]):
	solidCV = [cell for k,cell in enumerate(master[1]) if not (k in emptyChain)]
	#DRAW((master[0],solidCV))
	exteriorCV =  [cell for k,cell in enumerate(master[1]) if k in emptyChain]
	exteriorCV += exteriorCells(master)
	CV = solidCV + exteriorCV
	V = master[0]
	FV = [f for f in larFacets((V,CV),3,len(exteriorCV))[1] if len(f) >= 4]
	#VIEW(EXPLODE(1.5,1.5,1.5)(MKPOLS((V,FV))))
	BF = boundaryCells(solidCV,FV)
	boundaryFaces = [FV[face] for face in BF]
	B_Rep = V,boundaryFaces
	return B_Rep

def writeModelToOBJFile((V,FV), filePath):
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


'''	------------ COLORS AND MATERIALS ------------- '''

GLASS = [1,1,1,0.1, 0,0,0.8,0.5, 1,1,1,0.1, 1,1,1,0.1, 100]
BROWN = RGB([150, 75, 0])
RED_BROWN = RGB([153, 51, 0])
MAHOGANY = RGB([192, 64, 0])
LIGHT_BROWN =  RGB([205, 133, 63])



'''	------------ APARTMENT DEFINITION ------------- '''
# INITIAL BLOCK DIAGRAM:
shape0 = [1,1,2]
sizePatterns0 = [
	[aprtmt_X],
	[aprtmt_Y],
	[floor_Z, walls_Z]]
apartment, hpc_apartment = CREATE_DIAGRAM(shape0, sizePatterns0, 2)

# ROOMS SUBDIVSION 1 : livingroom + (kitchen + hallway + bathroom) + bedroom
shape1 = [1,3,1]
sizePatterns1 = [
	[aprtmt_X],
	[livingRoom_Y, 2*innerWalls_thickness+hallway_Y, bedRoom_Y],
	[walls_Z]]
roomsSubdiv1, hpc_roomsSubdiv1 = CREATE_DIAGRAM(shape1, sizePatterns1, 2)

# ROOMS SUBDIVSION 2 : livingroom
shape2 = [3,2,1]
sizePatterns2 = [
	[perimWalls_thickness, livingRoom_X, perimWalls_thickness],
	[perimWalls_thickness, livingRoom_Y],
	[walls_Z]]
roomsSubdiv2, hpc_roomsSubdiv2 = CREATE_DIAGRAM(shape2, sizePatterns2, 2)

# ROOMS SUBDIVISION 3 : bedroom
shape3 = [3,2,1]
sizePatterns3 = [
	[perimWalls_thickness, bedRoom_X, perimWalls_thickness],
	[bedRoom_Y, perimWalls_thickness],
	[walls_Z]]
roomsSubdiv3, hpc_roomsSubdiv3 = CREATE_DIAGRAM(shape3, sizePatterns3, 2)

# ROOMS SUBDIVISION 4 : kitchen + hallway + bathroom
shape4 = [5,5,1]
sizePatterns4 = [
	[perimWalls_thickness, hallway_X, innerWalls_thickness, kitchen_X, perimWalls_thickness],
	[innerWalls_thickness, kitchen_Y, innerWalls_thickness, bathRoom_Y, innerWalls_thickness],
	[walls_Z]]
roomsSubdiv4, hpc_roomsSubdiv4 = CREATE_DIAGRAM(shape4, sizePatterns4, 2)

# MERGE AND REMOVE : rooms to obtain apartment spaces 
apartment, hpc_apartment = MERGE_CELLS(apartment, [roomsSubdiv1], [1])
apartment, hpc_apartment = MERGE_CELLS(apartment, [roomsSubdiv2, roomsSubdiv3, roomsSubdiv4], [1,3,2])
#apartment, hpc_apartment = REMOVE_CELLS(apartment, [3, 12, 13, 14, 15, 23, 25, 35])

# -----VIEWCHECK----#
#VIEW(hpc_apartment)
# --------END-------#


'''	------------ DOORS DEFINITION ------------- '''
# ENTRANCE DOOR : major thickness and width about the Y axis
shape5 = [3,1,1]
sizePatterns5 = [
	[entranceDoor_offSet, entranceDoor_thickness, entranceDoor_offSet],
	[door_default_width],
	[door_default_height]]
entranceDoor, hpc_entranceDoor = CREATE_DIAGRAM(shape5, sizePatterns5, 2)

# INNER DOOR 1 : minor thickness and width is about the Y axis
shape6 = [3,1,1]
sizePatterns6 = [
	[innerDoor_offSet, innerDoor_thickness, innerDoor_offSet],
	[door_default_width],
	[door_default_height]]
innerDoor1, hpc_innerDoor1 = CREATE_DIAGRAM(shape6, sizePatterns6, 2)

# INNER DOOR 2 : minor thickness and width is about the X axis
shape7 = [1,3,1]
sizePatterns7 = [
	[door_default_width],
	[innerDoor_offSet, innerDoor_thickness, innerDoor_offSet],
	[door_default_height]]
innerDoor2, hpc_innerDoor2 = CREATE_DIAGRAM(shape7, sizePatterns7, 2)

# ENTRANCE WALL SUBDIAGRAM
shape8 = [1,3,2]
sizePatterns8 = [
	[entranceDoorVoid_X],
	[entranceDoorVoid_leftOffset, door_default_width, entranceDoorVoid_rightOffset],
	[door_default_height, door_default_upperOffset]]
entranceWall, hpc_entranceWall = CREATE_DIAGRAM(shape8, sizePatterns8, 2)

# KITCHEN WALL SUBDIAGRAM
shape9 = [1,3,2]
sizePatterns9 = [
	[kitchenDoorVoid_X],
	[kitchenDoorVoid_leftOffset, door_default_width, kitchenDoorVoid_rightOffset],
	[door_default_height, door_default_upperOffset]]
kitchenWall, hpc_kitchenWall = CREATE_DIAGRAM(shape9, sizePatterns9, 2)

# BATHROOM WALL SUBDIAGRAM
shape10 = [1,3,2]
sizePatterns10 = [
	[bathroomDoorVoid_X],
	[bathroomDoorVoid_leftOffset, door_default_width, bathroomDoorVoid_rightOffset],
	[door_default_height, door_default_upperOffset]]
bathroomWall, hpc_bathroomWall = CREATE_DIAGRAM(shape10, sizePatterns10, 2)

# BEDROOM WALL SUBDIAGRAM
shape11 = [3,1,2]
sizePatterns11 = [
	[bedroomDoorVoid_leftOffset, door_default_width, bedroomDoorVoid_rightOffset],
	[bedroomDoorVoid_Y],
	[door_default_height, door_default_upperOffset]]
bedroomWall, hpc_bedroomWall = CREATE_DIAGRAM(shape11, sizePatterns11, 2)

# MERGE AND REMOVE : door walls-into walls and doors into the wall-doors' voids
apartment, hpc_apartment = MERGE_CELLS(apartment, [entranceWall, bathroomWall, kitchenWall, bedroomWall], [33, 20, 18, 16])
#apartment, hpc_apartment = MERGE_CELLS(apartment, [entranceDoor, innerDoor1, innerDoor1, innerDoor2], [28, 34, 40, 46], 0.2)
#apartment, hpc_apartment = REMOVE_CELLS(apartment, [55, 57, 49, 51, 52, 54, 46, 48])

# -----VIEWCHECK----#
#VIEW(hpc_apartment)
# --------END-------#


#	------------ WINDOWS DEFINITION ------------- 
# LIVINGROOM WINDOW WALL
shape12 = [1,6,2]
sizePatterns12 = [
	[windowWallVoid_thickness],
	[livingroomWindowWallVoid_offset, 
	windowShutter_width, windowShutter_width, windowShutter_width, windowShutter_width, 
	livingroomWindowWallVoid_offset],
	[largeWindowWallVoid_height, windowWallVoid_upperOffset]]
livingroomWindowWall, hpc_livingroomWindowWall = CREATE_DIAGRAM(shape12, sizePatterns12)
# KITCHEN WINDOW WALL
shape13 = [1,4,2]
sizePatterns13 = [
	[windowWallVoid_thickness],
	[kitchenWindowWallVoid_offset, 
	windowShutter_width, windowShutter_width, 
	kitchenWindowWallVoid_offset],
	[largeWindowWallVoid_height, windowWallVoid_upperOffset]]
kitchenWindowWall, hpc_kitchenWindowWall = CREATE_DIAGRAM(shape13, sizePatterns13)
# BATHROOM WINDOW WALL
shape14 = [1,4,3]
sizePatterns14 = [
	[windowWallVoid_thickness],
	[bathroomWindowWallVoid_offset, 
	windowShutter_width, windowShutter_width, 
	bathroomWindowWallVoid_offset],
	[smallWindowWallVoid_lowerOffset, smallWindowWallVoid_height, windowWallVoid_upperOffset]]
bathroomWindowWall, hpc_bathroomWindowWall = CREATE_DIAGRAM(shape14, sizePatterns14)
# BEDROOM WINDOW SHORT WALL
shape15 = [1,4,3]
sizePatterns15 = [
	[windowWallVoid_thickness],
	[bedroomWindowWall1Void_offset, 
	windowShutter_width, windowShutter_width, 
	bedroomWindowWall1Void_offset],
	[smallWindowWallVoid_lowerOffset, smallWindowWallVoid_height, windowWallVoid_upperOffset]]
bedroomWindowWall1, hpc_bedroomWindowWall1 = CREATE_DIAGRAM(shape15, sizePatterns15)
# BEDROOM WINDOW LONG WALL
shape16 = [6,1,2]
sizePatterns16 = [
	[bedroomWindowWall2Void_offset, 
	windowShutter_width, windowShutter_width, windowShutter_width, windowShutter_width, 
	bedroomWindowWall2Void_offset],
	[windowWallVoid_thickness],
	[largeWindowWallVoid_height, windowWallVoid_upperOffset]]
bedroomWindowWall2, hpc_bedroomWindowWall2 = CREATE_DIAGRAM(shape16, sizePatterns16)

# MERGE AND REMOVE : windows-walls into walls
windowsWalls = [livingroomWindowWall, kitchenWindowWall, bathroomWindowWall, bedroomWindowWall1, bedroomWindowWall2]
toMerge = [33, 25, 27, 5, 4]
apartment, hpc_apartment = MERGE_CELLS(apartment, windowsWalls, toMerge)
apartment, hpc_apartment = REMOVE_CELLS(apartment, [0])

# -----VIEWCHECK----#
#VIEW(hpc_livingroomWindowWall)
#VIEW(hpc_kitchenWindowWall)
#VIEW(hpc_bathroomWindowWall)
#VIEW(hpc_bedroomWindowWall1)
#VIEW(hpc_apartment)
# --------END-------#

'''	------------ WALLS FACETS ------------- '''
emptyChain = [2, 9, 10, 11, 12, 17, 19, 26, 
	30, 36, 42, 48, 
	54, 56, 58, 60, 
	78, 80, 
	68, 71, 
	88, 91, 
	98, 100, 102, 104]
b_apartment = extractBoundaries(apartment, emptyChain)
b_apartment = b_apartment[0], b_apartment[1]+[[118,230,250,147]] # AGGIUNTA DI UNA FACCIA MANCANTE

# -----VIEWCHECK----#
#VIEW(EXPLODE(1.1,1.1,1.1)(MKPOLS(b_apartment)))
VIEW(STRUCT(MKPOLS(b_apartment)))
# --------END-------#

'''	------------ FLOOR FACETS ------------- '''
shapeFloor = [1,1,1]
sizePatternsFloor = [
	[aprtmt_X],
	[aprtmt_Y],
	[floor_Z]]
floor, hpc_floor = CREATE_DIAGRAM(shapeFloor, sizePatternsFloor, 2)
b_floor = extractBoundaries(floor)

# -----VIEWCHECK----#
#VIEW(EXPLODE(1.1,1.1,1.1)(MKPOLS(b_floor)))
VIEW(STRUCT(MKPOLS(b_floor)))
# --------END-------#

'''	------------ ENTRANCE DOOR FACETS ------------- '''
entranceDoor, hpc_entranceDoor = REMOVE_CELLS(entranceDoor, [0,2])
entranceDoor = [v for k,v in enumerate(entranceDoor[0]) if k in [v1 for v1 in flatten(entranceDoor[1])]], [range(8)]
b_entranceDoor = extractBoundaries(entranceDoor)

# -----VIEWCHECK----#
#VIEW(EXPLODE(1.1,1.1,1.1)(MKPOLS(b_entranceDoor)))
VIEW(STRUCT(MKPOLS(b_entranceDoor)))
# --------END-------#

'''	------------ DOOR FACETS ------------- '''
innerDoor1, hpc_innerDoor1 = REMOVE_CELLS(innerDoor1, [0,2])
innerDoor1 = [v for k,v in enumerate(innerDoor1[0]) if k in [v1 for v1 in flatten(innerDoor1[1])]], [range(8)]
b_innerDoor1 = extractBoundaries(innerDoor1)

# -----VIEWCHECK----#
#VIEW(EXPLODE(1.1,1.1,1.1)(MKPOLS(b_innerDoor1)))
VIEW(STRUCT(MKPOLS(b_innerDoor1)))
# --------END-------#



# LARGE WINDOW BLOCK 1 : about Y axis
# Carving window-shutter into window void-block
shape17 = [3, 1, 1]
sizePatterns17 = [
	[windowFrame_offset, windowFrame_thickness, windowFrame_offset],
	[windowShutter_width],
	[largeWindowWallVoid_height]]
windowBlock1_1, hpc_windowBlock1_1 = CREATE_DIAGRAM(shape17, sizePatterns17)
# Carving window-frame into window-shutter
shape18 = [1, 3, 5]
sizePatterns18 = [
	[windowFrame_thickness],
	[windowFrame_width, windowGlass_width, windowFrame_width],
	[windowFrame_width,windowGlass_height, windowFrame_width, windowGlass_height, windowFrame_width]]
windowBlock2_1, hpc_windowBlock2_1 = CREATE_DIAGRAM(shape18, sizePatterns18)
# Carving window-glass into window-frame
shape19 = [3, 1, 1]
sizePatterns19 = [
	[windowGlass_offset, windowGlass_thickness, windowGlass_offset],
	[windowGlass_width],
	[windowGlass_height]]
windowBlock3_1, hpc_windowBlock3_1 = CREATE_DIAGRAM(shape19, sizePatterns19)

'''	------------ LARGE FRAME FACETS ------------- '''
b_windowBlock2_1 = extractBoundaries(windowBlock2_1, [6,8])

# -----VIEWCHECK----#
#VIEW(EXPLODE(1.1,1.1,1.1)(MKPOLS(b_windowBlock2_1)))
VIEW(STRUCT(MKPOLS(b_windowBlock2_1)))
# --------END-------#

'''	------------ GLASS FACETS ------------- '''
windowBlock3_1, hpc_windowBlock3_1 = REMOVE_CELLS(windowBlock3_1, [0,2])
windowBlock3_1 = [v for k,v in enumerate(windowBlock3_1[0]) if k in [v1 for v1 in flatten(windowBlock3_1[1])]], [range(8)]
b_windowBlock3_1 = extractBoundaries(windowBlock3_1)

# -----VIEWCHECK----#
#VIEW(EXPLODE(1.1,1.1,1.1)(MKPOLS(b_windowBlock3_1)))
VIEW(STRUCT(MKPOLS(b_windowBlock3_1)))
# --------END-------#

'''
# MERGING window blocks to form a complete window block
largeWindow1, hpc_largeWindow1 = MERGE_CELLS(windowBlock2_1, [windowBlock3_1, windowBlock3_1], [6, 8])
largeWindow1, hpc_largeWindow1 = MERGE_CELLS(windowBlock1_1, [largeWindow1], [1])

# -----VIEWCHECK----#
#VIEW(hpc_windowBlock1_1)
#VIEW(hpc_windowBlock2_1)
#VIEW(hpc_windowBlock3_1)
#VIEW(hpc_largeWindow1)
# --------END-------#

# LARGE WINDOW BLOCK 2 : about X axis
# Carving window-shutter into window void-block
shape20 = [1, 3, 1]
sizePatterns20 = [
	[windowShutter_width],
	[windowFrame_offset, windowFrame_thickness, windowFrame_offset],
	[largeWindowWallVoid_height]]
windowBlock1_2, hpc_windowBlock1_2 = CREATE_DIAGRAM(shape20, sizePatterns20)
# Carving window-frame into window-shutter
shape21 = [3, 1, 5]
sizePatterns21 = [
	[windowFrame_width, windowGlass_width, windowFrame_width],
	[windowFrame_thickness],
	[windowFrame_width,windowGlass_height, windowFrame_width, windowGlass_height, windowFrame_width]]
windowBlock2_2, hpc_windowBlock2_2 = CREATE_DIAGRAM(shape21, sizePatterns21)
# Carving window-glass into window-frame
shape22 = [1, 3, 1]
sizePatterns22 = [
	[windowGlass_width],
	[windowGlass_offset, windowGlass_thickness, windowGlass_offset],
	[windowGlass_height]]
windowBlock3_2, hpc_windowBlock3_2 = CREATE_DIAGRAM(shape22, sizePatterns22)

# MERGING window blocks to form a complete window block
largeWindow2, hpc_largeWindow2 = MERGE_CELLS(windowBlock2_2, [windowBlock3_2, windowBlock3_2], [6, 8])
largeWindow2, hpc_largeWindow2 = MERGE_CELLS(windowBlock1_2, [largeWindow2], [1])

# -----VIEWCHECK----#
#VIEW(hpc_windowBlock1_2)
#VIEW(hpc_windowBlock2_2)
#VIEW(hpc_windowBlock3_2)
#VIEW(hpc_largeWindow2)
# --------END-------#
'''


# SMALL WINDOW BLOCK
# Carving window-shutter into window void-block
shape23 = [3, 1, 1]
sizePatterns23 = [
	[windowFrame_offset, windowFrame_thickness, windowFrame_offset],
	[windowShutter_width],
	[smallWindowWallVoid_height]]
windowBlock1_3, hpc_windowBlock1_3 = CREATE_DIAGRAM(shape23, sizePatterns23)
# Carving window-frame into window-shutter
shape24 = [1, 3, 3]
sizePatterns24 = [
	[windowFrame_thickness],
	[windowFrame_width, windowGlass_width, windowFrame_width],
	[windowFrame_width, windowGlass_height, windowFrame_width]]
windowBlock2_3, hpc_windowBlock2_3 = CREATE_DIAGRAM(shape24, sizePatterns24)
# Carving window-glass into window-frame
shape25 = [3, 1, 1]
sizePatterns25 = [
	[windowGlass_offset, windowGlass_thickness, windowGlass_offset],
	[windowGlass_width],
	[windowGlass_height]]
windowBlock3_3, hpc_windowBlock3_3 = CREATE_DIAGRAM(shape25, sizePatterns25)


'''	------------ LARGE FRAME FACETS ------------- '''
b_windowBlock2_3 = extractBoundaries(windowBlock2_3, [4])

# -----VIEWCHECK----#
#VIEW(EXPLODE(1.1,1.1,1.1)(MKPOLS(b_windowBlock2_3)))
VIEW(STRUCT(MKPOLS(b_windowBlock2_3)))
# --------END-------#


'''
# MERGING window blocks to form a complete window block
smallWindow, hpc_smallWindow = MERGE_CELLS(windowBlock2_3, [windowBlock3_3], [4])
smallWindow, hpc_smallWindow = MERGE_CELLS(windowBlock1_3, [smallWindow], [1])

# -----VIEWCHECK----#
#VIEW(hpc_windowBlock1_3)
#VIEW(hpc_windowBlock2_3)
#VIEW(hpc_windowBlock3_3)
#VIEW(hpc_smallWindow)
# --------END-------#

# MERGING windows into walls
windowsBlocks = [
	largeWindow1, largeWindow1, largeWindow1, largeWindow1, largeWindow1, largeWindow1,
	largeWindow2, largeWindow2, largeWindow2, largeWindow2,
	smallWindow, smallWindow, smallWindow, smallWindow]
toMerge = [
	47, 49, 51, 53, 71, 73, 
	91, 93, 95, 97, 
	61, 64, 81, 84]
apartment, hpc_apartment = MERGE_CELLS(apartment, windowsBlocks, toMerge, 0.07)
# REMOVING cells to finally carve windows out of walls
toRemove = [
	328, 329, 343, 345, 346, 348,
	307, 308, 322, 324, 325, 327,
	286, 287, 301, 303, 304, 306,
	265, 266, 280, 282, 283, 285,
	218, 219, 233, 235, 236, 238,
	197, 198, 212, 214, 215, 217,
	252, 253, 262, 264,
	239, 240, 249, 251,
	184, 185, 194, 196,
	171, 172, 181, 183,
	87, 88, 102, 104, 105, 107,
	108, 109, 123, 125, 126, 128,
	129, 130, 144, 146, 147, 149,
	150, 151, 165, 167, 168, 170]
apartment, hpc_apartment = REMOVE_CELLS(apartment, toRemove, 0.07)

# -----VIEWCHECK----#
VIEW(hpc_apartment)
DRAW(apartment)
# --------END-------#


#	------------ CHAINS COLORING ------------- 
doorsChain = [41, 42, 43, 44]
windowsChain = [
	271, 272,
	256, 257,
	241, 242,
	226, 227,
	193, 194,
	178, 179,
	212, 203,
	164, 155,
	100, 101,
	115, 116,
	130, 131,
	145, 146]
framesChain = \
	range(258,271) + range(243,256) + range(228,241) + range(213,226) + \
	range(180,193) + range(165,178) + \
	range(204,212) + range(195,203) + \
	range(156,164) + range(147,155) + \
	range(132,145) + range(117,130) + range(102,115) + range(87,100)

# MODELS EXTRACTION
V,CV = apartment
doors = V,[cell for k,cell in enumerate(CV) if k in doorsChain]
doors = COLOR(BROWN)(MODEL2HPC(doors))
windows = V,[cell for k,cell in enumerate(CV) if k in windowsChain]
windows = MATERIAL(GLASS)(MODEL2HPC(windows))
frames = V,[cell for k,cell in enumerate(CV) if k in framesChain]
frames = COLOR(LIGHT_BROWN)(MODEL2HPC(frames))
rest = V,[cell for k,cell in enumerate(CV) if k not in (doorsChain+windowsChain+framesChain)]
rest = MODEL2HPC(rest)

# -----VIEWCHECK----#
VIEW(doors)
VIEW(frames)
VIEW(windows)
VIEW(rest)
# --------END-------#

apartment = STRUCT([doors, windows, frames, rest])

# -----VIEWCHECK----#
VIEW(apartment)
# --------END-------#
'''

writeModelToOBJFile(b_floor, "/home/leonardo/Scrivania/floor.obj")
writeModelToOBJFile(b_apartment, "/home/leonardo/Scrivania/walls.obj")
writeModelToOBJFile(b_entranceDoor, "/home/leonardo/Scrivania/entrance_door.obj")
writeModelToOBJFile(b_innerDoor1, "/home/leonardo/Scrivania/inner_door.obj")
writeModelToOBJFile(b_windowBlock2_1, "/home/leonardo/Scrivania/large_frame.obj")
writeModelToOBJFile(b_windowBlock3_1, "/home/leonardo/Scrivania/glass.obj")
writeModelToOBJFile(b_windowBlock2_3, "/home/leonardo/Scrivania/small_frame.obj")