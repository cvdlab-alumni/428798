#EXERCISE 4

from exercise3 import *

def coneTree(h):
	trunk = COLOR([192./255, 64./255, 0./255])(CYLINDER([h/16., h/5.])(36))
	hair = COLOR([34./255, 139./255, 34./255])(CONE([h/4., 5*h/5.])(36))
	base = COLOR([150./255, 75./255, 0./255])(T([1,2])([-h/8.,-h/8.])(GRID([[h/4.],[h/4.]])))
	tree = STRUCT([trunk, T(3)(h/5.)(hair), base])
	return tree

def ballTree(h):
	trunk = COLOR([192./255, 64./255, 0./255])(CYLINDER([h/16., 2*h/3.])(36))
	hair = COLOR([34./255, 139./255, 34./255])(SPHERE(h/3.)([36,36]))
	base = COLOR([150./255, 75./255, 0./255])(T([1,2])([-h/8.,-h/8.])(GRID([[h/4.],[h/4.]])))
	tree = STRUCT([trunk, T(3)(4/5.*h)(hair),base])
	return tree

def littleLamp(h):
	pole = COLOR([0./255, 49./255, 83./255])(CYLINDER([h/35., 2*h/3.])(36))
	lamp = COLOR(YELLOW)(SPHERE(h/8.)([36,36]))
	lttLamp = STRUCT([pole, T(3)(2*h/3.)(lamp)])
	return lttLamp

def bench():
	bench0 = GRID([[-0.03,0.1],[-0.03,0.5],[-0.07,0.03]])
	bench1 = GRID([[0.03],[0.5+0.03*2],[0.13]])
	bench2 = GRID([[-0.1,0.03],[0.5+0.03*2],[0.07]])
	bench3 = GRID([[0.03],[0.5+0.03*2],[-0.13,0.07]])
	bench4 = STRUCT( NN(2)([GRID([[-0.03,0.1],[0.03],[-0.07,0.07]]), T(2)(0.5+0.03)]) )
	return COLOR([245./255, 222./255, 179./255])(STRUCT([bench0, bench1, bench2, bench3, bench4]))

# LAMPIONCINI
lamps0 = STRUCT(NN(4)([littleLamp(0.5), T(1)(3/4.)]))
lamps = T([1,2])([26.35+0.5,20.85+0.35])(STRUCT(NN(2)([lamps0, T(2)(2.3)])))

# ALBERI SFERA
treeB1 = T([1,2,3])([8,8,0.09])(ballTree(1))
treeB2 = T([1,2])([8,14.5,0.09])(ballTree(1))
treeB3 = T([1,2])([8,22.5,0.09])(ballTree(1))
treeB4 = T([1,2])([8,30,0.09])(ballTree(1))
treeB5 = T([1,2])([8,36,0.09])(ballTree(1))
treeBB0 = STRUCT([treeB1, treeB2, treeB3, treeB4, treeB5])
treeBB1 = STRUCT(NN(2)([treeBB0, T([1,3])([6.5,0.09])]))
treeBB2 = STRUCT(NN(2)([STRUCT([treeB1, treeB2, treeB4, treeB5]), T([1,3])([14.5,0.09])]))
treeBB3 = STRUCT(NN(2)([treeBB0, T([1,3])([22,0.09])]))
treeBB4 = STRUCT(NN(2)([treeBB0, T([1,3])([28,0.09])]))
treesB = STRUCT([treeBB1, treeBB2, treeBB3, treeBB4])

# ABETI GIARDINO
treeA1 = T([1,2,3])([17,17,0.02])(coneTree(1))
treeA2 = T([1,2,3])([18,21,0.02])(coneTree(1.2))
treeA3 = T([1,2,3])([16,20,0.02])(coneTree(0.7))
treeA4 = T([1,2,3])([27,20,0.02])(coneTree(0.8))
treeA5 = T([1,2,3])([28,17,0.02])(coneTree(1.5))
treeA6 = T([1,2,3])([24,17,0.02])(coneTree(0.5))
treeA7 = T([1,2,3])([17,27,0.02])(coneTree(1))
treeA8 = T([1,2,3])([18,28,0.02])(coneTree(1.1))
treeA9 = T([1,2,3])([16,24,0.02])(coneTree(0.9))
treeA10 = T([1,2,3])([27,27,0.02])(coneTree(1))
treeA11 = T([1,2,3])([27,25,0.02])(coneTree(0.8))
treeA12 = T([1,2,3])([24,27,0.02])(coneTree(1.25))
treesA = STRUCT([treeA1,treeA2,treeA3,treeA4,treeA5,treeA6,treeA7,treeA8,treeA9,treeA10,treeA11,treeA12])

# PANCHINE
ben0 = T([1,2])([18,16])(STRUCT(NN(3)([T(1)(0.03*2+0.5)(R([1,2])(PI/2)(bench())), T([1])(4)])))
ben1 = T([1,2])([18,29])(STRUCT(NN(3)([T(1)(0.03*2+0.5)(R([1,2])(-PI/2)(bench())), T([1])(4)])))
ben2 = T([1,2])([28.7,18])(STRUCT(NN(2)([T([1,2])([0.03*2+0.1,0.5+2*0.03])(R([1,2])(PI)(bench())), T([2])(8)])))
ben3 = T([1,2,3])([26,19,0.5])(STRUCT(NN(2)([T([1,2])([0.03*2+0.1,0.5+2*0.03])(R([1,2])(PI)(bench())), T([2])(6)])))
benches = STRUCT([ben0, ben1, ben2, ben3])

# ASSEMBLY
urban5 = STRUCT([urban4,lamps, treesA, treesB, benches])
VIEW(urban5)