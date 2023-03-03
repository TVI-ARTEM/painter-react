import {useContext} from "react";
import Board from "./Board/Board";
import "./Canvas.css"
import {CanvasContext} from "./provider/CanvasContextProvider";


const Canvas = () => {
    const {project} = useContext(CanvasContext)

    return (
        <div className="canvas">
            <Board width={project.width} height={project.width}/>
        </div>
    );
};

export default Canvas;


