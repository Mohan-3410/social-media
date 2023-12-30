const { followOrUnfollowUserController, getPostsOfFollowingController, getMyPostController, getUserPostsController, deleteUserProfileController } = require('../controllers/userController');
const requireUser = require('../middleware/requireUser');

const router = require('express').Router();

router.post('/follow', requireUser, followOrUnfollowUserController);
router.get('/getPostsOfFollowing', requireUser, getPostsOfFollowingController);
router.get('/getMyPosts', requireUser, getMyPostController);
router.get('/getUserPosts', requireUser, getUserPostsController)
router.delete('/', requireUser, deleteUserProfileController);
module.exports = router;