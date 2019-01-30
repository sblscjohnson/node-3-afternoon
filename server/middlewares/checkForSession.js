module.exports = (req, res, next) => {
    const {session} = req;
    if(!session.username) {
      session.user = {username: '', cart: [], total: 0.00}
    }
    next();
}