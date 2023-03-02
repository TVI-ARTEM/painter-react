import React, {FC, useContext} from 'react';
import {CanvasContext, Tool} from "../../provider/CanvasContextProvider";

interface CellProps {
    size: number,
    index: number
}

const Cell: FC<CellProps> = ({size, index}) => {
    const {cells, setCells, width, tool, currentColor, setCurrentColor} = useContext(CanvasContext)


    return (
        <div
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: `${cells[index] === "-1" ? ((Math.floor(index / width) + index % (width)) % 2) === 0 ? "#FCFCFC" : "#4E4E4E" : cells[index]}`
            }}
            onClick={() => {
                if (tool === Tool.Erase) {
                    let celll = [...cells]
                    celll[index] = "-1"
                    setCells(celll)
                } else if (tool === Tool.Pencil) {
                    let celll = [...cells]
                    celll[index] = currentColor
                    setCells(celll)
                } else if (tool === Tool.Pippete) {
                    setCurrentColor(cells[index])
                }

            }
            }
        />
    );
};

export default Cell;