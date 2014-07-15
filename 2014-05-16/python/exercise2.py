# EXERCISE 2

from exercise1 import *


'''	------------ MESURES AND UTILITY------------- '''
X = 1
Y = 2
Z = 3

building_X = aprtmt_X + aprtmt_Y
building_Y = 2*aprtmt_Y
building_Z = floor_Z + 4*aprtmt_Z
roof_Z = 3

landing_X = aprtmt_Y/4
landing_Y = 2*(aprtmt_Y - aprtmt_X)
landing_Z = floor_Z


''' Funzione GRID '''
GRID = COMP([INSR(PROD),AA(QUOTE)])


''' Funzione che mi permette di inserire i colori in RGB con range [0,255] '''
def RGB(color):
	return [color[0]/255., color[1]/255., color[2]/255.]


def createBalcony(numStakes_X, numStakes_Y, distStakes):
	balc_stake_X = 0.05
	balc_stake_Y = balc_stake_X
	balc_stake_Z = 1
	balcony_X = (balc_stake_X + distStakes) * numStakes_X + balc_stake_X
	balcony_Y = (balc_stake_Y + distStakes) * numStakes_Y + balc_stake_Y
	balcony_Z = 2*floor_Z
	balc_base = T(3)(-balcony_Z/2)(CUBOID([balcony_X,balcony_Y,balcony_Z]))
	balc_stake = CUBOID([balc_stake_X,balc_stake_Y,balc_stake_Z])
	balc_stakes_X = STRUCT(NN(numStakes_X)([balc_stake, T(1)(distStakes+balc_stake_X)]))
	balc_stakes_X = STRUCT(NN(2)([balc_stakes_X, T(2)(balcony_Y-balc_stake_Y)]))
	balc_stakes_Y = STRUCT(NN(numStakes_Y)([balc_stake, T(2)(distStakes+balc_stake_Y)]))
	balc_stakes = STRUCT([balc_stakes_X, balc_stakes_Y])
	balc_stakes_top_X = CUBOID([balcony_X, balc_stake_Y, balc_stake_Y])
	balc_stakes_top_X = STRUCT(NN(2)([balc_stakes_top_X, T(2)(balcony_Y-balc_stake_Y)]))
	balc_stakes_top_Y = CUBOID([balc_stake_X, balcony_Y, balc_stake_X])
	balc_stakes_tops = STRUCT([balc_stakes_top_X, balc_stakes_top_Y])
	balcony = STRUCT([balc_base, T(3)(balcony_Z/2), balc_stakes, T(3)(balc_stake_Z), balc_stakes_tops])
	return balcony, balcony_X, balcony_Y

'''
steps_num:	numero gradini
height:		altezza totale scala
breadth:	larghezza gradino
h_sol:		altezza solaio
proj:		proiezione scala su piano 2D
'''
def stairs(steps_num, height, breadth, h_sol, proj):
	a = (height + h_sol)/steps_num	## misura dell'alzata
	p = proj / steps_num			## pedata del gradino
	step2D = MKPOL([[[0, 0], [0, h_sol + a], [p, a], [p, h_sol + a]], [[1, 2, 3, 4]], None])
	step3D = MAP([S1, S3, S2])(PROD([step2D, Q(breadth)]))
	ramp = STRUCT(NN(steps_num)([step3D, T([1,3])([p, a])]))
	return ramp


GLASS2 = [0.1,0.2,0.47,1,  0,0,0,0.48,  2,2,2,1,  0,0,0,1,  50]
RED_VIOLET = RGB([199, 21, 133])
GREEN = RGB([34, 139, 34])



'''	------------ BUILDING DEFINITION ------------- '''
# ADDING BALCONY TO THE APARTMENT
balcony1, balcony1_X, balcony1_Y = createBalcony(4, 26, 0.2)
balcony1 = T([1,2])([aprtmt_X + balcony1_X, 0.5])(S([1])([-1])(balcony1))

balcony2, balcony2_X, balcony2_Y = createBalcony(4, 20, 0.2)
balcony2 = T([1,2])([(aprtmt_X - balcony2_Y)/2, aprtmt_Y + balcony2_X])(R([1,2])(-PI/2)(balcony2))

apartment = STRUCT([apartment, balcony1, balcony2])
VIEW(apartment)

# BUILDING FLOORS MADE BY APPARTMENTS
apartments_Y = STRUCT([apartment, S([2])([-1])(apartment)])
apartments_X = S([2])([-1])(T([1, 2])([0, -(aprtmt_X-aprtmt_Y)])(R([1, 2])(PI/2)(apartment)))
apartments_X = STRUCT([apartments_X, S([2])([-1])(apartments_X)])

apartments = R([1,2])(PI)(STRUCT([apartments_Y, apartments_X]))
VIEW(apartments)

apartments = T([Z])([floor_Z + aprtmt_Z])(apartments)
floors = STRUCT(NN(3)([apartments, T([Z])([aprtmt_Z])]))
#VIEW(floors)


# GROUNDFLOOR
base = T([X,Y])([-aprtmt_X, -2*(aprtmt_X)]) (GRID([[aprtmt_X + aprtmt_Y], [aprtmt_Y*2], [floor_Z]]))
groundFloorWall0 = T([X,Y])([-aprtmt_X, -aprtmt_X*2]) (GRID([[perimWalls_thickness], [aprtmt_Y*2], [aprtmt_Z]]))
groundFloorWall1_1 = GRID([[perimWalls_thickness], [aprtmt_Y-0.5, -1, aprtmt_Y-0.5], [door_default_height]])
groundFloorWall1_2 = GRID([[perimWalls_thickness], [aprtmt_Y, aprtmt_Y], [-door_default_height, aprtmt_Z - door_default_height]])
groundFloorWall1 = T([X,Y])([aprtmt_Y - perimWalls_thickness, -aprtmt_X*2]) (STRUCT([groundFloorWall1_1, groundFloorWall1_2]))
groundFloorWall2 = T([X,Y])([-aprtmt_X, -aprtmt_X*2]) (GRID([[aprtmt_Y + aprtmt_X], [perimWalls_thickness], [aprtmt_Z]]))
groundFloorWall3 = T([Y])([aprtmt_Y*2 - perimWalls_thickness]) (groundFloorWall2)
groundFloorWalls = STRUCT([groundFloorWall0, groundFloorWall1, groundFloorWall2, groundFloorWall3])
groundFloor = STRUCT([T([Z])([floor_Z])(groundFloorWalls), base])

building = STRUCT([groundFloor, floors])
VIEW(building)


# FLOOR LANDINGS
landing1 = T([Y,Z])([-aprtmt_X, floor_Z + aprtmt_Z]) (GRID([[landing_X], [landing_Y], [landing_Z]]))
landing2 = T([X,Y,Z])([aprtmt_Y*3/4 - perimWalls_thickness/3, -aprtmt_X, floor_Z + aprtmt_Z*3/2])\
	(GRID([[landing_X], [landing_Y], [landing_Z]]))

landings1 = STRUCT(NN(3)([landing1, T([Z])([aprtmt_Z])]))
landings2 = STRUCT(NN(2)([landing2, T([Z])([aprtmt_Z])]))
landings = STRUCT([landings1, landings2])

building = STRUCT([building, landings])
#VIEW(building)


# STAIRS
stairs0 = stairs(10, walls_Z, landing_Y/3, landing_Z, aprtmt_Y*3/4 - landing_X)
stairs0 = T([X,Y,Z])([aprtmt_Y*3/4, -aprtmt_X + landing_Y*2/3, floor_Z]) (S([1])([-1])(stairs0))

stairsSet0 = stairs(7, (walls_Z - floor_Z)/2, landing_Y/3, landing_Z, aprtmt_Y*3/4 - landing_X - perimWalls_thickness/3)
stairsSet1 = T([X,Y,Z])([landing_X, -aprtmt_X, floor_Z + aprtmt_Z]) (stairsSet0)
stairsSet2 = T([X,Y,Z])([aprtmt_Y*3/4 - perimWalls_thickness/3, -aprtmt_X + landing_Y*2/3, floor_Z + aprtmt_Z*3/2])\
	(S([1])([-1])(stairsSet0))
stairsSet = STRUCT(NN(2)([stairsSet1, stairsSet2, T([Z])(aprtmt_Z)]))
stairsSet = STRUCT([stairs0, stairsSet])

building = STRUCT([building, stairsSet])
#VIEW(building)


# VASES
domain2D = EMBED(1)(PROD([Hpc(Grid([10*[.1]])), Hpc(Grid([30*[2*PI/30]]))]))
vase_profile = BEZIER(S1)([[0.1,0,0],[0.45,0,0.16],[0,0,0.2],[0.2,0,0.5]])
vase_mapping = ROTATIONALSURFACE(vase_profile)
vase = STRUCT([MAP(vase_mapping)(domain2D), MODEL2HPC(larDisk(0.1)([36,4]))])

vases1 = COLOR(RED)(STRUCT(NN(3)([vase, T([Y])(landing_Y/5)])))
vases1 = T([X,Y,Z])([aprtmt_Y*3/4 + landing_X*3/4, -aprtmt_X + landing_Y*3/10, floor_Z + aprtmt_Z*3/2 + landing_Z + 0.05]) (vases1)
vases2 = COLOR(RED_VIOLET)(STRUCT(NN(3)([vase, T([Y])(landing_Y/5)])))
vases2 = T([X,Y,Z])([aprtmt_Y*3/4 + landing_X*3/4, -aprtmt_X + landing_Y*3/10, floor_Z + aprtmt_Z*5/2 + landing_Z + 0.05]) (vases2)
vases = STRUCT([vases1, vases2])

building = STRUCT([building, vases]) 
VIEW(building)


# GLASS FACADE
domain2D = larDomain([48,48])
p1 = [aprtmt_Y, -aprtmt_X, floor_Z + aprtmt_Z*3]
pm1 = [aprtmt_Y, -aprtmt_X, floor_Z + aprtmt_Z*4]
p2 = [aprtmt_Y - aprtmt_Z, -aprtmt_X, floor_Z + aprtmt_Z*4]
p3 = [aprtmt_Y, aprtmt_X, floor_Z + aprtmt_Z*3]
pm2 = [aprtmt_Y, aprtmt_X, floor_Z + aprtmt_Z*4]
p4 = [aprtmt_Y - aprtmt_Z, aprtmt_X, floor_Z + aprtmt_Z*4]
b1 = BEZIER(S1)([p1, pm1, pm1, p2]);
b2 = BEZIER(S1)([p3, pm2, pm2, p4]);
mapping = BEZIER(S2)([b1, b2]);

frontFacade = T([X,Y,Z])([aprtmt_Y, -aprtmt_X, floor_Z + aprtmt_Z]) (GRID([[0], [aprtmt_Y], [aprtmt_Z*2]]))
upperFacade = T([Y,Z])([-aprtmt_X, building_Z]) (GRID([[aprtmt_Y - aprtmt_Z], [aprtmt_Y], [0]]))
curvyFacade = MODEL2HPC(larMap(mapping)(domain2D));
facade = MATERIAL(GLASS2)(STRUCT([frontFacade, curvyFacade, upperFacade]))

building = STRUCT([building, facade]) 
#VIEW(building)


# ROOF
V = [
	[0, 			0, 				building_Z],	# 0
	[0, 			aprtmt_X, 		building_Z],	# 1
	[0, 			building_Y*3/4,	building_Z],	# 2
	[0, 			building_Y, 	building_Z],	# 3
	[aprtmt_X,		building_Y,		building_Z],	# 4
	[building_X, 	building_Y, 	building_Z],	# 5
	[building_X,	building_Y*3/4,	building_Z],	# 6
	[aprtmt_X,		building_Y*3/4,	building_Z],	# 7
	[aprtmt_X,		aprtmt_X,		building_Z],	# 8
	[building_X,	aprtmt_X,		building_Z],	# 9
	[building_X, 	0, 				building_Z],	# 10
	[aprtmt_X,		0,				building_Z],	# 11
	[0, 			0, 				building_Z],	# 12
	[building_X*3/4,	aprtmt_X/2,					building_Z + roof_Z],	# 13
	[aprtmt_X/2,		aprtmt_X/2,					building_Z + roof_Z],	# 14
	[aprtmt_X/2,		building_Y - aprtmt_X/2,	building_Z + roof_Z],	# 15
	[building_X*3/4,	building_Y - aprtmt_X/2,	building_Z + roof_Z]]	# 16
CV = [
	[0,11,10,13,9,8,14,12], 
	[0,1,2,3,15,7,8,14,12], 
	[3,4,5,16,6,7,15,3]]
roof = COLOR(RED_BROWN)(MODEL2HPC((V,CV)))
roof = T([X,Y])([-aprtmt_X, -aprtmt_Y])(roof)

building = STRUCT([building, roof])
VIEW(building)


'''	------------ GROUND CONTEXT ------------- '''
# GARDEN
garden = COLOR(GREEN)(GRID([[40],[30]]))


# CURVY PATH
domain2D = larIntervals([32,48],'simplex')([1,1])
b1 = BEZIER(S1)([[25, -8], [15, -15], [20, 5], [12, -1]])
b2 = BEZIER(S1)([[25, -5], [15, -12], [20, 8], [12, 2]])
controls = [b1, b2]
path_mapping = BEZIER(S2)(controls)
path = MODEL2HPC(larMap(path_mapping)(domain2D))
path = T([Y])([-1])(COLOR(MAHOGANY)(path))


'''
# BUILDING ENTRANCE ROOFING
domain1D = larDomain([32])
b1 = BEZIER(S1)([[0, 1.53], [1.83, 1.43], [1.39, 0.38], [3.21, 0.02]])
profile = STRUCT(MKPOLS(larMap(b1)(domain1D)))
profile = STRUCT([profile, S(1)(-1)(profile)])
roofing = OFFSET([0.1,0.1,0.1])(MAP([S3,S1,S2])(EXTRUDE([None, profile, 1.5])))
roofing = COLOR(BROWN)( S([X,Y,Z])([0.5,0.5,0.5])(T([X,Y,Z])([25,0,3.3])(roofing)) )
'''

building = STRUCT([garden, T([X,Y,Z])([15,15,0.01]), building, path])
VIEW(building)
