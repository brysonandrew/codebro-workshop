import * as React from 'react';

import { IPost } from '../../models';

export let blogPosts: IPost[] = [
    {
        heading: "How to plan a webpage design for a client.",
        link: "",
        status: "",
        date: "7 Feb 2017",
        content:
            [
                "A basic issue facing web developers is reading the mind of the client. Here are some basic dos and don’ts when it comes to creating a web page from a design perspective for a client.",
                "Do listen carefully and take seriously all and every issue the client has in terms of the way they want to website to be presented. ",
                "Don’t overlook points raised by your client even if you consider them trivial.",
                "Do ask for your client to create a mock up themselves or if they prefer, find examples online of what they would like their website to look like.",
                "Don’t go in blind. This is something I did once and paid the price. I spend 4 hours creating what I thought to be an amazing looking landing page, full of creative flair and vision, while totally missing the mark regarding what the client wanted.",
                "Do send regular updates on what and how their website is developing and be responsive to their feedback.",
                "It is your job as a web developer to allow your client to express and for you to interpret their idea so that the final result is more of a pleasant surprise than a disappointment."
            ],
        pic: "/images/softwareLogos/javascriptIcon.png"
    },
    {
        heading: "THREE.js essentials",
        link: "https://threejs.org/examples/misc_controls_orbit.html",
        status: "",
        date: "24 Feb 2017",
        content:
            [
                "As web developers used to working in two dimensions there is one thing that is easy to take for granted when working with a third dimension - space. The good news is that THREE.js has a ton of built in controls and helpers that can give us some control over this.",
                "My favorite tools for helping navigate the third dimension are Orbit Controls and Camera Helper.",
                "The moment I realised how important these were was when I started playing with shadows. Since shadows are rendered using a \"shadow camera\" we can use the Camera Helper and since shadows can appear on any surface we should use Orbit Controls to navigate around our 3D objects",
                "Firstly let's look at THREE.OrbitControls.",
                "These controls I have found the most useful, they allow zoom on trackpad or mousewheel scroll, X and Y axis movement for the arrow keys and radial navigation on mouse drag.",
                "This can help you easily navigate around your project and see what your 3D objects look like from different angles, (as well as see exactly where shadows are going).",
                "If you have an animation loop running you will need to configure the Orbit Controls to update during the loop. Just add \"controls.update()\" inside your loop.",
                "THREE.CameraHelper shows you a kind of cone that shows what your camera is looking at. The camera shows in red the \"near\" limitation you set and the cone stretches out to your \"far\" limitation. The cone is as wide as your \"fov\".",
                "The CameraHelper especially helped because I found my shadow's weren't rendering because my \"far\" limitation, although initially set far enough, was mysteriously changing after render…",
                "To add these controls you simply include this line in your code. Notice they both take your camera object and must be added to the scene to work.",
                <code>Import * as THREE from 'three';</code>,
                <code>const controls = new THREE.OrbitControls(camera);</code>,
                <code>const cameraHelper = THREE.CameraHelper(camera);</code>,
                <code>scene.add(cameraHelper);</code>
            ],
        pic: "/images/blog/threejs.jpg"
    }
];