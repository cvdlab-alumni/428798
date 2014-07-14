
function loadOBJModel(modelFile) {
  var path = modelsPath + modelFile;
  
  var loader = new THREE.OBJLoader();
  loader.load(path, function (obj) {
    var material = new THREE.MeshLambertMaterial({color: 0xEEEEEE, shading: THREE.FlatShading, side: THREE.DoubleSide});

    obj.traverse(function (child) {
      if (child instanceof THREE.Mesh) {
        child.material = material;
      }
    });

    dwelling.add(obj);
  });
}


/*
parentObj:  the object that loaded objects will be added to.
list:       is of type
              [
                ['object_name1', [func_1, ..., func_N]],
                ...
                ['object_name2', [func_1, ..., func_M]]
              ]
            where
              - each func_I is a function producing a side-effect on its input
              - each [func_1, ..., func_K] is optional.
*/
function loadOBJMTLModels(parentObj, list) {
  for (var i = 0; i < list.length; i++) {
    var item = list[i];

    var object_url = item[0];
    var object_funcList = item[1];
    loadOBJMTLModel(parentObj, object_url, object_funcList);
  }
}


function loadOBJMTLModel(parentObj, object_url, object_funcList) {
  var loader = new THREE.OBJMTLLoader();

  loader.addEventListener('load', function (event) {
    var object = event.content;
    
    if(object_funcList) {
      for (var i = 0; i < object_funcList.length; i++) {
        var func = object_funcList[i];
        func(object);
      }
    }

    parentObj.add(object);
  })

  loader.load(
    modelsPath + object_url + '.obj', 
    modelsPath + object_url + '.mtl', 
    {side: THREE.DoubleSide}
  );
}

