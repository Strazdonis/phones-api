module.exports = (router) => {
    const rp = require("request-promise");
    router.route('/contacts')
        .get(function (req, res) {

            const options = {
                method: "GET",
                uri: "http://contacts:5000/contacts",
                json: true,
            };

            rp(options)
                .then(function (data) {
                    res.status(200).send(data);
                })
                .catch(function (err) {
                    res.status(500).send(err);
                });
        })
        // create a contact
        .post(function (req, res) {
            const body = req.body;
            if(!body.id || !body.name || !body.surname || !body.number || !body.email) return res.status(400).json({error: "Invalid body. Must contain id, name, surname, number, email."});
            const options = {
                method: "POST",
                uri: "http://contacts:5000/contacts",
                json: true,
                body: body,
            };

            rp(options)
                .then(function (data) {
                    res.status(200).send(data);
                })
                .catch(function (err) {
                    res.status(500).send(err);
                });

        });

};