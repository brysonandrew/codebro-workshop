import THREE = require('three');
import { createKnightsArmour } from './amourParts';
import { easeMotion } from '../../../../../helpers/motion';

export class KnightsArmour {

    walkingSpeed = 0.5;
    knight = new THREE.Group;
    knightParts;

    constructor() {}

    assemble() {
        this.knight.add(createKnightsArmour());
        this.knightParts = this.knight.children[0].children;
        console.log(this.knightParts)
    }

    walk(isLeft, isRight) {
        this.knight.rotation.z+=easeMotion(isLeft, 5, 0.05, this.walkingSpeed);
        this.knight.rotation.z-=easeMotion(isRight, 5, 0.05, this.walkingSpeed);
    }

    render() {
        return this.knight;
    }
}
