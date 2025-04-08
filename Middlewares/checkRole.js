
function checkRole(requiredRole) {
    return (req, res, next) => {
        // Check if the user is authenticated (i.e., token was verified)
        if (req.user && req.user.role === requiredRole) {
            return next(); // User has the required role, proceed to the next middleware or route
        } else {
            return res.status(403).json({ message: 'Forbidden: You do not have the required role' });
        }
    };
}

module.exports = { checkRole }