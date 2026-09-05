import * as T from 'three';
/** The stable entity ID is the sole bridge from raycast to state. */
export function createEntityCollider(entityId:string,width:number,height:number){
 const collider=new T.Mesh(new T.PlaneGeometry(width,height),new T.MeshBasicMaterial({visible:false}));
 collider.position.set(0,1.15,1.98);collider.userData={interactive:true,entityId};return collider;
}
export function pickEntity(raycaster:T.Raycaster,colliders:T.Mesh[]):string|null{return raycaster.intersectObjects(colliders,false)[0]?.object.userData.entityId??null;}
