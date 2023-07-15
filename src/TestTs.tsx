import { useState } from "react"
import React from 'react';

export const TestTs = ()=> {
    interface Istate {
        count: number
    }

    const [state, setState] = useState<Istate>( {count :0 })

    const addCount = () => {
        setState( { count: state.count + 1 })
    }

    return ( 
        <div>
            <button onClick={addCount}>Count {state.count}</button>
        </div>
    )

}