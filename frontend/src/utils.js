export function getCookie() {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";")
        for (let cookie of cookies) {
            cookie = cookie.trim()
            if (cookie.startsWith("csrftoken" + "=")) {
                cookieValue = decodeURIComponent(cookie.substring("csrftoken".length + 1))
                break
            }
        }
    }
    return cookieValue
}