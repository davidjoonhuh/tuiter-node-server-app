import * as usersDao from "./users-dao.js";


const AuthController = (app) => {
    const register = (req, res) => {
        const username = req.body.username;
        const user = usersDao.findUserByUsername(username);
        if (user) {
            res.sendStatus(409);
            return;
        }
        const newUser = req.body;
        const newUserId = usersDao.createUser(newUser)
        req.session["currentUser"] = newUserId
        console.log(req.session["currentUser"]);
        console.log("new user:")
        console.log(newUser)
        res.json(newUser)
    };

    const login = (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        const user = usersDao.findUserByCredentials(username, password);
        if (user) {
            req.session["currentUser"] = user;
            res.json(user);
        } else {
            res.sendStatus(404);
        }
    };

    const profile = (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.sendStatus(404);
            console.log("Not current user")
            return;
        }
        console.log("Current user valid")
        console.log(currentUser)
        res.json(currentUser);
    };

    const logout = async (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    };

    const update = (req, res) => { 
        const userId = req.params['uid'];
        const newUser = usersDao.updateUser(userId, req.body);
        req.session["currentUser"] = usersDao.findUserById(userId);
        if (newUser) {
            console.log('Updating user:', newUser);
            res.json(newUser);
            console.log(newUser);
          } else {
            console.log('Failed');
            res.sendStatus(404);
        }
    };

    app.post("/api/users/register", register);
    app.post("/api/users/login", login);
    app.post("/api/users/profile", profile);
    app.post("/api/users/logout", logout);
    app.put("/api/users/update/:uid", update);
};
export default AuthController;

