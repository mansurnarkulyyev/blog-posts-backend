import jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, ''); // уберает  слово токен 

    if (token) {
        try {
            const decoded = jwt.verify(token, 'secret123'); //расшифровка токена 
            
            req.userId = decoded._id;
            next();
        } catch (e) {
            return res.status(403).json({
                message: 'No token access ',
            });
        }
    } else {
        return res.status(403).json({
            message: 'No access',
        });
    }
};





