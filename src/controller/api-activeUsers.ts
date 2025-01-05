const setAUserOnline = async (name,id) => {
    console.log(name,id)
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/api/status/online`,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({name,id})
        })
        const data = await response.json()
        return data
    } catch (err) {
        throw new Error(`Unable to set a user online ${err}`)
    }
}


const checkOnlineUsers = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/api/status/online-users`)
        const data = await response.json()
        console.log(data)
        return data
    } catch (err) {
        throw new Error(`Unable to fetch how many users are online ${err}`)
        
    }
}


const setAUserOffline = async (name) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/api/status/offline`,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({name})
        })
        const data = await response.json()
        console.log(data)
        return data
    } catch (err) {
        throw new Error(`Unable to set a user offline ${err}`)
    }
}

const callCut = async (name) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/api/status/user/call/cut`,{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({name})
        })
        const data = await response.json()
        console.log(data)
        return data
    } catch (err) {
        throw new Error(`Unable to cut a call ${err}`)
    }
}

export {setAUserOnline,checkOnlineUsers,setAUserOffline,callCut}




