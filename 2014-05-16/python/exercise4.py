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

def diagram2cell(diagram,master,cell):
	mat = diagram2cellMatrix(diagram)(master,cell)
	diagram =larApply(mat)(diagram)
	V1,CV1 = master
	CV1 = [x for y,x in enumerate(CV1) if y != cell]
	V,CV1,CV2,n12 = vertexSieve((V1,CV1),diagram)
	CV = CV1+CV2
	master = V, CV
	return master