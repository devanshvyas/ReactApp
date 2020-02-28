import { createStore, combineReducers } from 'redux'
import userReducer from './Reducer/userReducer'
import recipeReducer from './Reducer/recipeReducer'

export default store = createStore(
    combineReducers({
        userReducer,
        recipeReducer
    })
)