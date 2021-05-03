const CHANGE_NEWS = 'CHANGE_NEWS'
const ADD_NEWS= 'ADD_NEWS'

let initialState = {
    newsPage: [
        { data: "22.04.21", name: 'Nastya', news: 'Today i has a good day. Look at my profile to see it!!!!' },
        { data: "23.04.21", name: 'Maksim', news: 'Sooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo' },
        { data: "29.04.21", name: 'Katya', news: 'klaaaas, i do it!' },
        { data: "01.05.21", name: 'Veronila', news: 'Do you wony to see me? Klick my profile' },
        { data: "02.05.21", name: 'Evgenia', news: 'Today i eat yammy desers' }
    ],
    newsTextInitial: "news"

}

const newsReducer=(state=initialState, action)=>{
    switch (action.type) {
        case CHANGE_NEWS:

            return{
                ...state,
                newsTextInitial: action.newsText
            }
        case ADD_NEWS:
            return{
                ...state,
                newsTextInitial:'',
                newsPage: [...state.newsPage, {
                    data: "02.05.21",
                    name: "Nastya", 
                    news: state.newsTextInitial}]
            }
                  
        default:
             return state
       
    }

}


export const changeNewsActionCreator = (newsText) => ({
    type: CHANGE_NEWS,
    newsText: newsText
})

export const addNewsActionCreator = () => ({
    type: ADD_NEWS
})



export default newsReducer