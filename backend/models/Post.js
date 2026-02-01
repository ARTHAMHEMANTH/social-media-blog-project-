const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    text: {
        type: String,
        required: [true, 'Comment text is required'],
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    content: {
        type: String,
        trim: true,
        maxlength: [1000, 'Post content cannot exceed 1000 characters']
    },
    image: {
        type: String  // URL or path to uploaded image
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    comments: [commentSchema]
}, {
    timestamps: true
});

// Validation: Either content or image must be present
postSchema.pre('validate', function () {
    if (!this.content && !this.image) {
        this.invalidate('content', 'Either content or image must be provided');
    }
});

module.exports = mongoose.model('Post', postSchema);
