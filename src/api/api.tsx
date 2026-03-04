

export const apiUrl = "https://dummyjson.com/"

const GetUserDetails = async (username: string | null, password: string | null, accessToken: string | null, refreshToken: string | null) => {
    if (accessToken || refreshToken) {
        try {

            const data = await fetch(`${apiUrl}auth/me`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
                credentials: 'omit'
            })
                .then(res => res.json())
            console.log("usingAccessToken", data)

            return data

        } catch {
            console.log("data not fetch")
        }

    } else if (username && password) {
        const data = await fetch(`${apiUrl}/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                username: username,
                password: password,

            }),
        })
            .then(res => res.json())
        console.log("api", data)
        return data
    }
}



const GetUserTodos = async (userId: number) => {
    if (userId === null) {
        throw new Error("Invalid userId");
    }
    const data = await fetch(`${apiUrl}users/${userId}/todos`)
        .then(res => res.json())

    return (data)
}



export { GetUserDetails }
export { GetUserTodos }

