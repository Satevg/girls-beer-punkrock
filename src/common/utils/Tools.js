const FAVORITES_KEY = "favs";

export function getFavorites() {
    let favorites = localStorage.getItem(FAVORITES_KEY);
    if (!favorites) return [];
    return JSON.parse(favorites);
}

export function setFavorites(favorites) {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
}
