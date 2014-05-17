# EXERCISE 3

'''
Automatize the loop "merging-numbering-elimination" of blocks, 
shown in lar-cc/test/py/sysml/text04.py, providing a software 
interface where a single 3-array of blocks is mapped at the same 
time against a number of master's blocks.


Non sono sicuro di aver compreso correttamente la richiesta dell'esercizio,
ma l'interpretazione che ho deciso di avvalorare è stata quella 
per cui si richiedeva una funzione in grado di eseguire in seguenza
un numero multiplo di operazioni di merge e remove riuscendo a tenere conto
delle forti ripercussioni che queste operazioni hanno sullo stato della 
corrispondenza tra celle ed indici durante lo stesso processo di trasformazione.
'''


'''
Removes the cells in 'cellsToRemove' from the given 'diagram' 
and returns the resulting diagram. 
'''
def removeCellsFromDiagram(diagram, cellsToRemove):
	V,CV = diagram
	return V,[cell for k,cell in enumerate(CV) if not (k in cellsToRemove)]

'''
Executes the merge of a list of diagrams against 
a master's cells list in one time.
'''
def mergeDiagramsWithCells(master,diagrams,toMerge):
	V,CV = master
	for i in range(len(CV))[::-1]:
		if i in toMerge:
			k = toMerge.index(i)
			master = diagram2cell(diagrams[k],master,toMerge[k])
	return master

'''
Automatizes the loop "merging-numbering-elimination" of blocks. '''
def mergeAndRemoveCells(diagrams, cellsToMerge, cellsToRemove, master):
	# Se uno tra cellsToMerge e cellsToRemove è vuoto 
	# allora non ci sono conflitti reciproci. Inoltre
	# diagrams e cellsToMerge sono in corrispondenza 1:1
	# quindi devono avere lo stesso numero di elementi:
	if(cellsToMerge and cellsToRemove and (len(diagrams) == len(cellsToMerge))):
		# Do la priorità alle operazioni di remove e 
		# calcolo le conseguenze sulle numerazioni 
		# delle celle per i successivi merge:
		# per ogni elemento in cellsToRemove minore di 
		# un qualche elemento in cellsToMerge, decremento 
		# quell'elemento in cellsToMerge (anticipo così le 
		# ripercussioni che avranno le rimozioni sulla numerazione 
		# delle celle da mappare)
		for i in range(len(cellsToMerge)):
			for j in cellsToRemove:
				if (j < cellsToMerge[i]):
					cellsToMerge[i] -= 1
	# A questo punto si possono effettuare i remove ed i merge
	# "in maniera sicura", ovvero mantenendo le originali corrispondenze 
	# di numerazione:
	master = removeCellsFromDiagram(master, cellsToRemove)
	master = mergeDiagramsWithCells(master, diagrams, cellsToMerge)
	return master