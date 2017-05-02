import * as React from 'react';
import { IWorkshopLink } from '../models';
import {IntroHeader} from "../Widgets/IntroHeader/IntroHeader";

export const workshopLinks: IWorkshopLink[] = [
    {
        name: "Gatling Gun",
        path: "/workshop/gatling-gun",
        category: "Web Development",
        image: ""
    },
    {
        name: "Walking physics",
        path: "/workshop/walking-physics",
        category: "Web Development",
        image: ""
    },
    {
        name: "Transition Crash Test",
        path: "/workshop/transition-crash-test",
        parts: [
            "Intro",
            "transform: translate()",
            "due to technical difficult",
            "transform: scale() and rotate()"],
        category: "Web Development",
        image: "/images/workshop/examples/transition-crash-test/van-damme.png"
    },
    {
        name: "THREE.js basic set-up",
        path: "/workshop/threejs-basic-setup",
        category: "3D Web Development",
        parts: [
            "Scene, camera, action!",
            "Lights, resize, action!",
            "End of part I...",
            "Action, action, action!"],
        image: "/images/workshop/examples/threejs-basic-setup/threejs.jpg"
    },
    {
        name: "Create a 3D Sword",
        path: "/workshop/create-a-3d-sword",
        parts: ["Setup and planning"],
        category: "3D Web Development",
        image: "/images/workshop/examples/create-a-3d-sword/executioners-greatsword.png"
    },
    {
        name: "code bro",
        path: "/workshop/code-bro",
        parts: [<IntroHeader isOnFrontPage={true}/>],
        category: "Marketing",
        image: ""
    },
];
