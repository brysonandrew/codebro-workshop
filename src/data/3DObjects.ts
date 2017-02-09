import { Color, Vector3, Euler } from 'three';

export let computer = {
    position: new Vector3(0, -10, 0),
    rotation: new Euler(0, Math.PI * 0.5, 0),
    top: {
        width: 60,
        height: 2, //thickness
        depth: 30,
        radians: Math.PI * 1.45,
        color: new Color("#000000")
    },
    lap: {
        width: 60,
        height: 2, //thickness
        depth: 30,
        color: new Color("#757575")
    }
};

export let text = {
    thickness: 5,
    fontSize: 40,
    specular: "#ffffff",
    shininess: 100,
    color: "#000000"
};