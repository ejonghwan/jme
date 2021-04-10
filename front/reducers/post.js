
import produce from 'immer'
import faker from 'faker'

export const initialState = {
    mainPosts: [],
    imagePaths: [], //이미지 업로드할 때 경로
    postAdded: false, //게시글 추가완료
    loadPostLoading: false,
    loadPostDone: false,
    loadPostError: false,
    infiniteLimit: true,
    addPostLoading: false,
    addPostDone: false,
    addPostError: null,
    removePostLoading: false,
    removePostDone: false,
    removePostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
    
}


export const generaterDummyPost = lengthData => {
    return Array(lengthData).fill().map(() => {
        return {
            id: randomKey(),
            User: {
                id: randomKey(),
                nickname: faker.name.findName(),
            },
            content: faker.lorem.paragraph(),
            Images: [
                {src: faker.image.image()},
                {src: faker.image.image()},
                {src: faker.image.image()},
            ],
            Comments: [{
                User: {
                    id: randomKey(),
                    nickname: faker.name.findName(),
                },
                content: faker.lorem.sentence(),
            }],
        }
    })
}


export const dummyPost = data => ({
    id: data.id,
    content: data.content,
    User: {
        id:"jjongrrr@naver.com",
        nickname: 'dummy post name',
    },
    Images: [],
    Comments: [],
})


// faker data,
// initialState.mainPosts = initialState.mainPosts.concat(
//     Array(20).fill().map((val, idx) => {
//         return {
//             id: randomKey(),
//             User: {
//                 id: randomKey(),
//                 nickname: faker.name.findName(),
//             },
//             content: faker.lorem.paragraph(),
//             Images: [
//                 {src: faker.image.image()},
//                 {src: faker.image.image()},
//                 {src: faker.image.image()},
//             ],
//             Comments: [{
//                 User: {
//                     id: randomKey(),
//                     nickname: faker.name.findName(),
//                 },
//                 content: faker.lorem.sentence(),
//             }],
//         }
//     })
// )

export const dummyComment = data => ({
    id: randomKey(),
    content: data,
    User: {
        id:"jjongrrr",
        nickname: 'comment name',
    },
})

export const ADD_POST_REQUEST = "ADD_POST_REQUEST"
export const ADD_POST_SUCCESS = "ADD_POST_SUCCESS"
export const ADD_POST_FAILURE = "ADD_POST_FAILURE"

export const REMOVE_POST_REQUEST = "REMOVE_POST_REQUEST"
export const REMOVE_POST_SUCCESS = "REMOVE_POST_SUCCESS"
export const REMOVE_POST_FAILURE = "REMOVE_POST_FAILURE"

export const LOAD_POST_REQUEST = "LOAD_POST_REQUEST"
export const LOAD_POST_SUCCESS = "LOAD_POST_SUCCESS"
export const LOAD_POST_FAILURE = "LOAD_POST_FAILURE"

export const ADD_COMMENT_REQUEST = "ADD_COMMENT_REQUEST"
export const ADD_COMMENT_SUCCESS = "ADD_COMMENT_SUCCESS"
export const ADD_COMMENT_FAILURE = "ADD_COMMENT_FAILURE"


function randomKey() {
    return Math.random().toString(36).substr(2)
}


export const addPost = data => {
    return {
        type: ADD_POST_REQUEST,
        data,
    }
}

export const removePost = data => {
    return {
        type: REMOVE_POST_REQUEST,
        data,
    }
}

// export const addComment = data => {
//     return {
//         type: ADD_COMMENT_REQUEST,
//         data,
//     }
// }



const reducer = (state = initialState, action) => {
    return produce(state, (draft) => {
        switch(action.type) {
            case ADD_POST_REQUEST: {
               draft.addPostLoading = true;
               draft.addPostDone = false;
               draft.addPostError = null;
               break
            }

            case ADD_POST_SUCCESS: {
                draft.mainPosts.unshift(dummyPost(action.data));
                draft.addPostLoading = false;
                draft.addPostDone = true;
                draft.addPostError = null;
                break
             }

             case ADD_POST_FAILURE: {
                draft.mainPosts.unshift(dummyPost(action.data))
                draft.addPostLoading = false;
                draft.addPostError = action.error;
                break
             }

             case REMOVE_POST_REQUEST: {
                draft.removePostLoading = true;
                draft.removePostDone = false;
                draft.removePostError = null;
                break
             }
             
             case REMOVE_POST_SUCCESS: {
                draft.mainPosts = state.mainPosts.filter(val => val.id !== action.data);
                draft.removePostLoading = false;
                draft.removePostDone = true;
                draft.removePostError = null;
                break
             }

             case REMOVE_POST_FAILURE: {
                draft.removePostLoading = false;
                draft.removePostError = action.error;
                break
             }

             case ADD_COMMENT_REQUEST: {
                 console.log(action)
                draft.addCommentLoading = true;
                draft.addCommentDone = false;
                draft.addCommentError = null;
                break
             }
         
    
            case ADD_COMMENT_SUCCESS: {
                // const post = draft.mainPosts.find(val => val.id === action.data.postId); //find는 객체 바로 
                const post = draft.mainPosts.filter(val => val.id === action.data.postId); //filter는 배열로 반환해줌
                console.log('post: ', post)
                post[0].Comments.unshift(dummyComment(action.data.content));
                draft.addCommentLoading = false;
                draft.addCommentDone = true;
                draft.addCommentError = null;
                break
                // const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
                // const post = state.mainPosts[postIndex] //댓글중에서 내가쓴 댓글 부모 찾음
                // const Comments = [dummyComment(action.data.content), ...post.Comments] //코멘트 새롭게 복사 추가
                // const mainPosts = [...state.mainPosts] //메인포스트도 복사
                // mainPosts[postIndex] = { ...post, Comments }
                // return {
                //     ...state,
                //     mainPosts,
                //     addCommentLoading: false,
                //     addCommentDone: true,
                //     addCommentError: null,
                // }
            }

            case ADD_COMMENT_FAILURE: {
                draft.addCommentLoading = false;
                draft.addCommentError = action.error;
                break
             }

            case LOAD_POST_REQUEST: {
                draft.loadPostLoading = true;
                draft.loadPostDone = false;
                draft.loadPostError = null;
                break
            }

            case LOAD_POST_SUCCESS: {
                console.log('length : ', draft.mainPosts.length)
                // console.log('length : ', action.data.concat(draft.mainPosts).length)
                draft.loadPostLoading = false;
                draft.loadPostDone = true;
                draft.loadPostError = null;
                draft.mainPosts = draft.mainPosts.concat(action.data);
                draft.infiniteLimit = draft.mainPosts.length < 50
                // draft.infiniteLimit = action.data.concat(draft.mainPosts).length < 50
                break
            }

            case LOAD_POST_FAILURE: {
                draft.loadPostLoading = false;
                draft.loadPostDone = false;
                draft.loadPostError = action.data.error;
                break
            }

            default: break   
        }
    })
}

export default reducer


// immer 쓰기전
// switch(action.type) {
//     case ADD_POST_REQUEST: {
//         return {
//             ...state,
//             addPostLoading: true,
//             addPostDone: false,
//             addPostError: null,
//         }
//     }

//     case ADD_POST_SUCCESS: {
//         return {
//             ...state,
//             mainPosts: [dummyPost(action.data), ...state.mainPosts],
//             addPostLoading: false,
//             addPostDone: true,
//             addPostError: null,
//         }
//     }

//     case ADD_POST_FAILURE: {
//         return {
//             ...state,
//             addPostLoading: false,
//             addPostError: action.error,
//         }
//     }

//     case REMOVE_POST_REQUEST: {
//         return {
//             ...state,
//             removePostLoading: true,
//             removePostDone: false,
//             removePostError: null,
//         }
//     }

//     case REMOVE_POST_SUCCESS: {
//         console.log(state)
//         return {
//             ...state,
//             mainPosts: state.mainPosts.filter(val => val.id !== action.data),
//             removePostLoading: false,
//             removePostDone: true,
//             removePostError: null,
//         }
//     }

//     case REMOVE_POST_FAILURE: {
//         return {
//             ...state,
//             removePostLoading: false,
//             removePostError: action.error,
//         }
//     }

//     case ADD_COMMENT_REQUEST: {
//         return {
//             ...state,
//             addCommentLoading: true,
//             addCommentDone: false,
//             addCommentError: null,
//         }
//     }

//     case ADD_COMMENT_SUCCESS: {
//         const postIndex = state.mainPosts.findIndex(v => v.id === action.data.postId);
//         const post = state.mainPosts[postIndex] //댓글중에서 내가쓴 댓글 부모 찾음
//         const Comments = [dummyComment(action.data.content), ...post.Comments] //코멘트 새롭게 복사 추가
//         const mainPosts = [...state.mainPosts] //메인포스트도 복사
//         mainPosts[postIndex] = { ...post, Comments }
//         return {
//             ...state,
//             mainPosts,
//             addCommentLoading: false,
//             addCommentDone: true,
//             addCommentError: null,
//         }
//     }
//     case ADD_COMMENT_FAILURE: {
//         return {
//             ...state,
//             addCommentLoading: false,
//             addCommentError: action.error,
//         }
//     }

//     default: return state  
// }



