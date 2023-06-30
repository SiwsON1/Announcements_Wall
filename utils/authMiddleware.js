const authMiddleware = (req, res, next) => {
    console.log(req.session.user)
    if(req.session.user) {
        next();
    } else {
        res.status(401).send({ message: 'Unauthorized attempt' });
    }
}

module.exports = authMiddleware;