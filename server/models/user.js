var _ = require('lodash');
var bcrypt = require('bcrypt');

var defaults = {
    userName: null,
    firstName: null,
    lastName: null,
    passwordHash: null,
    passwordSalt: null
}

function user(data) {
    var self = this;

    // Sets the default values, defined above, to the data object we are passing in.
    _.defaults(data, defaults);

    self.userName = data.userName;
    self.firstName = data.firstName;
    self.lastName = data.lastName;
    self.passwordHash = data.passwordHash;

    self.passwordValid = _passwordValid;
    self.hashPassword = _hashPassword;

    return self;

    ////////////

    function _passwordValid(password) {
        return bcrypt.compareSync(password, self.passwordHash);
    }

    function _hashPassword(password){
        var salt = bcrypt.genSaltSync(10);
        self.passwordHash = bcrypt.hashSync(password, salt);
    }
}

module.exports = user;