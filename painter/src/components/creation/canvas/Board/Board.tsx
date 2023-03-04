import React, {FC, ReactElement, useContext, useEffect, useState} from 'react';
import Cell from "./Cell/Cell";
import {CanvasContext} from "../provider/CanvasContextProvider";

interface BoardProps {
    width: number,
    height: number,
}


const BOARD_SIZE = window.screen.width > 500 ? window.screen.width > 750 ? window.screen.width > 1000 ? 600 : 400 : 250 : 150;

const Board: FC<BoardProps> = ({width, height}) => {
    const [cellRender, setCellsRender] = useState<ReactElement[]>()
    const {zoom} = useContext(CanvasContext)
    useEffect(() => {
        const cellsArr = []
        for (let i = 0; i < width * height; i++) {
            const cellSize = zoom * BOARD_SIZE / width
            cellsArr.push(<Cell size={cellSize} index={i} key={i}/>)

        }
        setCellsRender(cellsArr)
    }, [height, width, zoom])


    return (

        <div style={{
            display: "inline-grid",
            gridTemplateColumns: `repeat(${width},1fr)`,
            width: `${BOARD_SIZE}px`,
            height: `${BOARD_SIZE}px`,
            overflow: "auto"
        }}
             onDragStart={(e) => e.preventDefault()}
             onContextMenu={(e) => e.preventDefault()}
        > {cellRender}
        </div>

    );
};

export default Board;