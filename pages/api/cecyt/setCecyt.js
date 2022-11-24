import withSessionCecyt from "../../../lib/cecyt";

export default withSessionCecyt( async (req, res) => {
    switch (req.method) {
        case "POST":
            try{
               
                await saveCecyt(req.body, req)
                return res.status(200).json({ message: "Accepted", status: 200 })

            } catch (error) {
                return res.status(200).json({ message: "Error", result: error , status: 408})
            }
        case "GET":
            return res.status(400).json({ menssege: "Bad request", status: 400 })
    }
})

const saveCecyt = async (cecyt, request) => {
    request.session.set("cecyt", cecyt)
    await request.session.save()
}