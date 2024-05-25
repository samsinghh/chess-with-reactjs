import './pieces.css'
import Piece from './Piece'
import {useRef} from 'react'
import { useAppContext } from '../../../contexts/context'
import { clearCandidates, makeNewMove } from '../../../reducer/actions/move'
import arbiter from '../../../arbiter/arbiter'
import { openPromotion } from '../../../reducer/actions/popup'
import { getCastlingDirections } from '../../../arbiter/getMoves'
import { updateCastling, detectStalemate, detectInsuffientMaterial, detectCheckmate } from '../../../reducer/actions/game'
import { getNewMoveNotation } from '../../../helper'

const Pieces = () => {

    const ref = useRef()

    const {appState, dispatch} = useAppContext()

    const currentPosition = appState.position[appState.position.length-1]

  

    const calculateCoords = e => {
        const {width,left,top} = ref.current.getBoundingClientRect()
        const size = width / 8
        const y = Math.floor((e.clientX - left) / size)
        const x = 7 - Math.floor((e.clientY - top) / size)
        return {x,y}
    }

    const openPromotionBox = ({rank,file,x,y}) => {
        dispatch(openPromotion({
            rank : Number(rank),file : Number(file),x,y
        }))
    }

    const updateCastlingState = ({piece, rank, file}) => {
        const direction = getCastlingDirections({
            castleDirection : appState.castleDirection,
            piece, rank, file
        })

        if(direction) {
            dispatch(updateCastling(direction))
        }
    }

    const move = e => {
        const {x,y} = calculateCoords(e)

        const [piece,rank,file] = e.dataTransfer.getData('text').split(',')
        if(appState.candidateMoves.find(m => m[0] === x && m[1] === y)){
            
            const opponent = piece.startsWith('w') ? 'b' : 'w'
            const castleDirection = appState.castleDirection[`${piece.startsWith('b') ? 'w' : 'b'}`]

            if((piece === 'wp' && x === 7) || (piece === 'bp' && x === 0)){
                openPromotionBox({rank,file,x,y})
                return
            }

            if(piece.endsWith('r') || piece.endsWith('k')){
                updateCastlingState({piece, rank, file})
            }

            const newPosition = arbiter.performMove({
                position: currentPosition,
                piece,
                rank,
                file,
                x,
                y
            })
            const newMove = getNewMoveNotation ({
                piece, rank, file, x, y, position: currentPosition
            })
            console.log(newMove);

            dispatch(makeNewMove({newPosition, newMove}))

            if(arbiter.insufficientMaterial(newPosition)){
                dispatch(detectInsuffientMaterial())

            }else if(arbiter.isStalemate(newPosition, opponent, castleDirection)){
                dispatch(detectStalemate())
            }
            else if(arbiter.isCheckMate(newPosition, opponent, castleDirection)){
                dispatch(detectCheckmate(piece[0]))
            }

    }
    dispatch(clearCandidates())
}
    

    const onDrop = e => {
        e.preventDefault()

        move(e)
    }
    const onDragOver = e => e.preventDefault();

    return <div 
    ref = {ref}
    onDrop = {onDrop}
    onDragOver = {onDragOver}
        className='pieces'
        >
            {currentPosition.map((r,rank) =>
                r.map((f, file) => 
                    currentPosition[rank][file] ? <Piece 
                                            key = {rank + '-' + file}
                                            rank = {rank}
                                            file = {file}
                                            piece = {currentPosition[rank][file]}
                                            />
            : null
           ))}
        </div>
}

export default Pieces