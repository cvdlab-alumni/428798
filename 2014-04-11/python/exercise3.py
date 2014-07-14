#EXERCISE 3

## height:		altezza totale scala
## breadth:		larghezza gradino
## steps_num:	numero gradini
## h_sol:		altezza solaio
## proj:		proiezione scala su piano 2D
def stairs(steps_num,height,breadth,h_sol,proj):
	a = (height+h_sol)/steps_num	## misura dell'alzata
	p = proj / steps_num			## pedata del gradino
	step2D = MKPOL([ [[0,0],[0,h_sol+a],[p,a],[p,h_sol+a]], [[1,2,3,4]], None])
	step3D = MAP([S1,S3,S2])(PROD([step2D,Q(breadth)]))
	ramp = STRUCT(NN(steps_num)([step3D,T([1,3])([p,a])]))
	return ramp

def frame(length, width, height, border, col):
	a = STRUCT(NN(2)([COLOR(col)(GRID([[length+2*border],[border],[height]])), T([1,2])([0, border+width])]))
	b = STRUCT(NN(2)([COLOR(col)(GRID([[border],[width+2*border],[height]])), T([1,2])([border+length, 0])]))
	return STRUCT([a, b])

def window():
	winGlass = COLOR([171./255,205./255,239./255,0])(GRID([[0],[1],[1]]))
	winFrame = R([1,3])(PI/2)(frame(1, 1, 0.01*s, 0.005*s, WHITE))
	winSuppOrz = GRID([[0.01*s], [1], [-0.5, 0.01*s]])
	winSuppVrt = GRID([[0.01*s], [-0.5, 0.01*s], [1]])
	return STRUCT([winGlass, winFrame, winSuppOrz, winSuppVrt])

def house(numFloors, col):
	door = T([1,2])([5,2.25])(COLOR(BROWN)(GRID([[0.02],[0.5],[0.7]])))
	wins0 = STRUCT(NN(2)([window(), T([2,3])([2,0])]))
	wins1 = T([1,2,3])([5.01,1,0.5])(wins0)
	wins2 = T([1,2,3])([-0.01,4,0.5])(R([1,2])(PI)(wins0))
	wins3 = T([1,2,3])([1,-0.01,0.5])(R([1,2])(-PI/2)(wins0))
	wins4 = T([1,2,3])([4,5.01,0.5])(R([1,2])(PI/2)(wins0))
	wins = T([3])([0.75])(STRUCT([wins1, wins2, wins3, wins4]))
	floorSet = STRUCT(NN(numFloors+1)([COLOR(col)(CUBOID([5,5,2])), T([3])([1])]))
	winSet = STRUCT(NN(numFloors-1)([wins, T([3])([1.5])]))
	house = STRUCT([floorSet, winSet, door])
	return house

#Marciapiede centrale
sidewalkA0 = T([1,2])([0.2,0.2])(frame(14, 14, 0.085, 1, GRAY))
sidewalkA1 = frame(14+1*2, 14+1*2, 0.085, 0.2, WHITE)
sidewalkA2 = COLOR(GRAY)(T([1,2])([26.35,20.85])(GRID([[3],[3],[0.085]])))
sidewalkA = STRUCT([sidewalkA0,sidewalkA1])
#Marciapiedi agli angoli
sidewalkB0 = T([1,2])([1.2,1.2])(COLOR(GRAY)(GRID([[7],[7],[0.085]])))
sidewalkB1 = T([1,2])([1,1])(frame(5+1*2, 5+1*2, 0.085, 0.2, WHITE))
sidewalkB = STRUCT([sidewalkB0,sidewalkB1])
sidewalkC = STRUCT(NN(2)([sidewalkB, T([2])([7.4+2.5+7.4*2+2.5+7.4])]))
sidewalkD = STRUCT(NN(2)([sidewalkC, T([1])([7.4+2.5+7.4*2+2.5+7.4])]))
#Marcipiedi laterali
sidewalkE0 = T([1,2])([1.2,1.2])(COLOR(GRAY)(GRID([[7],[16],[0.085]])))
sidewalkE1 = T([1,2])([1,1])(frame(5+1*2, 14+1*2, 0.085, 0.2, WHITE))
sidewalkE2 = T([2])([7.4+3.5+2.25])(STRUCT([sidewalkE0,sidewalkE1]))
sidewalkE3 = STRUCT(NN(2)([sidewalkE2, T([1])([7.4+2.5+7.4*2+2.5+7.4])]))
sidewalkF0 = T([1,2])([1.2,1.2])(COLOR(GRAY)(GRID([[16],[7],[0.085]])))
sidewalkF1 = T([1,2])([1,1])(frame(14+1*2, 5+1*2, 0.085, 0.2, WHITE))
sidewalkF2 = T([1])([7.4+3.5+2.25])(STRUCT([sidewalkF0,sidewalkF1]))
sidewalkF3 = STRUCT(NN(2)([sidewalkF2, T([2])([7.4+2.5+7.4*2+2.5+7.4])]))

#Case
houseA0 = T(1)(5)(R([1,2])(PI/2)(house(5,[255./255, 255./255, 102./255])))
houseA1 = T([1,2])([2,2])(houseA0)
houseB0 = T(1)(5)(R([1,2])(PI/2)(house(2,[220./255, 220./255, 220./255])))
houseB1 = T([1,2])([16,2])(houseB0)
houseC0 = T(1)(5)(R([1,2])(PI/2)(house(4,RED)))
houseC1 = T([1,2])([24,2])(houseC0)
houseD0 = T(1)(5)(R([1,2])(PI/2)(house(3,[152./255, 255./255, 152./255])))
houseD1 = T([1,2])([37,2])(houseD0)
houseE = T([1,2])([2,16])(house(5,[255./255, 192./255, 203./255]))
houseF = T([1,2])([2,24])(house(3,[94./255, 134./255, 193./255]))
houseG = T([1,2])([2,37])(house(4,[255./255, 191./255, 0./255]))
houseH0 = T([1,2])([5,5])(R([1,2])(PI)(house(5,[244./255, 164./255, 96./255])))
houseH1 = T([1,2])([37,16])(houseH0)
houseI0 = T([1,2])([5,5])(R([1,2])(PI)(house(3,[201./255,160./255, 220./255])))
houseI1 = T([1,2])([37,24])(houseI0)
houseL0 = T([1,2])([5,5])(R([1,2])(PI)(house(2,[255./255, 255./255, 102./255])))
houseL1 = T([1,2])([37,37])(houseL0)
houseM0 = T(2)(5)(R([1,2])(-PI/2)(house(3,[173./255, 255./255, 47./255])))
houseM1 = T([1,2])([16,37])(houseM0)
houseN0 = T(2)(5)(R([1,2])(-PI/2)(house(2,[240./255, 230./255, 140./255])))
houseN1 = T([1,2])([24,37])(houseN0)
houses = STRUCT([houseA1,houseB1,houseC1,houseD1,houseE,houseF,houseG,houseH1,houseI1,houseL1,houseM1,houseN1])

#Piano dello strada
street = COLOR(BLACK)(GRID([[44],[44]]))

#Base
b0 = CUBOID([7,8,0.5])
b1 = T([1])([7])(CUBOID([1,2,0.5]))
b2 = T([1,2])([7,6])(CUBOID([1,2,0.5]))
base = STRUCT([b0,b1,b2])

#Scalinata
steps = T([1,2])([8,6])(R([1,2])(PI)(stairs(8,0.45,4,0.025,1.0)))

#Base edificio
mount = COLOR([228./255,229./255,224./255])( STRUCT([base,steps]) )

#Edificio+base
mainStructure = T([1,2])([3,3])(STRUCT([mount,T([1,2,3])([0.3,0.7,0.5])(building3D)]))

#Giardino
garden = garden = COLOR(GREEN)(GRID([[14],[14],[0]]))

#Aggiunta giardino
urban0 = STRUCT([garden, mainStructure])

#AGGIUNTA MARCIPIEDE CENTRALE
urban0 = T([1,2])([1+0.2,1+0.2])(urban0)
urban1 = STRUCT([urban0, sidewalkA])
#AGGIUNTA ALTRI MARCIAPIEDI
urban1 = T([1,2])([7.4+3.5+2.25+1,7.4+3.5+2.25+1])(urban1)
urban2 = STRUCT([urban1, sidewalkD, sidewalkE3, sidewalkF3])
#AGGIUNTA CASE
urban3 = STRUCT([urban2, houses])
#AGGIUNTA STRADA
urban3 = T(3)(0.002)(urban3)
urban4 = STRUCT([urban3, street, sidewalkA2])
VIEW(urban4)