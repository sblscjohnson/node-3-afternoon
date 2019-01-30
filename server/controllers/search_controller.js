const swag = require('./../models/swag')

module.exports = {
  search: (req, res, next) => {
    const {category} = req.query;
    if(!category) {
      res.status(200).send(swag)
    } else {
      res.status(200).send(swag.filter((swag) => {
        return (swag.category === category)
      }))
    }
  }
}