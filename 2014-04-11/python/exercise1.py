#EXERCISE 1

from pyplasm import *

GRID = COMP([INSR(PROD),AA(QUOTE)])

#scale factor
s = 0.6

#floor
floorBase = COLOR([205./255,133./255,63./255])( GRID([[-2*s,7*s],[-2*s,7*s],[-0.001*s,0]]) )
floorGrid0 = COLOR(BLACK)(STRUCT(NN(11)([Q(7*s),T([1,2])([0,7*s/10])])))
floorGrid1 = T([1,2])([7*s,0])(R([1,2])(PI/2)(floorGrid0))
floorGrid = T([1,2,3])([2*s,2*s,0.003])(STRUCT([floorGrid0,floorGrid1]))
floor = STRUCT([floorBase,floorGrid])

#pillars on (X,Y)
pillar0XY = GRID([[-0.035*s,0.03*s],[0.1*s]])
pillar1XY = GRID([[0.1*s],[-0.035*s,0.03*s]])
pillarXY = STRUCT([pillar0XY,pillar1XY])
pillarsEastXY = T([1,2])([(2+0.5*3)*s,1*s])(STRUCT(NN(2)([pillarXY,T([1])([8*0.5*s])])))
pillarsWestXY = T(2)(0.5*18*s)(pillarsEastXY)
pillarsNorthXY = T([1,2])([1*s,(1+3*0.8+0.1)*s])(STRUCT(NN(2)([pillarXY,T([2])([8*0.5*s])])))
pillarsSouthXY = T(1)(0.5*18*s)(pillarsNorthXY)
pillarsXY = COLOR([147./255,147./255,147./255]) ( STRUCT([pillarsEastXY,pillarsWestXY,pillarsNorthXY,pillarsSouthXY]) )
#Volume pillars
pillarsXY = EXTRUDE([None, pillarsXY, (1+0.008)*s])

#grid: the lower grid of the roof
lintel0 = GRID([[0.5*18*s],[0.1*s],[-1*s,-0.01*s,0.01*s]])
lintel1 = GRID([[0.1*s],[(0.5*18+0.1)*s],[-1*s,-0.01*s,0.01*s]])
grid0 = T([1,2])([1*s,1*s])( STRUCT(NN(19)([lintel0,T([2])([0.5*s])])) )
grid1 = T([1,2])([1*s,1*s])( STRUCT(NN(19)([lintel1,T([1])([0.5*s])])) )
grid = COLOR([147./255,147./255,147./255])( STRUCT([grid0,grid1]) )
#roof top surface
roofTopPlane = COLOR([147./255,147./255,147./255])( GRID([[-1*s,(0.5*18+0.1)*s],[-1*s,(0.5*18+0.1)*s],[-1*s,-0.4*s,0.01*s]]) )

#building
building = STRUCT([floor,pillarsXY,grid,roofTopPlane])
VIEW(building)