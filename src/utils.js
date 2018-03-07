import {Errors} from './const'

export function appendError(state,error,command){
    return Object.assign({},state,{
        error:true,
        history:state.history.concat({
            value:error.replace('$1',command)
        })
    })
}
