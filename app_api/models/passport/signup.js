var mongoose = require('mongoose');
// load all the things we need about local strategy.
var LocalStrategy   = require('passport-local').Strategy;
// load up the user model
var User = mongoose.model('User');
// load up the bcrypt to generate the hash
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
		// by default, local strategy uses username and password, we will override with email
		usernameField: 'email',
		passwordField: 'password',
	    passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    function(req, email, password, done) {

        findOrCreateUser = function(){
            // find a user in Mongo with provided username
            User.findOne({ 'email' :  email }, function(err, user) {
                // In case of any error, return using the done method
                if (err){
                    console.log('Error in SignUp: '+err);
                    return done(err);
                }
                // already exists
                if (user) {
                    console.log('The current email address has been used:' + email);
                    return done(null, false, req.flash('message','The current email address has been used:'));
                } else {
                    // if there is no user with that email
                    // create the user
                    var newUser = new User();

                    // set the user's local credentials
                    newUser.username = req.body.username;
                    newUser.password = createHash(password);
                    newUser.email = email;

                    // save the user
                    newUser.save(function(err) {
                        if (err){
                            console.log('Error in Saving user: '+err);  
                            throw err;  
                        }
                        console.log('User Registration succesful');    
                        return done(null, newUser);
                    });
                }
            });
        };
        // Delay the execution of findOrCreateUser and execute the method
        // in the next tick of the event loop
        process.nextTick(findOrCreateUser);
    })
);

// Generates hash using bCrypt
var createHash = function(password){
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

}