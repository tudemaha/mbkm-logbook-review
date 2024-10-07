export function getJsonItem(name) {
    const user = localStorage.getItem(name);
    if(!user) return null;

    const userParse = JSON.parse(user);
    return userParse;
}