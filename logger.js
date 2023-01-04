import reducer from "./reducer.js";

export default function logger(reducer) {
    return (prevState,action,args) => {
        console.group(action)
        console.log('Previous state:',prevState)
        console.log('Action argument:',args)
        const nextState = reducer(prevState,action,args) 
        console.log('Next state:',nextState) 
        console.groupEnd()
        return nextState
    }
}