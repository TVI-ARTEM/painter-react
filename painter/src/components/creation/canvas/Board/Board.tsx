import React, {FC, ReactElement, useEffect, useRef, useState} from 'react';
import Cell from "./Cell/Cell";

interface BoardProps {
    width: number,
    height: number,
    color: string,
}

const BIG_BOARD_SIZE = 400;
const SMALL_BOARD_SIZE = 300;
const BOARD_SIZE = window.innerWidth > 530 ? BIG_BOARD_SIZE : SMALL_BOARD_SIZE;

const Board: FC<BoardProps> = ({width, height, color}) => {
    const [cells, setCells] = useState<ReactElement[]>([]);


    useEffect(() => {
        const cellsArr = []
        for (let i = 0; i < width * height; i++) {
            const cellSize = BOARD_SIZE / width
            cellsArr.push(<Cell size={cellSize} color={"#FFF"} key={i}/>)

        }
        console.log(cellsArr)
        setCells(cellsArr)
    }, [width, height])


    return (
        <div style={{
            display: "inline-grid",
            gridTemplateColumns: `repeat(${width},1fr)`
        }}
        >
            {cells}
        </div>
    );
};

export default Board;