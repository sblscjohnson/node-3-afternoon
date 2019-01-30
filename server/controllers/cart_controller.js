const swag = require('../models/swag');

module.exports = {
  add: (req, res, next) => {
    const {id} = req.query;
    let {cart} = req.session.user;

    const index = cart.findIndex((swag) => {
      return (swag.id == id)
    });

    if (index === -1) {
      const swagItem = swag.find((swag) => {
        return (swag.id == id)
      });

      cart.push(swagItem);
      req.session.user.total += swagItem.price;
    }
    res.status(200).send(req.session.user);
  },

  delete: (req, res, next) => {
    const {id} = req.query;
    const {cart} = req.session.user;
    
    const swagItem = swag.find((swag) => {
      return (swag.id == id)
    });

    if (swagItem) {
      let index = cart.findIndex(swag => {
        return (swag.id == id)
      });
      cart.splice(index, 1);
      req.session.user.total -= swagItem.price;
    }
    
    res.status(200).send(req.session.user);
  },

  checkout: (req, res, next) => {
    const {user} = req.session;
    user.cart = [];
    user.total = 0;

    res.status(200).send(req.session.user);
  }
} 