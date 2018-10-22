'use strict';

const mongoose = require('mongoose');
const Product = mongoose.model('Product'); 

exports.get = async() => {
    var res = await Product.find( {active: true }, 'title price slug');
    return res;
}

exports.getBySlug = async(slug) => {
    var res = await Product.findOne( { 
        active: true ,
        slug: slug
    }, 'title description price slug tags');
    return res;
}

exports.getById = async(id) => {
    var res = await Product.findById(id);
    return res;
}

exports.getByTag = async(tags) => {
    var res = await Product.find({
        tags: tags             
    }, 'title description price slug tags');
    return res;
}

exports.create = async(data) => {
    var product = new Product(data);
    await product.save();
}

exports.update = async(id,data) => {    
    await Product.findByIdAndUpdate(id, {
        $set: {
            title: data.title,
            description: data.description,
            price: data.price,
            slug: data.slug
        }
    });
}

exports.delete = async(id) => {
    await Product.findByIdAndRemove(id); 
}