import { initGameState } from "../../constant"
import actionTypes from "../actionTypes"

export const updateCastling = (direction) => {
    return {
        type : actionTypes.CAN_CASTLE,
        payload : direction
    }
}

export const detectStalemate = () => {
    return {
        type : actionTypes.STALEMATE,
    }
}

export const setupNewGame = () => {
    return {
        type : actionTypes.NEW_GAME,
        payload : initGameState
    }
}

export const detectInsuffientMaterial = () => {
    return {
        type: actionTypes.INSUFFICIENT_MATERIAL
    }
}

export const detectCheckmate = winner => {
    return {
        type : actionTypes.WIN,
        payload : winner
    }
}