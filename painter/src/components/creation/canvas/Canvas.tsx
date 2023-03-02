import {useContext} from "react";
import Board from "./Board/Board";
import "./Canvas.css"
import {CanvasContext} from "./CanvasContextProvider";


const Canvas = () => {
    const {width} = useContext(CanvasContext)

    return (
        <div className="canvas">
            <Board width={width} height={width}/>
        </div>
    );
};

export default Canvas;


