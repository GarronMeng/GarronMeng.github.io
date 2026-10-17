import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from 'three';
import {createVisualFixture} from '../src/state/fixture';
import {roomFactory} from '../src/render/room';
import {materials} from '../src/render/materials';

function meshCount(root:T.Object3D){let count=0;root.traverse(node=>{if(node instanceof T.Mesh)count++;});return count;}

test('Regency suite renders distinct sleep, lounge and bath furnishing with its own palette',()=>{
 const state=createVisualFixture(3);
 const suite=Object.values(state.entities).find(e=>e.kind==='room'&&e.type==='suite');
 const standard=Object.values(state.entities).find(e=>e.kind==='room'&&e.type==='king');
 assert.ok(suite&&suite.kind==='room');
 assert.ok(standard&&standard.kind==='room');
 const suiteScene=roomFactory(suite);
 const standardScene=roomFactory(standard);
 const suiteMaterials=new Set<T.Material>();
 suiteScene.traverse(node=>{if(node instanceof T.Mesh){const list=Array.isArray(node.material)?node.material:[node.material];list.forEach(material=>suiteMaterials.add(material));}});
 assert.ok(meshCount(suiteScene)>meshCount(standardScene)+35,'suite should contain meaningful lounge and bath detail');
 assert.ok(suiteMaterials.has(materials.suiteLinen),'suite linen palette should be applied');
 assert.ok(suiteMaterials.has(materials.suiteGlass),'bath glazing should be present');
 assert.ok(suiteMaterials.has(materials.suiteBrass),'brass trim should be present');
 suiteScene.traverse(node=>{if(node instanceof T.Mesh)assert.ok(node.geometry instanceof T.BufferGeometry);});
});
