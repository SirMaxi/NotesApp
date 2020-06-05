const usersCtrl = {};

const User = require('../models/User');
const passport = require('passport');

usersCtrl.renderSignUpForm = (req, res) => {
    res.render('users/signup');
};

usersCtrl.signup = async (req, res) => {
    let errors = [];

    const {name, email, password, confirm_password} = req.body;
    if(name.length < 1){
        errors.push({text: 'El campo nombre no puede estar vacio.'});
    }
    if(email.length < 1){
        errors.push({text: 'El campo email no puede estar vacio.'});
    }
    if(password != confirm_password) {
        errors.push({text: 'Las contraseñas no coinciden'});
    }
    if(password.length < 4) {
        errors.push({text: 'La contraseña debe contener minimo 4 caracteres'});
    }
    if(errors.length > 0){
        res.render('users/signup',{
            errors,
            name,
            email,
            password,
            confirm_password
        });
    }else{
        const emailUser = await User.findOne({email: email});
        if(emailUser){
            req.flash('error_msg', 'El mail ingresado ya se encuentra en uso');
            res.redirect('/users/signup');
        }else{
            const newUser = new User({ name, email, password });
            newUser.password = await newUser.encryptPassword(password);
            await newUser.save();
            req.flash("success_msg", "Te has registrado Exitosamente.");
            res.redirect("/users/signin");
        }
    }
};

usersCtrl.renderSigninForm = (req, res) => {
    res.render('users/signin');
};

usersCtrl.signin = passport.authenticate("local", {
    successRedirect: "/notes",
    failureRedirect: "/users/signin",
    failureFlash: true
});

usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'Cierre de sesión exitoso.');
    res.redirect('/users/signin');
};


module.exports = usersCtrl;