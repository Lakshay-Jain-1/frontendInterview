const gettingAquestion = async (questioID) => {
    try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_SERVER_URL}/technical/question/${questioID}`)
        const data = await response.json()
        return data[0]
    } catch (err) {
        throw new Error(`Unable to fetch a question ${err}`)
    }
}

const submitAquestion = async (sourceCode: string, languageId: number) => {
    try {
        console.log("sourceCode",sourceCode,languageId,"languageOD","frontend")
        const response = await fetch(
            `${import.meta.env.VITE_BACKEND_SERVER_URL}/technical/question/execute`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json', // Important for sending JSON data
              },
              body: JSON.stringify({ sourceCode, languageId }),
            }
          );
      
        const data = await response.json()
        return data
    } catch (err) {
        throw new Error(`Unable to fetch a question ${err}`)
    }
}

export { gettingAquestion, submitAquestion }

