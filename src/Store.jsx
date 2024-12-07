import { create } from 'zustand'
import { combine } from 'zustand/middleware'

// creates a context to track the state of x || o || null
const useGameStore = create(
  // uses middleware to check the context
  combine(
    // initialize the 3x3 board
    { squares: Array(9).fill('null') },
    (set) => ({
      // update state functions
      setSquares: (nextSquares) =>
        set((state) => ({
          squares: typeof nextSquares === 'function' ? nextSquares(state.squares) : nextSquares
        }))
    })
  )
)

export default useGameStore
