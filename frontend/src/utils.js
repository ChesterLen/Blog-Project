export function getCookie() {
    const cookie = document.cookie
    
    const csrfToken = cookie.split("=")[1]
    return csrfToken
}