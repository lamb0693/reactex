import { useReducer } from "react"

const MESSAGE = {
    INC : "increase",
    DEC : "decrease",
    RESET : "reset"
}


const reducer = (state, action) => {
    console.log("reducer acts...", state, action)
    switch(action.type) {    
        case MESSAGE.INC :
            console.log("inc" )
            return state +1
        case MESSAGE.DEC :
            console.log("dec")
            return state -1
        case MESSAGE.RESET:
            console.log("rest")
            return 0
        default :
            return state
    }
}

export const ReducerTest = () => {
    //const [count, SetCount] = useState(0)

    const [count, dispatch] = useReducer(reducer, 0)

    return (
        <div>
            <h2>{count}</h2>
            {/* onclick={dispatch() } 이렇게 쓰면  dispatch가 계속 불림 */}
            <button onClick={() => dispatch({type:MESSAGE.INC, payload:count})}>Increase</button>  
            <button onClick={() => dispatch({type:MESSAGE.DEC, payload:count})}>Decrease</button>
            <button onClick={() => dispatch({type:MESSAGE.RESET, payload:count})}>Reset</button>
        </div>
    )

}