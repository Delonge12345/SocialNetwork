const ADD_MESSAGE = 'ADD_MESSAGE';





type DialogType = {
    id: number,
    username: string
}

type MessageType = {
    id: number,
    username: string,
    message:string
}

let initialState = {
    dialogs: [
        {id: 1, username: 'Kevin James'},
        {id: 2, username: 'Robert Michael Schneider'},
        {id: 3, username: 'Chris" Rock III'},
        {id: 4, username: 'David Wayne Spade'},

    ] as Array<DialogType>,
    messages: [
        {id: 1, username: 'Kevin James', message: 'Всем привет,чуваки!'},
        {id: 2, username: 'Robert Michael Schneider', message: 'Мне снова 20!'},
        {id: 3, username: 'Chris" Rock III', message: 'Мужииик!'},
        {id: 4, username: 'David Wayne Spade', message: 'Ехууу!!'},

    ] as Array<MessageType>
}



export type InitialStateType = typeof initialState;


const dialogsReducer = (state = initialState, action:any):InitialStateType=> {

    switch (action.type) {

        case ADD_MESSAGE:
            let body = action.messageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, username:'Karl', message: body}],

            }

        default:
            return state;
    }

}

export default dialogsReducer;

type SendMessageCreatorType = {
    type: typeof ADD_MESSAGE,
    messageBody: string
}
export const sendMessageCreator = (messageBody:string):SendMessageCreatorType => ({type: ADD_MESSAGE, messageBody: messageBody});
