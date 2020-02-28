import { RECIPELIST } from "../Actions/actionType";

const initialState = {
    recipes: null
}

const recipeReducer = (state = initialState, action) => {
    switch (action.type) {
        case RECIPELIST:
            state.recipes = action.data;
            console.log('-> reducer recipes', state);
            return state;
            
        default:
            return state
    }
}

export default recipeReducer