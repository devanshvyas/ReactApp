import { USERDATA, FAVRECIPES, FULLNAME } from "../Actions/actionType";

const initialState = {
    fullName: '',
    token: null,
    favRecipes: null,
    email: ''
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case USERDATA:
            state.token = action.data.token;
            state.fullName = action.data.firstName + ' ' + action.data.lastName;
            state.email = action.data.email;
            console.log('-> reducer userdata:', action.data);
            return state;

        case FAVRECIPES:
            state.favRecipes = action.data;
            console.log('-> reducer FAVRECIPES:', state.favRecipes);
            return state;
        
            default:
            return state
    }
}

export default userReducer