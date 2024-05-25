import { createPosition } from "./helper"

export const Status = {
    'ongoing' : 'Ongoing',
    'promoting' : 'Promoting',
    'white' : 'White wins',
    'black' : 'Black wins',
    'stalemate' : 'Game is a draw due to stalemate',
    'insufficient' : 'Game is a draw due to insufficient material',
}

export const initGameState = {
    position : [createPosition()],
    turn: 'w',
    movesList: [],
    candidateMoves : [],
    status : Status.ongoing,
    promotionSquare: null,
    castleDirection : {
        w : 'both',
        b : 'both'
    }
}