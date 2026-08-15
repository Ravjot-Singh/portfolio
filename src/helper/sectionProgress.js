import * as THREE from 'three';

export function sectionProgress(
    progress,
    start,
    end 
){

     return THREE.MathUtils.clamp(
        (progress - start)/(end - start),
        0,
        1
     );
}