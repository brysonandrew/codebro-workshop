export let findLetter = (letter) => {
    let l = letter.toLowerCase();
    if (l==="c") {
        return [
            {
                type: "forward",
                columnIndex: 2,
                rowIndex: 0
            },
            {
                type: "forward",
                columnIndex: 1,
                rowIndex: 1
            },
            {
                type: "backward",
                columnIndex: 1,
                rowIndex: 2
            },
            {
                type: "backward",
                columnIndex: 2,
                rowIndex: 3
            }
        ];
    } else if (l==="o") {
        return [
            {
                type: "forward",
                columnIndex: 1,
                rowIndex: 0
            },
            {
                type: "forward",
                columnIndex: 0,
                rowIndex: 1
            },
            {
                type: "backward",
                columnIndex: 0,
                rowIndex: 2
            },
            {
                type: "backward",
                columnIndex: 1,
                rowIndex: 3
            },
            {
                type: "backward",
                columnIndex: 2,
                rowIndex: 0
            },
            {
                type: "backward",
                columnIndex: 3,
                rowIndex: 1
            },
            {
                type: "forward",
                columnIndex: 3,
                rowIndex: 2
            },
            {
                type: "forward",
                columnIndex: 2,
                rowIndex: 3
            },
        ];
    } else if (letter==="d") {
        return [
            {
                type: "backward",
                columnIndex: 1,
                rowIndex: 0
            },
            {
                type: "backward",
                columnIndex: 2,
                rowIndex: 1
            },
            {
                type: "forward",
                columnIndex: 2,
                rowIndex: 2
            },
            {
                type: "forward",
                columnIndex: 1,
                rowIndex: 3
            },
        ];
    } else if (l==="e") {
        return [
            {
                type: "forward",
                columnIndex: 2,
                rowIndex: 0
            },
            {
                type: "forward",
                columnIndex: 1,
                rowIndex: 1
            },
            {
                type: "backward",
                columnIndex: 1,
                rowIndex: 2
            },
            {
                type: "backward",
                columnIndex: 2,
                rowIndex: 3
            }
        ];
    } else if (l==="b") {
        return [
            {
                type: "backward",
                columnIndex: 2,
                rowIndex: 0
            },
            {
                type: "forward",
                columnIndex: 2,
                rowIndex: 1
            },
            {
                type: "backward",
                columnIndex: 2,
                rowIndex: 2
            },
            {
                type: "forward",
                columnIndex: 2,
                rowIndex: 3
            }
        ];
    } else if (l==="r") {
        return [
            {
                type: "backward",
                columnIndex: 2,
                rowIndex: 0
            },
            {
                type: "forward",
                columnIndex: 2,
                rowIndex: 1
            },
            {
                type: "backward",
                columnIndex: 2,
                rowIndex: 2
            },
            {
                type: "backward",
                columnIndex: 3,
                rowIndex: 3
            }
        ];
    }
    return []
};
