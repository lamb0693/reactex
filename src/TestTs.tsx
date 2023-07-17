import React from 'react';
import { useState } from 'react';

export const TestTS = () => {
    const [count, setCount] = useState(0)
    const addcount = () => {
        setCount(count +1)
    }

    return <div><button onClick={addcount}>count = {count}</button></div>
}