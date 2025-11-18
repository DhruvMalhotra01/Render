// public/js/storage.js

// Save data
function saveToLocal(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Get data
function getFromLocal(key) {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

// Delete one item
function removeFromLocal(key) {
    localStorage.removeItem(key);
}

// Clear all
function clearLocal() {
    localStorage.clear();
}

document.addEventListener("DOMContentLoaded", () => {
    console.log("LocalStorage system loaded");
});