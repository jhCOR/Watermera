var tem;
module.exports = function (router, passport) {

    router.route('/').get(function (req, res) {
		console.log("/:path")
        res.render('index.ejs');
        
    });

    router.route('/login').get(function (req, res) {
        console.log('/login 패스 요청됨.');
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // 회원가입 화면
    router.route('/signup').get(function (req, res) {
        console.log('/signup 패스 요청됨.');
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    router.route('/signupAdmin').get(function (req, res) {
        console.log('/signupAdmin 패스 요청됨.');
        res.render('signupAdmin.ejs', { message: req.flash('signupMessage') });
    });
	
    // 로그아웃
    router.route('/logout').get(function (req, res) {
        console.log('/logout 패스 요청됨.');
        req.logout();
        res.redirect('/');
    });

    // 로그인 인증
    router.route('/login').post(
        passport.authenticate('local-login', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true,
        })
    );

    // 회원가입 인증
    router.route('/signup').post(
        passport.authenticate('local-signup', {
            successRedirect: '/profile',
            failureRedirect: '/signup',
            failureFlash: true,
        })
    );

    router.route('/signupAsAdmin').post(
        passport.authenticate('local_signup_admin', {
            successRedirect: '/profile',
            failureRedirect: '/signupAsAdmin',
            failureFlash: true,
        })
    );
};

