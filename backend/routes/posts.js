const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Post = require('../models/Post');
const auth = require('../middleware/auth');

// Configure multer for image uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, 'post-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);

        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

// @route   POST /api/posts
// @desc    Create a new post
// @access  Private
router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        const { content } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : null;

        // Validate: either content or image must be present
        if (!content && !image) {
            return res.status(400).json({ message: 'Post must contain text or an image' });
        }

        const post = new Post({
            user: req.userId,
            content: content || '',
            image: image
        });

        await post.save();

        // Populate user details before sending response
        await post.populate('user', 'username email');

        res.status(201).json({
            message: 'Post created successfully',
            post
        });
    } catch (error) {
        console.error('Create post error:', error);
        res.status(500).json({ message: 'Error creating post', error: error.message });
    }
});

// @route   GET /api/posts
// @desc    Get all posts
// @access  Public
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find()
            .populate('user', 'username email')
            .populate('comments.user', 'username')
            .sort({ createdAt: -1 }); // Most recent first

        res.json(posts);
    } catch (error) {
        console.error('Get posts error:', error);
        res.status(500).json({ message: 'Error fetching posts', error: error.message });
    }
});

// @route   PUT /api/posts/:id/like
// @desc    Toggle like on a post
// @access  Private
router.put('/:id/like', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if user already liked the post
        const likeIndex = post.likes.indexOf(req.userId);

        if (likeIndex > -1) {
            // Unlike: remove user from likes array
            post.likes.splice(likeIndex, 1);
        } else {
            // Like: add user to likes array
            post.likes.push(req.userId);
        }

        await post.save();
        await post.populate('user', 'username email');
        await post.populate('comments.user', 'username');

        res.json({
            message: likeIndex > -1 ? 'Post unliked' : 'Post liked',
            post
        });
    } catch (error) {
        console.error('Like post error:', error);
        res.status(500).json({ message: 'Error liking post', error: error.message });
    }
});

// @route   POST /api/posts/:id/comment
// @desc    Add a comment to a post
// @access  Private
router.post('/:id/comment', auth, async (req, res) => {
    try {
        const { text } = req.body;

        if (!text || text.trim() === '') {
            return res.status(400).json({ message: 'Comment text is required' });
        }

        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        post.comments.push({
            user: req.userId,
            text: text.trim()
        });

        await post.save();
        await post.populate('user', 'username email');
        await post.populate('comments.user', 'username');

        res.json({
            message: 'Comment added successfully',
            post
        });
    } catch (error) {
        console.error('Comment error:', error);
        res.status(500).json({ message: 'Error adding comment', error: error.message });
    }
});

// @route   DELETE /api/posts/:id
// @desc    Delete a post
// @access  Private (only post owner)
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if user is the post owner
        if (post.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not authorized to delete this post' });
        }

        await Post.findByIdAndDelete(req.params.id);

        res.json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error('Delete post error:', error);
        res.status(500).json({ message: 'Error deleting post', error: error.message });
    }
});

// @route   PUT /api/posts/:id
// @desc    Update a post
// @access  Private (only post owner)
router.put('/:id', auth, upload.single('image'), async (req, res) => {
    try {
        const { content } = req.body;
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Check if user is the post owner
        if (post.user.toString() !== req.userId) {
            return res.status(403).json({ message: 'Not authorized to update this post' });
        }

        // Update fields
        if (content !== undefined) {
            post.content = content;
        }
        if (req.file) {
            post.image = `/uploads/${req.file.filename}`;
        }

        await post.save();
        await post.populate('user', 'username email');
        await post.populate('comments.user', 'username');

        res.json({
            message: 'Post updated successfully',
            post
        });
    } catch (error) {
        console.error('Update post error:', error);
        res.status(500).json({ message: 'Error updating post', error: error.message });
    }
});

module.exports = router;
