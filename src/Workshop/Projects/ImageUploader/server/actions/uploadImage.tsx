import * as React from 'react';

export const uploadImage =
    (req, res) =>
        (req["file"]["filename"] != null)
    ?   res.status(200).send({status: "ok", data: req["file"]["filename"]})
    :   res.status(200).send({status: "ok", error: "upload failed"});
