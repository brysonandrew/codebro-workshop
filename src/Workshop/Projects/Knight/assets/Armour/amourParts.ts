import THREE = require('three');

const shoulderBreadth = 60;
const shoulderRadius = 10;
const torsoHeight = 100;
const headHeight = 28;
const armLength = 80;

export const createHelm = () => {
    const geometry = new THREE.CylinderGeometry( 20, 22, headHeight, 20 );
    const material = new THREE.MeshLambertMaterial( {
        emissive: new THREE.Color("#212121")
    } );
    return new THREE.Mesh( geometry, material );
};

export const createTorso = () => {
    const geometry = new THREE.BoxGeometry( shoulderBreadth, torsoHeight, 28 );
    const material = new THREE.MeshLambertMaterial( {
        emissive: new THREE.Color("#212121")
    } );
    return new THREE.Mesh( geometry, material );
};

export const createShoulderGuard = () => {
    const geometry = new THREE.SphereGeometry( shoulderRadius, 32, 32 );
    const material = new THREE.MeshLambertMaterial( {
        emissive: new THREE.Color("#212121")
    } );
    return new THREE.Mesh( geometry, material );
};

export const createArm = () => {
    const geometry = new THREE.CylinderGeometry( 6, 6, armLength, 60 );
    const material = new THREE.MeshLambertMaterial( {
        emissive: new THREE.Color("#212121")
    } );
    return new THREE.Mesh( geometry, material );
};

export const createKnightsArmour = () => {
    const armour = new THREE.Group;

    let torso = this.createTorso();
    armour.add(torso);

    let helm = this.createHelm();
    helm.position.set(0, torsoHeight * 0.5 + headHeight * 0.5, 0);
    armour.add( helm );

    let rightArm = this.createArm();
    rightArm.position.set(shoulderBreadth * 0.5 + shoulderRadius * 0.5, torsoHeight * 0.5 -armLength * 0.5, 0);
    armour.add( rightArm );

    let rightShoulder = this.createShoulderGuard();
    rightShoulder.position.set(shoulderBreadth * 0.5 + shoulderRadius * 0.5, torsoHeight * 0.5, 0);
    armour.add( rightShoulder );

    let leftArm = this.createArm();
    leftArm.position.set(-shoulderBreadth * 0.5 - shoulderRadius * 0.5, torsoHeight * 0.5 -armLength * 0.5, 0);
    armour.add( leftArm );

    let leftShoulder = this.createShoulderGuard();
    leftShoulder.position.set(-shoulderBreadth * 0.5 - shoulderRadius * 0.5, torsoHeight * 0.5, 0);
    armour.add( leftShoulder );

    return armour
};
