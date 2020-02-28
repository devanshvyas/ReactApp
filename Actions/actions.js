import { TOKEN, RECIPELIST } from "./actionType"

export function onGetToken(token) {
    console.log('dispatch token');
    
    return {
        type: TOKEN,
        data: token
    }
}

export function onGetRecipes(recipes) {
    return {
        type: RECIPELIST,
        data: recipes
    }
}
