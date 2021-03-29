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
}

export const addPost = {
    type: "ADD_POST",
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
        case "ADD_POST":
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true,
            }

        default: return state  
    }
}


export default reducer