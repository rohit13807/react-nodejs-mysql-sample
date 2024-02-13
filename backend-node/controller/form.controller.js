module.exports = {
    contactUs: async (req, res) => {
        try {
            let { name, email, note } = req.body;
            await connection$(`INSERT INTO contact_us (name, email, note) values (?, ?, ?)`, [name, email, note], { debug: true });

            res.status(200).send({ status: 200, message: 'Detail sent successfully.' });
        } catch (error) {
            res.send({ status: 401, message: `Something went wrong: ${error}` });
        }
    },


}