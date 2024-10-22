//sets up password with a local authenticatioooo atrategy , using a Person model for use


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/Person')  // Adjust the path as needed

passport.use(new LocalStrategy(async(username, password, done) =>{
        try {
                // console.log('Received credentials:',username,password);
                const user = await Person.findOne({username});
                if (!user)
                        return done (null, false,{message: 'Incorrect username.'} ) ;

                const isPasswordMatch = await user.comparedPassword(password);
                if(isPasswordMatch)
                        return done (null , user);
                else
                    return done (null, false,{message:'Incorrect username.'})
                
        } catch (error) {
                return done (error);
                
        }
}));

module.exports = passport;   //Exports configured passport