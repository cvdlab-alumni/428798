# EXERCISE 4


from pyplasm import *
from scipy import *
import os,sys
""" import modules from larcc/lib """
sys.path.insert(0, 'lib/py/')
from lar2psm import *
from simplexn import *
from larcc import *
from largrid import *
from mapper import *
from boolean import *


""" 3D window to viewport transformation """
def diagram2cellMatrix(diagram):
   def diagramToCellMatrix0(master,cell):
      wdw = min(diagram[0]) + max(diagram[0])      # window3D
      cV = [master[0][v] for v in master[1][cell]]
      vpt = min(cV) + max(cV)                      # viewport3D
      print "\n window3D =",wdw
      print "\n viewport3D =",vpt
      
      mat = zeros((4,4))
      mat[0,0] = (vpt[3]-vpt[0])/(wdw[3]-wdw[0])
      mat[0,3] = vpt[0] - mat[0,0]*wdw[0]
      mat[1,1] = (vpt[4]-vpt[1])/(wdw[4]-wdw[1])
      mat[1,3] = vpt[1] - mat[1,1]*wdw[1]
      mat[2,2] = (vpt[5]-vpt[2])/(wdw[5]-wdw[2])
      mat[2,3] = vpt[2] - mat[2,2]*wdw[2]
      mat[3,3] = 1
      print "\n mat =",mat
      return mat
   return diagramToCellMatrix0


def diagram2cell(diagram, master, cell):
   mat = diagram2cellMatrix(diagram)(master, cell)
   diagram =larApply(mat)(diagram)  
   (V1,CV1),(V2,CV2) = master,diagram
   n1,n2 = len(V1), len(V2)
   V, CV1, CV2, n12 = vertexSieve(master, diagram)
   comRange = range(n1-n12, n1)
   newRange = range(n1, n1-n12+n2)
   def checkInclusion(V, cell, newRange):
      verts = [V[v] for v in cell]
      minVert, maxVert = min(verts), max(verts)
      cell += [v for v in newRange if (
         minVert[0] <= V[v][0] and minVert[1] <= V[v][1] and minVert[2] <= V[v][2] 
         and 
         V[v][0] <= maxVert[0] and V[v][1] <= maxVert[1] and V[v][2] <= maxVert[2] 
         )]
      return cell
   CV1 = [checkInclusion(V, c, newRange) 
         if set(c).intersection(comRange) != set() else c
          for c in CV1]
   CV = [c for k,c in enumerate(CV1) if k != cell] + CV2
   master = V, CV
   return master