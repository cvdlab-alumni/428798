#EXERCISE 4

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

#Base
b0 = CUBOID([7,8,0.5])
b1 = T([1])([7])(CUBOID([1,2,0.5]))
b2 = T([1,2])([7,6])(CUBOID([1,2,0.5]))
base = STRUCT([b0,b1,b2])

steps = T([1,2])([8,6])(R([1,2])(PI)(stairs(8,0.45,4,0.025,1.0)))

mount = COLOR([228./255,229./255,224./255])( STRUCT([base,steps]) )

VIEW(STRUCT([mount,T([1,2,3])([0.3,0.7,0.5])(building3D)]))