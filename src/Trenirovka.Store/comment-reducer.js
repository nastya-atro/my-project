const ADD_COMMENT = 'ADD_COMMENT'
const CHANGE_COMMENT = 'CHANGE_COMMENT'

let initialState = {
    comment: [
        { id: "Nastya", comment: "Beautiful!" },
        { id: "Zenia", comment: "So preeeeeeeeeeeeeeeeetty!" },
        { id: "Veronika", comment: "I love you!" },
        { id: "Evgeni", comment: "woooooooooowwwww!" },

    ],
    newCommentText: "comment"
}

const commentReducer = (state = initialState, action) => {
    switch (action.type) {

        case ADD_COMMENT:
            
                return {
                    ...state,
                    newCommentText:'',
                    comment:[...state.comment, { id: "Nastya", comment: state.newCommentText }
                    ]
                }

        case CHANGE_COMMENT: 

            return {
                ...state,
                newCommentText: action.newComment
            }

        default:
            return state
    }

}

export const addCommentActionCreator = () => ({
    type: ADD_COMMENT
})

export const changeCommentActionCreator = (newPost) => ({
    type: CHANGE_COMMENT,
    newPost: newPost
})

export default commentReducer