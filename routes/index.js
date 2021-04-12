module.exports = (router) => {
    router.get('/', function (req, res) {
        res.status(200).json({ message: 'available endpoints: /phones /manufacturers' });
    });
};