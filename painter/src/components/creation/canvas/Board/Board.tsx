import React, {FC, ReactElement, useContext, useEffect, useState} from 'react';
import Cell from "./Cell/Cell";
import {CanvasContext} from "../CanvasContextProvider";

interface BoardProps {
    width: number,
    height: number,
}


const BOARD_SIZE = 750;

const Board: FC<BoardProps> = ({width, height}) => {
    const [cellRender, setCellsRender] = useState<ReactElement[]>()
    useEffect(() => {
        const cellsArr = []
        for (let i = 0; i < width * height; i++) {
            const cellSize = BOARD_SIZE / width
            cellsArr.push(<Cell size={cellSize} index={i} key={i}/>)

        }
        setCellsRender(cellsArr)
    }, [height, width])


    return (

        <div style={{
            display: "inline-grid",
            gridTemplateColumns: `repeat(${width},1fr)`,
            width: `${BOARD_SIZE}px`,
            height: `${BOARD_SIZE}px`,
            overflow: "auto"
        }}
        > {cellRender}
        </div>

    );
};

export default Board;