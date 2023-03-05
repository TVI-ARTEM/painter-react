import React, {FC, useContext} from 'react';
import {CanvasContext, HistoryType, Tool} from "../../../../../providers/CanvasContextProvider";
import PencilIMG from "../../../../../common/images/Pencil2.svg"
import EraseIMG from "../../../../../common/images/Erase2.svg"
import FillIMG from "../../../../../common/images/Fill2.svg"
import PippeteIMG from "../../../../../common/images/Pippete2.svg"

interface CellProps {
    size: number,
    index: number
}

const fill = (cells: String[], x: number, y: number, width: number, fillColor: string, oldColor: string) => {
    const index = x * width + y
    if (x < width && y < width && x >= 0 && y >= 0 && cells[index] === oldColor) {
        cells[index] = fillColor
        fill(cells, x + 1, y, width, fillColor, oldColor)
        fill(cells, x - 1, y, width, fillColor, oldColor)
        fill(cells, x, y + 1, width, fillColor, oldColor)
        fill(cells, x, y - 1, width, fillColor, oldColor)
    }
}

const Cell: FC<CellProps> = ({size, index}) => {
    const {
        project,
        setProject,
        currentFrame,
        tool,
        currentColor,
        setCurrentColor,
        undoHistory,
        setUndoHistory,
        setRedoHistory
    } = useContext(CanvasContext)


    return (
        <div
            style={{
                width: `${size}px`,
                height: `${size}px`,
                backgroundColor: `${(project.frames.at(currentFrame) as String[]).at(index) === "-1" ? ((Math.floor(index / project.width) + index % (project.width)) % 2) === 0 ? "#FCFCFC" : "#4E4E4E" : (project.frames.at(currentFrame) as String[]).at(index)}`
            }}
            onClick={() => {

                if (tool === Tool.Erase && (project.frames.at(currentFrame) as String[]).at(index) !== "-1") {
                    setUndoHistory([...undoHistory, {
                        type: HistoryType.ChangeColor,
                        cells: [...(project.frames.at(currentFrame) as String[])],
                        index: currentFrame
                    }])
                    setRedoHistory([])
                    let newProj = Object.assign({}, project)
                    newProj.frames[currentFrame][index] = "-1"
                    setProject(newProj)

                } else if (tool === Tool.Pencil && (project.frames.at(currentFrame) as String[]).at(index) !== currentColor) {
                    setUndoHistory([...undoHistory, {
                        type: HistoryType.ChangeColor,
                        cells: [...(project.frames.at(currentFrame) as String[])],
                        index: currentFrame
                    }])
                    setRedoHistory([])
                    let newProj = Object.assign({}, project)
                    newProj.frames[currentFrame][index] = currentColor
                    setProject(newProj)
                } else if (tool === Tool.Pippete) {
                    setCurrentColor((project.frames.at(currentFrame) as String[]).at(index) as String)
                } else if (tool === Tool.Fill && (project.frames.at(currentFrame) as String[]).at(index) !== currentColor) {
                    setUndoHistory([...undoHistory, {
                        type: HistoryType.ChangeColor,
                        cells: [...(project.frames.at(currentFrame) as String[])],
                        index: currentFrame
                    }])
                    setRedoHistory([])
                    let cellCopy = [...(project.frames.at(currentFrame) as String[])]

                    fill(cellCopy, Math.floor(index / project.width), index % (project.width), project.width, currentColor.toString(), ((project.frames.at(currentFrame) as String[]).at(index) as String).toString())
                    let newProj = Object.assign({}, project)
                    newProj.frames[currentFrame] = cellCopy
                    setProject(newProj)
                }
            }
            }
            onDragStart={(e) => e.preventDefault()}
            onContextMenu={(e) => e.preventDefault()}
        />
    );
};

export default Cell;