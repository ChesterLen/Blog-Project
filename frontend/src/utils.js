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

export async function getPublications() {
    const res = await fetch("http://localhost:8000/api/publication/list")
    const data = await res.json()
    return data.reverse()
}

export async function getPublication(id) {
    const res = await fetch(`http://localhost:8000/api/publication/detail/${id}`)
    const data = await res.json()
    return data
}

export async function getProfiles() {
    const res = await fetch("http://localhost:8000/api/profiles/list")
    const data = await res.json()
    return data
}

export async function getProfile(id) {
    const res = await fetch(`http://localhost:8000/api/profile/${id}`)
    const data = await res.json()
    return data
}

export async function getLoggedInProfile() {
    const res = await fetch("http://localhost:8000/api/profile/loggedin/", {
        method: "post",
        credentials: "include",
        headers: {
            "X-CSRFToken": getCookie()
        }
    })
    const data = await res.json()
    return data
}

export async function getLikes() {
    const res = await fetch("http://localhost:8000/api/like")
    const data = await res.json()
    return data
}