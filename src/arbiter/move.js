import { copyPosition } from "../helper"

export const movePawn = ({position, piece, rank, file, x, y}) => {
    const newPosition = copyPosition(position)
    if(!newPosition[x][y] && x !== rank && y !== file)
        newPosition[Number(rank)][y] = ''

    newPosition[Number(rank)][Number(file)] = ''
    newPosition[x][y] = piece
    

    return newPosition
}

export const movePiece = ({position, piece, rank, file, x, y}) => {
    const newPosition = copyPosition(position)

    if(piece.endsWith('k') && Math.abs(y - file) > 1 ){
        if(y === 2){
            newPosition[Number(rank)][0] = ''
            newPosition[Number(rank)][3] = piece.startsWith('w') ? 'wr' : 'br'
        }
        if(y === 6){
            newPosition[Number(rank)][7] = ''
            newPosition[Number(rank)][5] = piece.startsWith('w') ? 'wr' : 'br'
        }
    }

    newPosition[x][y] = piece
    newPosition[Number(rank)][Number(file)] = ''

    return newPosition
}