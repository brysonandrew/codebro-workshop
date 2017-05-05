import * as React from 'react';
import { IWorkshopLink } from '../models';
//projects
import { GatlingGunContainerFromStore }
    from '../Workshop/Projects/GatlingGun/GatlingGunContainer';
import { WalkingPhysicsContainerFromStore }
    from '../Workshop/Projects/WalkingPhysics/WalkingPhysicsContainer';
import { Create3DSwordContainerFromStore }
    from '../Workshop/Projects/Create3DSword/Create3DSwordContainer';
//examples
import  { TransitionContainerFromStore }
    from '../Workshop/Examples/TransitionCrashTest/TransitionContainer';
import  { THREEjsBasicSetupContainerFromStore }
    from '../Workshop/Examples/THREEjsBasicSetup/THREEjsBasicSetupContainer';

export const workshopLinks: IWorkshopLink[] = [
    {
        name: "Gatling Gun",
        path: "gatling-gun",
        viewPaths: [],
        category: "Web Development",
        slides: [],
        image: "",
        component: <GatlingGunContainerFromStore/>
    },
    {
        name: "Walking physics",
        path: "walking-physics",
        viewPaths: [],
        category: "Web Development",
        slides: [],
        image: "",
        component: <WalkingPhysicsContainerFromStore/>
    },
    {
        name: "Create a 3D Sword",
        path: "create-a-3d-sword",
        viewPaths: [],
        parts: ["Setup and planning"],
        category: "3D Web Development",
        slides: [],
        image: "/images/examples/create-a-3d-sword/executioners-greatsword.png",
        component: <Create3DSwordContainerFromStore/>
    },
    {
        name: "Transition Crash Test",
        path: "transition-crash-test",
        viewPaths: [],
        parts: [
            "Intro",
            "transform: translate()",
            "due to technical difficult",
            "transform: scale() and rotate()"],
        category: "Web Development",
        slides: [],
        image: "/images/examples/transition-crash-test/van-damme.png",
        component: <TransitionContainerFromStore/>
    },
    {
        name: "THREE.js basic set-up",
        path: "threejs-basic-setup",
        viewPaths: [],
        parts: [
            "Scene, camera, action!",
            "Lights, resize, action!",
            "End of part I...",
            "Action, action, action!"],
        category: "3D Web Development",
        slides: [],
        image: "/images/examples/threejs-basic-setup/threejs.jpg",
        component: <THREEjsBasicSetupContainerFromStore/>
    }
];