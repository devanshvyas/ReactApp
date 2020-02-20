import { TOKEN, RECIPELIST } from "./actionType"

export function onGetToken(token) {
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
