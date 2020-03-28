const db = require('../database/connection');
const generateUniqueID = require('../utils/generateUniqueID');

module.exports = {
    async list (req,res) {
        const ongs = await db('ongs').select('*');
        return res.json(ongs);
    },

    async create (req,res) {
        
        const { name, email, whatsapp, city, uf } = req.body;
        const id = generateUniqueID();

        await db('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        });

        return res.json({ id });
    }
}

