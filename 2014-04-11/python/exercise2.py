#EXERCISE 2

from exercise1 import *

#Walls
glass = MATERIAL([1,1,1,0.1,  0,0,0.8,0.5,  1,1,1,0.1,  1,1,1,0.1,  100])(GRID([[0],[0.5*s],[1*s]]))
support0 = GRID([[-0.001*s,0.01],[0.5*s],[-0.3*s,0.01*s]])
support1 = GRID([[-0.001*s,0.01],[-0.25*s,0.01*s],[0.3*s]])
support2 = GRID([[-0.001*s,0.01],[0.01*s],[1*s]])
support3 = GRID([[-0.001*s,0.01],[-0.5*s,0.01*s],[1*s]])
support4 = GRID([[-0.001*s,0.01],[0.5*s],[0.01*s]])
support5 = GRID([[-0.001*s,0.01],[(0.5+0.01)*s],[-1*s,0.01*s]])
support = COLOR([128./255,128./255,128./255])( STRUCT([support0,support1,support2,support3,support4,support5]) )
window = STRUCT([glass,support])
windowRow = STRUCT( NN(14)( [window,T([2])([0.5*s])] ) )
#north wall
north = T([1,2])([2*s,(0.5*15+1.5)*s])(R([1,2])(PI)(windowRow))
#south wall
south = T([1,2])([(2+7)*s,2*s])(windowRow)
#east wall
east = T([1,2])([2*s,2*s])(R([1,2])(-PI/2)(windowRow))
#west wall
west = T([1,2])([(14*0.5+2)*s,(14*0.5+2)*s])(R([1,2])(PI/2)(windowRow))
#walls
walls = STRUCT([north,south,east,west])

# Volume tetto
roofSideA = GRID([[-1*s,-0.025*s,(0.5*18+0.1-0.05)*s],[-1*s,-0.025,0.01*s],[-1*s,-0.008,0.385*s]])
roofSideB = GRID([[-1*s,-0.025*s,0.01*s],[-1*s,-0.025,0,(0.5*18+0.1-0.05)*s],[-1*s,-0.008,0.385*s]])
roofSideA_row = STRUCT( NN(19)( [roofSideA,T([2])([0.5*s])] ) )
roofSideB_row = STRUCT( NN(19)( [roofSideB,T([1])([0.5*s])] ) )
roofMiddlePlane = COLOR([147./255,147./255,147./255])( STRUCT([roofSideA_row,roofSideB_row]) )
#complete roof
roof = STRUCT([grid,roofMiddlePlane,roofTopPlane])

# 3D building model
building3D = STRUCT([floor,pillarsXY,walls,roof])
VIEW(building3D)

