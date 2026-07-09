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
    const res = await fetch("http://localhost:8000/api/profile/loggedin", {
        credentials: "include"
    })
    const data = await res.json()
    return data
}

export async function getComments() {
    const res = await fetch("http://localhost:8000/api/comment/list")
    const data = await res.json()
    return data
}

export async function getReplies() {
    const res = await fetch("http://localhost:8000/api/comment/reply")
    const data = await res.json()
    return data
}

export async function like(id, className, profileLiker) {
    const res = await fetch("http://localhost:8000/api/like/", {
        method: "post",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCookie()
        },
        body: JSON.stringify({ id: id, "className": className, "profileId": profileLiker })
    })

    const data = await res.json()   
    return data
}

export async function getLikes() {
    const res = await fetch("http://localhost:8000/api/likes")
    const data = await res.json()
    return data
}