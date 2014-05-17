# EXERCISE 2

# MESURES AND UTILITY
plan_height = 0.1
numOfFloors = 3
numOfLandings = numOfFloors-1
X = 1
Y = 2
Z = 3

'''
Funzione GRID '''
GRID = COMP([INSR(PROD),AA(QUOTE)])

'''
Funzione che mi permette di inserire i colori in rgba con range [0,255] '''
def rgb(color):
	return [color[0]/255., color[1]/255., color[2]/255.]



# TURN THE LAR MODEL INTO AN HPC OBJECT
apartment = COMP([STRUCT,MKPOLS])(apartment)



# BUILDING FLOORS MADE BY APPARTMENTS
longSideApartments = STRUCT([apartment, S([2])([-1])(apartment)])
shortSideApartments = S([2])([-1])(T([1, 2])([0, -(apart_lenght-apart_width+0.1)])(R([1, 2])(PI/2)(apartment)))
shortSideApartments = STRUCT([shortSideApartments, S([2])([-1])(shortSideApartments)])

buildingFloor = STRUCT([longSideApartments, shortSideApartments])
buildingFloors = STRUCT(NN(numOfFloors)([buildingFloor, T([Z])([apart_height + plan_height])]))

VIEW(buildingFloor)



# ADD GROUND-FLOOR, FLOOR-LANDINGS, ENCLOSURES, TOP-COVERING, ...
base = T([X,Y])([-apart_width, -2*(apart_lenght+0.1)])\
	(GRID([[apart_width+apart_lenght+0.1], [2*apart_width], [0.2]]))

# Inner lendings
building_landing = T([X,Y,Z])([-(apart_lenght+0.1), -(apart_lenght+0.1), apart_height-0.1])\
	(GRID([[apart_width/2], [2*(apart_width-apart_lenght)], [0.2]]))
building_landings = STRUCT( NN(numOfLandings)([building_landing, T([Z])([apart_height+0.1])]))

# Walls of the groundfloor
groundFloorWall0 = T([X,Y])([apart_lenght-0.2, -2*(apart_lenght+0.1)])\
	(GRID([[apart_perimWalls_thickness], [2*apart_width], [apart_height]]))
groundFloorWall1_1 = T([X,Y])([-(apart_width), -2*(apart_lenght+0.1)])\
	(GRID([[apart_perimWalls_thickness], [apart_width-0.5,-1,apart_width-0.5], [door_height]]))
groundFloorWall1_2 = T([X,Y])([-(apart_width), -2*(apart_lenght+0.1)])\
	(GRID([[apart_perimWalls_thickness], [apart_width, apart_width], [-door_height, apart_height-door_height]]))
groundFloorWall1 = STRUCT([groundFloorWall1_1, groundFloorWall1_2])
groundFloorWall2 = T([X,Y])([-apart_width, -2*(apart_lenght+0.1)])\
	(GRID([[apart_width+apart_lenght+0.1], [apart_perimWalls_thickness], [apart_height]]))
groundFloorWall3 = T([Y])([2*(apart_width-0.15)])\
	(groundFloorWall2)
groundFloorWalls = STRUCT([groundFloorWall0, groundFloorWall1, groundFloorWall2, groundFloorWall3])
groundFloor = STRUCT([T([Z])([0.2])(groundFloorWalls), base, T([Z])(apart_height+0.2)(base)])

# Building top covering
building_top = T([Z])([3*(apart_height+plan_height)])(base)

# Building centre facade
building_frontWall = T([X,Y])([-2*(apart_lenght+0.1), -(apart_lenght+0.1)])\
	(GRID([[0.2], [apart_width], [3*(apart_height+0.1)]]))

building0 = STRUCT([groundFloor, T(Z)(apart_height), T(Z)(0.4), buildingFloors, building_landings])
VIEW(building0)
building1 = STRUCT([building0, T(Z)(apart_height+0.4), building_frontWall])
VIEW(building1)
#building2 = STRUCT([T(Z)(0.2), building1, T(Z)(apart_height), building_top])
building2 = STRUCT([building1, T(Z)(apart_height+0.4), building_top])
VIEW(building)
building = R([X,Y])(PI)(COLOR(rgb([255,255,102]))(building2))



# CONTEXT
# Garden
garden = COLOR( rgb([34,139,34]) )(GRID([[40],[30]]))
VIEW(STRUCT([garden, T([X,Y,Z])([15,15,0.01]), building]))

# Curved path
domain1D = larDomain([32])
domain2D = larIntervals([32,48],'simplex')([1,1])
b1 = BEZIER(S1)([[25, -8], [15, -15], [20, 5], [12, -1]])
b2 = BEZIER(S1)([[25, -5], [15, -12], [20, 8], [12, 2]])
controls = [b1, b2]
mapping = BEZIER(S2)(controls)
path = T([Y])([-1])(COLOR(rgb([192,64,0]))(STRUCT(MKPOLS(larMap(mapping)(domain2D)))))

# Buinding entrance roofing
b1 = BEZIER(S1)([[0, 1.53], [1.83, 1.43], [1.39, 0.38], [3.21, 0.02]])
prof = STRUCT(MKPOLS(larMap(b1)(domain1D)))
prof = STRUCT([prof, S(1)(-1)(prof)])
roofing = OFFSET([0.1,0.1,0.1])(MAP([S3,S1,S2])(EXTRUDE([None, prof, 1])))
roofing = COLOR(rgb([102,255,102]))(S([X,Y,Z])([0.5,0.5,0.5])(T([X,Y,Z])([25,0,4])(roofing)))


VIEW(STRUCT([garden, T([X,Y,Z])([15,15,0.01]), building, path, roofing]))
