// importation de password-validator 
const passwordValidator = require("password-validator");

// Creation du schéma 
const passwordSchema = new passwordValidator();

// le mdp doit respecter ce schéma
passwordSchema
    .is().min(8)                                    // Minimum length 8
    .is().max(40)                                   // Maximum length 40
    .has().uppercase()                              // Must have uppercase letters
    .has().lowercase()                              // Must have lowercase letters
    .has().digits(2)                                // Must have at least 2 digits
    .has().not().spaces()                           // Should not have spaces
    .is().not().oneOf(['Passw0rd', 'Password123']); //blacklist these values

module.exports = (req, res, next) => {
    if (passwordSchema.validate(req.body.password)) {
        next();
    } else {
        return res.status(400).json({ error: `Le mot de passe n'est pas assez fort ${passwordSchema.validate('req.body.password', { list: true })}` })
    }
}