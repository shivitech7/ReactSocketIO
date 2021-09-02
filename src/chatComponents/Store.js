import { createContext, useReducer, useEffect } from 'react';
import io from 'socket.io-client';


export const CTX = createContext();
// const header = ('Access-Control-Allow-Origin: *');

const initState = {
    general: [
        { from: 'pooja', msg: 'hello' },
        { from: 'sammy', msg: 'hello' },
        { from: 'Abhi', msg: 'hello' },
        { from: 'Mayank', msg: 'hello' },
        { from: 'Shivani', msg: 'hello' },
        { from: 'Shivani', msg: 'hello' },
        { from: 'Shivani', msg: 'hello' },
    ],
    topic2: [
        { from: 'Shivani', msg: 'hello' },
        { from: 'Suvi', msg: 'hello' },
        { from: 'Shruti', msg: 'hello' },
    ]
}

const reducer = (state, action) => {
    // console.log(action);
    // console.log(`State ${JSON.stringify(state[])}`);
     //using object destructuring
    const { from, msg, topic } = action.payload;              
    // console.log(action.payload);

    // console.log(action.payload);
    switch (action.type) {
        case 'RECEIVE_MESSAGE':
            return {
                
                ...state,
                [topic] : [...state[topic], {from, msg}]
                
            }

        default:
            return state
    }
}




let socket;

const sendChatAction = (value) => {
    socket.emit('chat message', value);
} 

export const Store = (props) => {


    useEffect(() => {
        if (!socket) {
            socket = io(':3001')
            socket.on('chat message', (msg) => {
                console.log({msg});
                dispatch({ type: 'RECEIVE_MESSAGE', payload: msg });
            });
        }
    }, [])
    const [allChats, dispatch] = useReducer(reducer, initState);
    const user = 'shivi' + Math.random(100).toFixed(2)

    return (
        <div>
            <CTX.Provider value={{ allChats, sendChatAction, user }} >
                {props.children}
                {console.log(allChats)}
            </CTX.Provider>
        </div>
    )
}