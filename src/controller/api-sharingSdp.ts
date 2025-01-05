const sendOffer = async (senderName, acceptor, offer) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/api/interview/sdp/offer`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ senderName,acceptor,offer }),
          })
        const data = await response.json()
        console.log(data)
        return data
    } catch (err) {
        throw new Error(`Unable to send offer ${err}`)
    }
}

const accessOffer = async (name) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/api/interview/sdp/access/offer`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
          })
        const data = await response.json()
        console.log(data)
        return data
    } catch (err) {
        throw new Error(`Unable to access offer ${err}`)
    }
}

const sendAnswer = async (name,acceptor,answer) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/api/interview/sdp/answer`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name,acceptor,answer }),
          })
        const data = await response.json()
        console.log(data)
        return data
    } catch (err) {
        throw new Error(`Unable to s
            end answer ${err}`)
            
    }
}

const accessAnswer = async (name) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/api/interview/sdp/access/answer`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
          })
        const data = await response.json()
        console.log("accessAnswer",data)
        return data
    } catch (err) {
        throw new Error(`Unable to access answer ${err}`)
    }
}


export {sendOffer,accessOffer,sendAnswer,accessAnswer}


