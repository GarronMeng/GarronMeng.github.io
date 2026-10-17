import * as T from 'three';
/** The stable entity ID is the sole bridge from raycast to state. */
export function createEntityCollider(entityId:string,width:number,height:number){
 const collider=new T.Mesh(new T.PlaneGeometry(width,height),new T.MeshBasicMaterial({visible:false}));
 collider.position.set(0,1.15,1.98);collider.userData={interactive:true,entityId};return collider;
}
export function pickEntity(raycaster:T.Raycaster,colliders:T.Mesh[]):string|null{return raycaster.intersectObjects(colliders,false)[0]?.object.userData.entityId??null;}
/** Full-volume picking for the elevated local view; never interferes with overview planes. */
export function createInspectionCollider(entityId:string){const collider=new T.Mesh(new T.BoxGeometry(4.7,2.38,3.1),new T.MeshBasicMaterial({visible:false}));collider.position.y=1.25;collider.userData={interactive:true,entityId};collider.layers.set(1);return collider;}
