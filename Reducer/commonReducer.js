import { TOKEN, RECIPELIST } from "../Actions/actionType";

const initialState = {
    token: '',
    recipes: null
}

const commonReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOKEN:
            state.token = action.data;
            console.log('-> reducer token:', state);
            return state;

        case RECIPELIST:
            state.recipes = action.data;
            console.log('-> reducer recipes', state);
            return state;
            
        default:
            return state
    }
}

export default commonReducer