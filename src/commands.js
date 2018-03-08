const helpCommands = ['clear','whoami'];

export const help ={
    exec:(state)=>{
        // let history = state.history;
        // history.unshift(            
        //     ...helpCommands.map(value=>({value})),
        //     {value:'bash commands list:'}
        // )
        const time = new Date().format('hh:mm:ss')
        return Object.assign({},state,{
            history: state.history.concat(
                { value: 'React-bash:' ,time},
                { value: 'These shell commands are defined internally.  Type \'help\' to see this list.' },
                ...helpCommands.map(value => ({ value }))
            ),
        })
    }
}

export const clear = {    
    exec:(state)=>{
        const time = new Date().format('hh:mm:ss')
        return Object.assign({},state,{history:[]})
    }
}

export const whoami = {

    exec:(state) => {
        const value = state.settings.user.username;
        const time = new Date().format('hh:mm:ss')
        // let history = state.history
        // history.unshift({
        //     value
        // })
        return Object.assign({},state,{
            history: state.history.concat({ value ,time}),
        })
    }
}