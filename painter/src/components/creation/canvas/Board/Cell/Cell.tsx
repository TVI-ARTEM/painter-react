import React, {FC} from 'react';

interface CellProps {
    size: number,
    color: string,
}

const Cell: FC<CellProps> = ({size, color}) => {

    return (
        <div
            style={{width: `${size}px`, height: `${size}px`, backgroundColor: color}}
            onMouseDown={() => console.log('down')}
        />
    );
};

export default Cell;