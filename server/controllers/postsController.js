const { success } = require("../utils/responseWrapper")

const getAllPostsController = (req,res) => {
    console.log(req._id)
    return res.send(success(200,"these are all posts"))
}

module.exports = {getAllPostsController}