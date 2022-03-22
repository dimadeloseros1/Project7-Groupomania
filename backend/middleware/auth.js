const jsonwebtoken = require('jsonwebtoken');
const dotenv = require('dotenv').config({path: './config/.env', encoding: "latin1"});

// Un middleware est un bloc de code qui traite les requêtes et réponses de votre application.
module.exports = (req, res, next) => {
    try {
    // .split(' ')[1]

        const token = req.headers.authorization;
        const decodedToken = jsonwebtoken.decode(token, process.env.TOKEN_KEY);
        const uuidUserToken = decodedToken.uuidUser;
        const isAdminToken = decodedToken.isAdmin;
        
        req.auth = {uuidUserToken: uuidUserToken};
        req.isAdmin = {isAdminToken: isAdminToken};
        if (req.body.uuid && req.body.uuid !== uuidUserToken) {
            return res.status(401).json({message: "invalid ID user"})
        } else {
            next();
        }
    } catch {
        return res.status(400).json({
            message : 'Invalid request!'
        });
    }
};