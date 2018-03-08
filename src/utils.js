import {Errors} from './const'

export function appendError(state,error,command){
    const time = new Date().format('hh:mm:ss')
    return Object.assign({},state,{
        error:true,
        history:state.history.concat({
            value:error.replace('$1',command),
            time
        })
    })
}

export function illegalInput(input){
    const regExp = new RegExp('[\\n\\r(\\n\\r)]')
    return regExp.test(input)
}