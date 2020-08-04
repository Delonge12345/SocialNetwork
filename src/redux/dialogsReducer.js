const ADD_MESSAGE = 'ADD_MESSAGE';


let initialState = {
    dialogs: [
        {id: 1, username: 'Kevin James'},
        {id: 2, username: 'Robert Michael Schneider'},
        {id: 3, username: 'Chris" Rock III'},
        {id: 4, username: 'David Wayne Spade'},

    ],
    messages: [
        {id: 1, username: 'Kevin James', message: 'Всем привет,чуваки!'},
        {id: 2, username: 'Robert Michael Schneider', message: 'Мне снова 20!'},
        {id: 3, username: 'Chris" Rock III', message: 'Мужииик!'},
        {id: 4, username: 'David Wayne Spade', message: 'Ехууу!!'},

    ],
}


const dialogsReducer = (state = initialState, action) => {

    switch (action.type) {

        case ADD_MESSAGE:
            let body = action.messageBody;
            return {
                ...state,
                messages: [...state.messages, {id: 6, message: body}],

            }

        default:
            return state;
    }

}

export default dialogsReducer;


export const sendMessageCreator = (messageBody) => ({type: ADD_MESSAGE, messageBody: messageBody});
