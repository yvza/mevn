var mongoose=require('mongoose');
var itemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    price: Number,
    pic: String
}, {
    timestamps: true
});

var furnitureSchema = mongoose.Schema({
    category:{
        type: String,
        required: true
    },
    description: String,
    items: [itemSchema]
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', furnitureSchema)