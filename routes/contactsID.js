module.exports = (router) => {
    const rp = require("request-promise");
    router.route('/contacts/:contact_id')
        .get(function (req, res) {
            const options = {
                method: "GET",
                uri: `http://contacts:5000/contacts/${req.params.contact_id}`,
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
        .put(function (req, res) {
            const body = req.body;
            if(!body.name || !body.surname || !body.number || !body.email) return res.status(400).json({error: "Invalid body. Must contain name, surname, number, email."});
            const options = {
                method: "PUT",
                uri: `http://contacts:5000/contacts/${req.params.contact_id}`,
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
        })
        .delete(function (req, res) {
            const options = {
                method: "DELETE",
                uri: `http://contacts:5000/contacts/${req.params.contact_id}`,
                json: true,
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