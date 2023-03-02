import React, {FC, useContext, useState} from 'react';
import {CanvasContext} from "../../CanvasContextProvider";

interface CellProps {
    size: number,
    index: number
}

const Cell: FC<CellProps> = ({size, index}) => {
    const {cells, setCells} = useContext(CanvasContext)


    return (
        <div
            style={{width: `${size}px`, height: `${size}px`, backgroundColor: `${cells[index]}`}}
            onMouseDown={() => {
                let celll = [...cells]
                celll[index] = "#FAA"
                setCells(celll)
            }
            }
        />
    );
};

export default Cell;