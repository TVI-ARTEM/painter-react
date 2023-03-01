import {FC, useState} from "react";
import Board from "./Board/Board";

interface BoardProps {
    width: number,
    height: number,
}

const Canvas: FC<BoardProps> = ({width, height}) => {
    const [color, setColor] = useState<string>('#eb9010')

    return (
        <div className='canvas'>
            <Board color={color} width={width} height={height}/>
        </div>
    );
};

export default Canvas;