
const CREATE_TEST = "CREATE_TEST"

const defaultState = {
    test:'',
    questions:[]
}


export default function testReducer(state = defaultState, action){
    switch (action.type){
        case CREATE_TEST:
            return {
                ...state,
                test: action.payload.test,
                questions: action.payload.questions
            }
        default:
            return state
    }
}

export const createTest = (test,questions) => ({type:CREATE_TEST,payload:{test,questions}})