CG - Final Project
================
Leonardo Tilomelli - 428798
-----------------------

View the project [here] (http://tilomelli.github.io/final_project/).

Code organization
================
* [Doors.js] (scripts/Doors.js): contains functions to create doors.
* [Dwelling.js] (scripts/Dwelling.js): contains function to create objects which extend the dwelling structure (e.g.: balconies, landing).
* [FPSAnimation.js] (scripts/FPSAnimation.js): is the code used to switch between trackball system and PointerLock.
* [Furniture.js] (scripts/Furniture.js): loads and processes until the animation assignment all the models to import. 
* [ImportUtilities.js] (scripts/ImportUtilities.js): provides functions for the import of .obj and .obj-.mtl models.
* [Init.js] (scripts/Init.js): initializes all the variables, creates the dwelling and takes care of the rendering.
* [Lamps.js] (scripts/Lamps.js): contains functions to create lamps and lighting system.
* [ObjectAnimations.js] (scripts/ObjectAnimations.js): contains all the animation assignement functions.
* [ParticlesEffects.js] (scripts/ParticlesEffects.js): creates effects using particle system.
* [SceneContext.js] (scripts/SceneContext.js): aggregates anything enriching the scene context (e.g.: skybox).
* [TextureUtilities.js] (scripts/TextureUtilities.js): provides utilities for the creation of textured meshes.
* [VideoInit.js] (scripts/VideoInit.js): video definitions.
* [WallsFloorings.js] (scripts/WallsFloorings.js): is where all the textured planes are created.
* [Windows.js] (scripts/Windows.js): contains functions to create windows.

Features and Graphic Techniques:
==================
* Bump map and normal map
* Textures
* Tween animations
* .obj and .obj/.mtl models import
* Skybox
* PointerLockControl
* FPSControl
* Object-Picking
* Particle System
* Dynamic video texture
* WebRTC WebCam
* Audio distance fade
* Sound effects

Animations:
==================
* Doors and handles: open/close (with sound effect)
* Windows and handles: open/close
* Picture frame: make it hang
* Television: turn it on/off (with sound fade)
* TV remote control: turn television on (if it's off) or change channel (if it's on)
* Cooker: light the fires
* Clock: pick it to see what's the current time
* Toilet cover: pull it up or push it down
* Toilet flushing button: push it and stare at the flush (with sound effect)
* Mirror: if enabled you can keep an eye behind
* Computer monitor: Windows XP startup + webcam (with sound)
* Light switches: switch up/down and make lamps light on/off (with sound)