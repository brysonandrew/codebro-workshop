import * as React from 'react';
const ffmpeg = require('ffmpeg');

export const convertVideo = (req, res) => {
    const path = req.body;
    console.log(req.body);
    console.log(ffmpeg);
    try {
        new ffmpeg('/path/to/your_movie.avi', (err, video) => {
            if (!err) {
                console.log('The video is ready to be processed');
            } else {
                console.log('Error: ' + err);
            }
        });
    } catch (e) {
        console.log(e.code);
        console.log(e.msg);
    }
};