
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 3001;


app.use(cors());
app.use(express.json());




const mongoURI = 'mongodb+srv:


mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => console.error('MongoDB connection error:', err));


const tagSchema = new mongoose.Schema({
    isOpen: Boolean,
    tagTitle: String,
    tagColor: String
});

const cardSchema = new mongoose.Schema({
    
    desc: { type: String, required: true },
    filesize: { type: String, required: true },
    close: Boolean,
    tag: tagSchema, 
    createdAt: { type: Date, default: Date.now } 
});

const Card = mongoose.model('Card', cardSchema); 




app.get('/api/cards', async (req, res) => {
    console.log("GET /api/cards request received");
    try {
        const cards = await Card.find().sort({ createdAt: -1 }); 
        
        const cardsWithId = cards.map(card => {
            const { _id, ...rest } = card.toObject(); 
            return { id: _id.toString(), ...rest };
        });
        res.json(cardsWithId);
    } catch (error) {
        console.error("Error fetching cards from DB:", error);
        res.status(500).json({ message: "Failed to fetch cards", error: error.message });
    }
});


app.post('/api/cards', async (req, res) => {
    console.log("POST /api/cards request received with body:", req.body);
    const { desc, filesize, close, tag } = req.body;

    
    if (!desc || !filesize) {
        return res.status(400).json({ message: "Description and filesize are required." });
    }

    try {
        const newCard = new Card({
            desc,
            filesize,
            close: close !== undefined ? close : false,
            tag: {
                isOpen: tag?.isOpen !== undefined ? tag.isOpen : false,
                tagTitle: tag?.tagTitle || "New Tag",
                tagColor: tag?.tagColor || "gray"
            }
        });

        const savedCard = await newCard.save();
        const { _id, ...rest } = savedCard.toObject();
        res.status(201).json({ id: _id.toString(), ...rest }); 
    } catch (error) {
        console.error("Error saving card to DB:", error);
        res.status(500).json({ message: "Failed to save card", error: error.message });
    }
});



app.delete('/api/cards/:id', async (req, res) => {
    const cardId = req.params.id;
    console.log(`DELETE /api/cards/${cardId} request received`);

    try {
        
        if (!mongoose.Types.ObjectId.isValid(cardId)) {
            return res.status(400).json({ message: "Invalid card ID format." });
        }

        const deletedCard = await Card.findByIdAndDelete(cardId);

        if (!deletedCard) {
            return res.status(404).json({ message: "Card not found." });
        }

        res.status(200).json({ message: "Card deleted successfully.", id: cardId });
        
        
    } catch (error) {
        console.error("Error deleting card from DB:", error);
        res.status(500).json({ message: "Failed to delete card", error: error.message });
    }
});




app.listen(port, () => {
    console.log(`Backend server listening at http:`)
});