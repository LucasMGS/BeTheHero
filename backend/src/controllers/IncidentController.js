const db = require('../database/connection');

module.exports = {
    async list (req,res) {
        const { page = 1 } = req.query;
        const [totalIncidents] = await db('incidents').count();

        const incidents = await db('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select('incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf');

        res.header('X-Total-Incidents', totalIncidents['count(*)']);        
        return res.json(incidents);
    },

    async create (req,res) {
        const { title, description, value } = req.body;
        const ong_id = req.headers.authorization;

        const [id] = await db('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return res.json({ id });
    },

    async delete (req,res) {
        const ong_id = req.headers.authorization;
        const { id } = req.params;

        const incident = await db('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        if (incident.ong_id != ong_id) 
            return res.status(401).json({ error: 'Operation not permitted!'});
        
        await db('incidents').where('id', id).delete();

        return res.status(204).send();
    }
}