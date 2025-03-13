import { chatSession } from "../services/IAModal.js";
class TripController {
    static async createTrip(req, res) {
        try {
            const { userPrompt } = req.body;
            const result = await chatSession.sendMessage(userPrompt);
            const responseText = await result.response.text();
            
            // Format the response as valid JSON
            const formattedResponse = {
                success: true,
                data: {
                    response: {
                        text: responseText
                    }
                }
            };
            res.json(formattedResponse);
        } catch (error) {
            console.error("Error creating trip:", error);
            res.status(500).json({ error: "Failed to generate travel plan." });
        }
    }
    
}

export default TripController;
