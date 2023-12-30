const Post = require("../models/Post")
const User = require("../models/User")
const { success, error } = require("../utils/responseWrapper")

const createPostController = async (req, res) => {
    try {
        const { caption } = req.body;
        const owner = req._id;
        const user = await User.findById(owner);

        const post = await Post.create({
            owner, caption
        })
        user.posts.push(post._id);
        await user.save();

        return res.send(success(201, post))

    } catch (e) {
        return res.send(error(500, e.message))
    }

}

const likeAndUnlikePostController = async (req, res) => {
    try {
        const { postId } = req.body;
        const currentUserId = req._id;
        console.log(req._id)

        const post = await Post.findById(postId);
        if (!post) {
            return res.send(error(404, "post not found"))
        }
        if (post.likes.includes(currentUserId)) {
            const index = post.likes.indexOf(currentUserId);
            post.likes.splice(index, 1);

            await post.save();
            return res.send(success(200, 'Post Unliked'))
        }
        else {
            post.likes.push(currentUserId);
            await post.save();
            return res.send(success(200, "Post Liked"))
        }
    } catch (e) {
        return res.send(error(500, e.message))
    }

}

const updatePostControlller = async (req, res) => {
    try {
        const { postId, caption } = req.body;
        const currentUserId = req._id;

        if(!caption){
           return res.send(error(400, "caption is required")) 
        }

        const post = await Post.findById(postId);
        if (!post) {
            return res.send(error(404, "post not found"))
        }

        if (post.owner.toString() !== currentUserId) {
            return res.send(error(403, "Only owner can update their post"));
        }

        if (caption) {
            post.caption = caption;
        }

        await post.save();
        return res.send(success(200, "Post Updated"))
    } catch (e) {
        return res.send(error(500, e.message))
    }
}

const deletePostControlller = async (req, res) => {

    try {
        const { postId } = req.body;
        const currentUserId = req._id;

        const post = await Post.findById(postId);
        const currentUser = await User.findById(currentUserId);

        if (!post) {
            return res.send(error(404, "post not found"))
        }

        if (post.owner.toString() !== currentUserId) {
            return res.send(error(403, "Only owner can delete their post"));
        }

        const index = currentUser.posts.indexOf(postId)
        currentUser.posts.splice(index, 1);

        await currentUser.save();
        await post.deleteOne();

        return res.send(success(200, 'post deleted successfully'));

    } catch (e) {
        return res.send(error(500, e.message));
    }
}

module.exports = {
    deletePostControlller,
    createPostController, 
    likeAndUnlikePostController, 
    updatePostControlller 
}