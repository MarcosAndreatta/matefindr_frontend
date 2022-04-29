export const getPoints = async () => {
    try {
        let lugares = [];
        const preliminaryData = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/places/show`);
        
        if (!preliminaryData.ok) {
            throw new Error("Error getting response")
        };
        const response = await preliminaryData.json();
        for (let i=0; i<response.length; i++) {
            const point = {
                nombre: response[i].nombre,
                ubicacion: [response[i].ubicacion[0], response[i].ubicacion[1]],
                _id: response[i]._id,
                autor_id: response[i].author
            };
            lugares.push(point)
        };
        return lugares 
    }
    catch (e) {throw e}
};
export const getPlace = async (id:string) => {
    try {
        const preliminaryResponse = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/places/show/${id}`);
        if (!preliminaryResponse.ok) {
            throw new Error("Error getting response")
        };
        const response = await preliminaryResponse.json();
        return response
    } catch (error: any) {
        return "Failed fetching"
    }
};