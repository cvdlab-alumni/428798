
function mkInnerTexturedWalls() {
	var walls = new THREE.Object3D();

	// x = 5.9
	var livingroom_northWall_pList = [[4.2033898, 0.1], [3.6168703, 0.1], [3.6168703, 2.1], [0.8797793, 2.1], [0.8797793, 0.1], [0.2932598, 0.1], [0.2932598, 2.6], [4.2033898, 2.6], [4.2033898, 0.1]]
	// y = 0.2932598
	//var livingroom_eastWall_pList = [[5.9, 0.1], [0.3, 0.1], [0.3, 2.6], [5.9, 2.6], [5.9, 0.1]]
	var livingroom_eastWall_pList = [[1.8, 0.1], [5.9, 0.1], [5.9, 2.6], [1.8, 2.6], [1.8, 0.1]]
	// y = 4.2033898
	var livingroom_westWall_pList = [[1.8-0.05/4, 0.1], [5.9, 0.1], [5.9, 2.6], [1.8-0.05/4, 2.6], [1.8-0.05/4, 0.1]]

	// x = 1.8
	var hallway_northWall_pList = [[9.6677967, 0.1], [8.9847458, 0.1], [8.9847458, 2.1], [8.2491526, 2.1], [8.2491526, 0.1], [6.2525424, 0.1], [6.2525424, 2.1], [5.5169491, 2.1], [5.5169491, 0.1], [4.2033898-0.05/4, 0.1], [4.2033898-0.05/4, 2.6], [9.6677967, 2.6], [9.6677967, 0.1]]
	// x = 0.3
	var hallway_southWall_pList = [[0.2932598, 0.1], [0.5865196, 0.1], [0.5865196, 2.1], [1.2707923, 2.1], [1.2707923, 0.1], [9.6677967, 0.1], [9.6677967, 2.6], [0.2932598, 2.6], [0.2932598, 0.1]]
	// y = 0.2932598
	var hallway_eastWall_pList = [[0.3, 0.1], [1.8, 0.1], [1.8, 2.6], [0.3, 2.6], [0.3, 0.1]]
	// y = 9.6677967
	var hallway_westWall_pList = [[0.3, 0.1], [0.7, 0.1], [0.7, 2.1], [1.4, 2.1], [1.4, 0.1], [1.8, 0.1], [1.8, 2.6], [0.3, 2.6], [0.3, 0.1]]

	// x = 5.9
	var kitchen_northWall_pList = [[7.461017, 0.1], [6.620339, 0.1], [6.620339, 2.1], [5.1491525, 2.1], [5.1491525, 0.1], [4.3084745, 0.1], [4.3084745, 2.6], [7.461017, 2.6], [7.461017, 0.1]]
	var kitchen_northWall2a_pList = [[5.1491525, 0.1], [4.3084745, 0.1], [4.3084745, 1.9], [5.1491525, 1.9], [5.1491525, 0.1]]
	var kitchen_northWall2b_pList = [[7.461017, 0.1], [6.620339, 0.1], [6.620339, 1.9], [7.461017, 1.9], [7.461017, 0.1]]
	// x = 1.9
	var kitchen_southWall_pList = [[4.3084745, 0.1], [5.5169491, 0.1], [5.5169491, 2.1], [6.2525424, 2.1], [6.2525424, 0.1], [7.461017, 0.1], [7.461017, 2.6], [4.3084745, 2.6], [4.3084745, 0.1]]
	var kitchen_southWall2a_pList = [[4.3084745, 0.1], [5.5169491, 0.1], [5.5169491, 1.9], [4.3084745, 1.9], [4.3084745, 0.1]]
	var kitchen_southWall2b_pList = [[6.2525424, 0.1], [7.461017, 0.1], [7.461017, 1.9], [6.2525424, 1.9], [6.2525424, 0.1]]
	// y = 4.3084745
	var kitchen_eastWall_pList = [[5.9, 0.1], [1.9, 0.1], [1.9, 2.6], [5.9, 2.6], [5.9, 0.1]]
	var kitchen_eastWall2_pList = [[5.9, 0.1], [1.9, 0.1], [1.9, 1.9], [5.9, 1.9], [5.9, 0.1]]
	// y = 7.461017
	var kitchen_westWall_pList = [[1.9, 0.1], [5.9, 0.1], [5.9, 2.6], [1.9, 2.6], [1.9, 0.1]]
	var kitchen_westWall2_pList = [[1.9, 0.1], [5.9, 0.1], [5.9, 1.9], [1.9, 1.9], [1.9, 0.1]]

	// x = 5.9
	var bathroom_northWall_pList = [[9.6677967, 0.1], [7.5661017, 0.1], [7.5661017, 2.6], [9.6677967, 2.6], [9.6677967, 0.1]]
	var bathroom_northWall_windowHole_pList = [[9.3525424, 1.05], [9.3525424, 2.1], [7.8813559, 2.1], [7.8813559, 1.05], [9.3525424, 1.05]]
	var bathroom_northWall2_pList = [[9.6677967, 0.1], [7.5661017, 0.1], [7.5661017, 1.9], [7.8813559, 1.9], [7.8813559, 1.05], [9.3525424, 1.05], [9.3525424, 1.9], [9.6677967, 1.9], [9.6677967, 0.1]]
	// x = 1.9
	var bathroom_southWall_pList = [[7.5661017, 0.1], [8.2491526, 0.1], [8.2491526, 2.1], [8.9847458, 2.1], [8.9847458, 0.1], [9.6677967, 0.1], [9.6677967, 2.6], [7.5661017, 2.6], [7.5661017, 0.1]]
	var bathroom_southWall2a_pList = [[7.5661017, 0.1], [8.2491526, 0.1], [8.2491526, 1.9], [7.5661017, 1.9], [7.5661017, 0.1]]
	var bathroom_southWall2b_pList = [[8.9847458, 0.1], [9.6677967, 0.1], [9.6677967, 1.9], [8.9847458, 1.9], [8.9847458, 0.1]]
	// y = 7.5661017
	var bathroom_eastWall_pList = [[1.9, 0.1], [5.9, 0.1], [5.9, 2.6], [1.9, 2.6], [1.9, 0.1]]
	var bathroom_eastWall2_pList = [[1.9, 0.1], [5.9, 0.1], [5.9, 1.9], [1.9, 1.9], [1.9, 0.1]]
	// y = 9.6677967
	var bathroom_westWall_pList = [[1.9, 0.1], [5.9, 0.1], [5.9, 2.6], [1.9, 2.6], [1.9, 0.1]]
	var bathroom_westWall2_pList = [[1.9, 0.1], [5.9, 0.1], [5.9, 1.9], [1.9, 1.9], [1.9, 0.1]]

	// x = 5.9
	var bedroom_northWall_pList = [[12.118523, 0.1], [9.7728814, 0.1], [9.7728814, 2.6], [12.118523, 2.6], [12.118523, 0.1]]
	var bedroom_northWall_windowHole_pList = [[11.6024818, 1.05], [11.6024818, 2.1], [10.2889226, 2.1], [10.2889226, 1.05], [11.6024818, 1.05]]
	// x = 0.3
	var bedroom_southWall_pList = [[9.7728814, 0.1], [12.118523, 0.1], [12.118523, 2.6], [9.7728814, 2.6], [9.7728814, 0.1]]
	// y = 9.7728814
	var bedroom_eastWall_pList = [[5.9, 0.1], [1.4, 0.1], [1.4, 2.1], [0.7, 2.1], [0.7, 0.1], [0.3, 0.1], [0.3, 2.6], [5.9, 2.6], [5.9, 0.1]]
	// y = 12.118523
	var bedroom_westWall_pList = [[0.3, 0.1], [1.98, 0.1], [1.98, 2.1], [4.22, 2.1], [4.22, 0.1], [5.9, 0.1], [5.9, 2.6], [0.3, 2.6], [0.3, 0.1]]



	var hallway_southWall = mkTexturedShape("spatolato_grigio2.jpg", 0.1, 0.37, hallway_southWall_pList);
	hallway_southWall.rotation.x = Math.PI/2;
	hallway_southWall.rotation.y = Math.PI/2;
	hallway_southWall.position.x = 0.3 + 0.05/4;

	var bedroom_southWall = mkTexturedShape("spatolato_pesca.jpg", 0.22, 0.33, bedroom_southWall_pList);
	bedroom_southWall.rotation.x = Math.PI/2;
	bedroom_southWall.rotation.y = Math.PI/2;
	bedroom_southWall.position.x = 0.3 + 0.05/4;

	var kitchen_southWall = mkTexturedShape("mint_green.jpg", 0.1, 0.1, kitchen_southWall_pList);
	addBumpMap(kitchen_southWall, "mint_green_bump.jpg", 0.2, 0.1, 0.1);
	kitchen_southWall.rotation.x = Math.PI/2;
	kitchen_southWall.rotation.y = Math.PI/2;
	kitchen_southWall.position.x = 1.9 + 0.05/8;

	var kitchen_southWall2a = mkTexturedShape("mattonelle_cucina.jpg", 2, 1.97, kitchen_southWall2a_pList);
	addBumpMap(kitchen_southWall2a, "mattonelle_cucina_bump.jpg", 0.2, 2, 1.97);
	kitchen_southWall2a.rotation.x = Math.PI/2;
	kitchen_southWall2a.rotation.y = Math.PI/2;
	kitchen_southWall2a.position.x = 1.9 + 0.05/4;

	var kitchen_southWall2b = mkTexturedShape("mattonelle_cucina.jpg", 2, 1.97, kitchen_southWall2b_pList);
	addBumpMap(kitchen_southWall2b, "mattonelle_cucina_bump.jpg", 0.2, 2, 1.97);
	kitchen_southWall2b.rotation.x = Math.PI/2;
	kitchen_southWall2b.rotation.y = Math.PI/2;
	kitchen_southWall2b.position.x = 1.9 + 0.05/4;

	var bathroom_southWall = mkTexturedShape("spatolato_grigio1.jpg", 0.2, 0.48, bathroom_southWall_pList);
	bathroom_southWall.rotation.x = Math.PI/2;
	bathroom_southWall.rotation.y = Math.PI/2;
	bathroom_southWall.position.x = 1.9 + 0.05/8;

	var bathroom_southWall2a = mkTexturedShape("piastrelle_pietra.jpg", 1, 1, bathroom_southWall2a_pList);
	addBumpMap(bathroom_southWall2a, "piastrelle_pietra_bump.jpg", 0.2, 1, 1);
	bathroom_southWall2a.rotation.x = Math.PI/2;
	bathroom_southWall2a.rotation.y = Math.PI/2;
	bathroom_southWall2a.position.x = 1.9 + 0.05/4;

	var bathroom_southWall2b = mkTexturedShape("piastrelle_pietra.jpg", 1, 1, bathroom_southWall2b_pList);
	addBumpMap(bathroom_southWall2b, "piastrelle_pietra_bump.jpg", 0.2, 1, 1);
	bathroom_southWall2b.rotation.x = Math.PI/2;
	bathroom_southWall2b.rotation.y = Math.PI/2;
	bathroom_southWall2b.position.x = 1.9 + 0.05/4;

	var livingroom_eastWall = mkTexturedShape("spatolato_giallo.jpg", 0.15, 0.35, livingroom_eastWall_pList);
	livingroom_eastWall.rotation.x = Math.PI/2;
	livingroom_eastWall.position.y = 0.2932598 + 0.05/4;

	var hallway_eastWall = mkTexturedShape("spatolato_grigio2.jpg", 0.43, 0.37, hallway_eastWall_pList);
	hallway_eastWall.rotation.x = Math.PI/2;
	hallway_eastWall.position.y = 0.2932598 + 0.05/4;

	var kitchen_eastWall = mkTexturedShape("mint_green.jpg", 0.1, 0.1, kitchen_eastWall_pList);
	addBumpMap(kitchen_eastWall, "mint_green_bump.jpg", 0.2, 0.1, 0.1);
	kitchen_eastWall.rotation.x = Math.PI/2;
	kitchen_eastWall.position.y = 4.3084745 + 0.05/8;

	var kitchen_eastWall2 = mkTexturedShape("mattonelle_cucina.jpg", 2, 1.97, kitchen_eastWall2_pList);
	addBumpMap(kitchen_eastWall2, "mattonelle_cucina_bump.jpg", 0.2, 2, 1.97);
	kitchen_eastWall2.rotation.x = Math.PI/2;
	kitchen_eastWall2.position.y = 4.3084745 + 0.05/4;

	var bathroom_eastWall = mkTexturedShape("spatolato_grigio1.jpg", 0.1, 0.3, bathroom_eastWall_pList);
	bathroom_eastWall.rotation.x = Math.PI/2;
	bathroom_eastWall.position.y = 7.5661017 + 0.05/8;

	var bathroom_eastWall2 = mkTexturedShape("piastrelle_pietra.jpg", 1, 1, bathroom_eastWall2_pList);
	addBumpMap(bathroom_eastWall2, "piastrelle_pietra_bump.jpg", 0.2, 1, 1);
	bathroom_eastWall2.rotation.x = Math.PI/2;
	bathroom_eastWall2.position.y = 7.5661017 + 0.05/4;

	var bedroom_eastWall = mkTexturedShape("spatolato_pesca.jpg", 0.33, 0.37, bedroom_eastWall_pList);
	bedroom_eastWall.rotation.x = Math.PI/2;
	bedroom_eastWall.position.y = 9.7728814 + 0.05/4;

	var livingroom_westWall = mkTexturedShape("spatolato_giallo.jpg", 0.15, 0.35, livingroom_westWall_pList);
	livingroom_westWall.rotation.x = Math.PI/2;
	livingroom_westWall.position.y = 4.2033898 - 0.05/4;

	var kitchen_westWall = mkTexturedShape("mint_green.jpg", 0.1, 0.1, kitchen_westWall_pList);
	addBumpMap(kitchen_westWall, "mint_green_bump.jpg", 0.2, 0.1, 0.1);
	kitchen_westWall.rotation.x = Math.PI/2;
	kitchen_westWall.position.y = 7.461017 - 0.05/8;

	var kitchen_westWall2 = mkTexturedShape("mattonelle_cucina.jpg", 2, 1.97, kitchen_westWall2_pList);
	addBumpMap(kitchen_westWall2, "mattonelle_cucina_bump.jpg", 0.2, 2, 1.97);
	kitchen_westWall2.rotation.x = Math.PI/2;
	kitchen_westWall2.position.y = 7.461017 - 0.05/4;

	var bathroom_westWall = mkTexturedShape("spatolato_grigio1.jpg", 0.1, 0.3, bathroom_westWall_pList);
	bathroom_westWall.rotation.x = Math.PI/2;
	bathroom_westWall.position.y = 9.6677967 - 0.05/8;

	var bathroom_westWall2 = mkTexturedShape("piastrelle_pietra.jpg", 1, 1, bathroom_westWall2_pList);
	addBumpMap(bathroom_westWall2, "piastrelle_pietra_bump.jpg", 0.2, 1, 1);
	bathroom_westWall2.rotation.x = Math.PI/2;
	bathroom_westWall2.position.y = 9.6677967 - 0.05/4;

	var hallway_westWall = mkTexturedShape("spatolato_grigio2.jpg", 0.5, 0.35, hallway_westWall_pList);
	hallway_westWall.rotation.x = Math.PI/2;
	hallway_westWall.position.y = 9.6677967 - 0.05/4;

	var bedroom_westWall = mkTexturedShape("spatolato_pesca.jpg", 0.33, 0.37, bedroom_westWall_pList);
	bedroom_westWall.rotation.x = Math.PI/2;
	bedroom_westWall.position.y = 12.118523 - 0.05/4;

	var hallway_northWall = mkTexturedShape("spatolato_grigio2.jpg", 0.1, 0.37, hallway_northWall_pList);
	hallway_northWall.rotation.x = Math.PI/2;
	hallway_northWall.rotation.y = Math.PI/2;
	hallway_northWall.position.x = 1.8 - 0.05/4;

	var livingroom_northWall = mkTexturedShape("spatolato_giallo.jpg", 0.24, 0.35, livingroom_northWall_pList);
	livingroom_northWall.rotation.x = Math.PI/2;
	livingroom_northWall.rotation.y = Math.PI/2;
	livingroom_northWall.position.x = 5.9 - 0.05/4;

	var kitchen_northWall = mkTexturedShape("mint_green.jpg", 0.1, 0.1, kitchen_northWall_pList);
	addBumpMap(kitchen_northWall, "mint_green_bump.jpg", 0.2, 0.1, 0.1);
	kitchen_northWall.rotation.x = Math.PI/2;
	kitchen_northWall.rotation.y = Math.PI/2;
	kitchen_northWall.position.x = 5.9 - 0.05/8;

	var kitchen_northWall2a = mkTexturedShape("mattonelle_cucina.jpg", 2, 1.97, kitchen_northWall2a_pList);
	addBumpMap(kitchen_northWall2a, "mattonelle_cucina_bump.jpg", 0.2, 2, 1.97);
	kitchen_northWall2a.rotation.x = Math.PI/2;
	kitchen_northWall2a.rotation.y = Math.PI/2;
	kitchen_northWall2a.position.x = 5.9 - 0.05/4;

	var kitchen_northWall2b = mkTexturedShape("mattonelle_cucina.jpg", 2, 1.97, kitchen_northWall2b_pList);
	addBumpMap(kitchen_northWall2b, "mattonelle_cucina_bump.jpg", 0.2, 2, 1.97);
	kitchen_northWall2b.rotation.x = Math.PI/2;
	kitchen_northWall2b.rotation.y = Math.PI/2;
	kitchen_northWall2b.position.x = 5.9 - 0.05/4;

	var bathroom_northWall = mkTexturedShape("spatolato_grigio1.jpg", 0.2, 0.48, bathroom_northWall_pList, [bathroom_northWall_windowHole_pList]);
	bathroom_northWall.rotation.x = Math.PI/2;
	bathroom_northWall.rotation.y = Math.PI/2;
	bathroom_northWall.position.x = 5.9 - 0.05/8;

	var bathroom_northWall2 = mkTexturedShape("piastrelle_pietra.jpg", 1, 1, bathroom_northWall2_pList);
	addBumpMap(bathroom_northWall2, "piastrelle_pietra_bump.jpg", 0.2, 1, 1);
	bathroom_northWall2.rotation.x = Math.PI/2;
	bathroom_northWall2.rotation.y = Math.PI/2;
	bathroom_northWall2.position.x = 5.9 - 0.05/4;

	var bedroom_northWall = mkTexturedShape("spatolato_pesca.jpg", 0.22, 0.33, bedroom_northWall_pList, [bedroom_northWall_windowHole_pList]);
	bedroom_northWall.rotation.x = Math.PI/2;
	bedroom_northWall.rotation.y = Math.PI/2;
	bedroom_northWall.position.x = 5.9 - 0.05/4;	



	walls.add(hallway_southWall);
	walls.add(bedroom_southWall);
	walls.add(kitchen_southWall);
	walls.add(kitchen_southWall2a);
	walls.add(kitchen_southWall2b);
	walls.add(bathroom_southWall);
	walls.add(bathroom_southWall2a);
	walls.add(bathroom_southWall2b);

	walls.add(livingroom_eastWall);
	walls.add(hallway_eastWall);
	walls.add(kitchen_eastWall);
	walls.add(kitchen_eastWall2);
	walls.add(bathroom_eastWall);
	walls.add(bathroom_eastWall2);
	walls.add(bedroom_eastWall);

	walls.add(livingroom_westWall);
	walls.add(kitchen_westWall);
	walls.add(kitchen_westWall2);
	walls.add(bathroom_westWall);
	walls.add(bathroom_westWall2);
	walls.add(hallway_westWall);
	walls.add(bedroom_westWall);

	walls.add(hallway_northWall);
	walls.add(livingroom_northWall);
	walls.add(kitchen_northWall);
	walls.add(kitchen_northWall2a);
	walls.add(kitchen_northWall2b);
	walls.add(bathroom_northWall);
	walls.add(bathroom_northWall2);
	walls.add(bedroom_northWall);

	return walls;
}


function mkOuterTexturedWalls() {
	var walls = new THREE.Object3D();

	// x = 6.2
	var dwelling_northWall_pList = [[0.0-0.05/16, 0.0], [12.4+0.05/16, 0.0], [12.4+0.05/16, 2.6], [0.0-0.05/16, 2.6], [0.0-0.05/16, 0.0]]
	var dwelling_northWall_livingroomHole_pList = [[0.8797793, 0.1], [3.6168703, 0.1], [3.6168703, 2.1], [0.8797793, 2.1], [0.8797793, 0.1]]
	var dwelling_northWall_kitchenHole_pList = [[5.1491525, 0.1], [6.620339, 0.1], [6.620339, 2.1], [5.1491525, 2.1], [5.1491525, 0.1]]
	var dwelling_northWall_bathroomHole_pList = [[7.8813559, 1.05], [9.3525424, 1.05], [9.3525424, 2.1], [7.8813559, 2.1], [7.8813559, 1.05]]
	var dwelling_northWall_bedroomHole_pList = [[10.2889226, 1.05], [11.6024818, 1.05], [11.6024818, 2.1], [10.2889226, 2.1], [10.2889226, 1.05]]

	// x = 0.0
	var dwelling_southWall_pList = [[0.0-0.05/16, 0.0], [12.4+0.05/16, 0.0], [12.4+0.05/16, 2.6], [0.0-0.05/16, 2.6], [0.0-0.05/16, 0.0]]
	var dwelling_southWall_livingroomHole_pList = [[0.5865196, 0.1], [0.5865196, 2.1], [1.2707923, 2.1], [1.2707923, 0.1], [0.5865196, 0.1]]

	// y = 0.0
	var dwelling_eastWall_pList = [[0.0-0.05/16, 0.0], [6.2+0.05/16, 0.0], [6.2+0.05/16, 2.6], [0.0-0.05/16, 2.6], [0.0-0.05/16, 0.0]]

	// y = 12.4
	var dwelling_westWall_pList = [[6.2+0.05/16, 0.0], [0.0-0.05/16, 0.0], [0.0-0.05/16, 2.6], [6.2+0.05/16, 2.6], [6.2+0.05/16, 0.0]]
	var dwelling_westWall_bedroomHole_pList = [[4.22, 0.1], [4.22, 2.1], [1.98, 2.1], [1.98, 0.1], [4.22, 0.1]]


	var dwelling_northWall = mkTexturedShape("bricks.jpg", 1, 0.7, dwelling_northWall_pList, [
		dwelling_northWall_livingroomHole_pList, dwelling_northWall_kitchenHole_pList, 
		dwelling_northWall_bathroomHole_pList, dwelling_northWall_bedroomHole_pList]);
	dwelling_northWall.rotation.x = Math.PI/2;
	dwelling_northWall.rotation.y = Math.PI/2;
	dwelling_northWall.position.x = 6.2 + 0.05/16;

	var dwelling_southWall = mkTexturedShape("bricks.jpg", 1, 0.7, dwelling_southWall_pList, [
		dwelling_southWall_livingroomHole_pList]);
	dwelling_southWall.rotation.x = Math.PI/2;
	dwelling_southWall.rotation.y = Math.PI/2;
	dwelling_southWall.position.x = -0.05/16;

	var dwelling_eastWall = mkTexturedShape("bricks.jpg", 1, 0.7, dwelling_eastWall_pList);
	dwelling_eastWall.rotation.x = Math.PI/2;
	dwelling_eastWall.position.y = -0.05/16;

	var dwelling_westWall = mkTexturedShape("bricks.jpg", 1, 0.7, dwelling_westWall_pList, [
		dwelling_westWall_bedroomHole_pList]);
	dwelling_westWall.rotation.x = Math.PI/2;
	dwelling_westWall.position.y = 12.4 + 0.05/16;


	walls.add(dwelling_northWall);
	walls.add(dwelling_southWall);
	walls.add(dwelling_eastWall);
	walls.add(dwelling_westWall);

	return walls;
}


function mkAllFloorings() {
	var floorings = new THREE.Object3D();

	// z = 0.1
	var livingroomHallwayBedroom_floor_pList = [[0.3, 12.118523], [0.3, 0.2932598], [5.9, 0.2932598], [5.9, 4.2033898], [1.85, 4.2033898], [1.85, 9.7728814], [5.9, 9.7728814], [5.9, 12.118523], [0.3, 12.118523]]
	var kitchen_floor_pList = [[5.9, 7.461017], [1.85, 7.461017], [1.85, 4.3084745], [5.9, 4.3084745], [5.9, 7.461017]]
	var bathroom_floor_pList = [[5.9, 9.6677967], [1.85, 9.6677967], [1.85, 7.5661017], [5.9, 7.5661017], [5.9, 9.6677967]]
	var livingroom_northThreshold_pList = [[5.9, 3.6168703], [5.9, 0.8797793], [6.2, 0.8797793], [6.2, 3.6168703], [5.9, 3.6168703]]
	var livingroom_southThreshold_pList = [[0.0, 1.2707923], [0.0, 0.5865196], [0.3, 0.5865196], [0.3, 1.2707923], [0.0, 1.2707923]]
	var kitchen_threshold_pList = [[5.9, 6.620339], [5.9, 5.1491525], [6.2, 5.1491525], [6.2, 6.620339], [5.9, 6.620339]]
	var bedroom_threshold_pList = [[1.98, 12.118523], [4.22, 12.118523], [4.22, 12.4], [1.98, 12.4], [1.98, 12.118523]]


	var livingroomHallwayBedroom_floor = mkTexturedShape('parquet.jpg', 2, 1.2, livingroomHallwayBedroom_floor_pList);
	addBumpMap(livingroomHallwayBedroom_floor, "parquet_bump.jpg", 0.1, 2, 1.2);
	livingroomHallwayBedroom_floor.position.z = 0.1 + 0.05/16;

	var kitchen_floor = mkTexturedShape('piastrelle_verdi.png', 1, 1, kitchen_floor_pList);
	addBumpMap(kitchen_floor, "piastrelle_verdi_bump.png", 0.3, 1, 1);
	kitchen_floor.position.z = 0.1 + 0.05/16;

	var bathroom_floor = mkTexturedShape('pavimento_bagno.jpg', 1, 1, bathroom_floor_pList);
	addBumpMap(bathroom_floor, "pavimento_bagno_bump.jpg", 0.2, 1, 1);
	bathroom_floor.position.z = 0.1 + 0.05/16;

	var livingroom_northThreshold = mkTexturedShape('marmo.jpg', 1, 1, livingroom_northThreshold_pList);
	livingroom_northThreshold.position.z = 0.1 + 0.05/16;

	var livingroom_southThreshold = mkTexturedShape('marmo.jpg', 1, 2, livingroom_southThreshold_pList);
	livingroom_southThreshold.position.z = 0.1 + 0.05/16;

	var kitchen_threshold = mkTexturedShape('marmo.jpg', 1, 1, kitchen_threshold_pList);
	kitchen_threshold.position.z = 0.1 + 0.05/16;

	var bedroom_threshold = mkTexturedShape('marmo.jpg', 1, 1, bedroom_threshold_pList);
	bedroom_threshold.position.z = 0.1 + 0.05/16;

	floorings.add(livingroomHallwayBedroom_floor);
	floorings.add(kitchen_floor);
	floorings.add(bathroom_floor);
	floorings.add(livingroom_southThreshold);
	floorings.add(livingroom_northThreshold);
	floorings.add(kitchen_threshold);
	floorings.add(bedroom_threshold);

	return floorings;
}