export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 'jjongrrr',
            nickname: '종환'
        },
        content: '첫번째 게시글 #해시 #익스',
        Images: [{
            src:'http://placehold.it/320x100',
        }, {
            src:'http://placehold.it/320x100',
        },{
            src:'http://placehold.it/320x100',
        }],
        Comments: [{
            User: {
                nickname: 'aa',
            },
            content: 'aa aasdasdasd'
        },
        {
            User: {
                nickname: 'bb',
            },
            content: 'bb aasdasdasd'
        },
        {
            User: {
                nickname: 'aa',
            },
            content: 'bb aasdasdasd'
        }]
    }],
    imagePaths: [], //이미지 업로드할 때 경로
    postAdded: false, //게시글 추가완료
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
}


export const ADD_POST_REQUEST = "ADD_POST_REQUEST"
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS"
export const ADD_POST_FAILURE = "ADD_POST_FAILURE"

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST"
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS"
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE"




export const addPost = data => {
    return {
        type: ADD_POST_REQUEST,
        data,
    }
}

export const addComment = data => {
    return {
        type: ADD_COMMENT_REQUEST,
        data,
    }
}

export const dummyPost = {
    id: 2,
    content: '더미데이터입니다',
    User: {
        id:"jjongrrr",
        nickname: 'name',
    },
    Images: [],
    Comments: [],
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case ADD_POST_REQUEST:
            return {
                ...state,
                addPostLoading: true,
                addPostDone: false,
                addPostError: null,
            }

        case ADD_POST_SUCCESS:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                addPostLoading: false,
                addPostDone: true,
                addPostError: null,
            }

        case ADD_POST_FAILURE:
            return {
                ...state,
                addPostLoading: false,
                addPostError: action.error,
            }


        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                addCommentLoading: true,
                addCommentDone: false,
                addCommentError: null,
            }

        case ADD_COMMENT_SUCCESS:
            return {
                ...state,
                addCommentLoading: false,
                addCommentDone: true,
                addCommentError: null,
            }

        case ADD_COMMENT_FAILURE:
            return {
                ...state,
                addCommentLoading: false,
                addCommentError: action.error,
            }

        default: return state  
    }
}


export default reducer