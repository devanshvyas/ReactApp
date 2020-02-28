import { TOKEN, FAVRECIPES } from "../Actions/actionType";

const initialState = {
    token: '',
    favRecipes: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOKEN:
            state.token = action.data;
            console.log('-> reducer token:', state);
            return state;

        // case FAVRECIPES:
        //     state.favRecipes = action.data;
        //     console.log('-> reducer FAVRECIPES:', state.favRecipes);
        //     return state;
            
        default:
            return state
    }
}

export default userReducer