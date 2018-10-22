'use strict';

const ValidationContract = require('../validators/fluent-validator');
const productRepository = require ('../repositories/product-repository');
const azure = require('azure-storage');
const guid = require('guid');
const config = require('../config');

exports.get = async(req,res,next) => {
    try {
        var data = await productRepository.get();
        res.status(200).send(data);
    } catch(e){
        res.status(500).send({
            message:"Erro ao executar get"
        });
    } 
    
}

exports.getBySlug = async(req,res,next) => {
    try {
        var data = await productRepository.getBySlug(req.params.slug);
        res.status(200).send(data);    
    }catch(e){
        res.status(500).send(e);    
    }
}

exports.getByTag = async(req,res,next) => {    
    try {
        var data = await productRepository.getByTag(req.params.tags)
        res.status(200).send(data);    
    }catch(e){
        res.status(500).send(e);    
    }
}

exports.getById = async(req,res,next) => {    
    try {
        var data = await productRepository.getById(req.params.id);
        res.status(200).send(data);    
    }catch(e){
        res.status(500).send(e);    
    }
}

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();

    contract.hasMinLen(req.body.title,3,'O título deve conter 3 caracteres no mínimo.');
    contract.hasMinLen(req.body.description,3,'A descrição deve conter 3 caracteres no mínimo.');
    contract.hasMinLen(req.body.slug,3,'O slug deve conter 3 caracteres no mínimo.');

    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    try{
        const blobService = azure.createBlobService(config.containerConnectionString);

        let fileName = guid.raw().toString() + '.jpg';
        let rawData = req.body.image;
        let matches = rawData.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        let type = matches[1];
        let buffer = new Buffer(matches[2],'base64');

       await blobService.createBlockBlobFromText('product-images',fileName,buffer,{
           contentType: type
       }, function(error,result,response){
           if (error){
               fileName = 'default-product.png'
           }
       });
       
       var data = {
           title: req.body.title,
           slug: req.body.slug,
           description: req.body.description,
           price: req.body.price,
           active: true,
           tags: req.body.tags,
           image: 'https://christstorebr.blob.core.windows.net/product-images/' + fileName
       }    
       await productRepository.create(data);
       res.status(200).send('Produto cadastrado com sucesso.');       
    }catch(e){
        console.log(e);
        res.status(500).send('Falha ao cadastrar produto.');
    }
    
}

exports.put = async(req, res, next) => {
    try {
        await productRepository.update(req.params.id,req.body)        
        res.status(200).send(res);
    } catch(e) {
        res.status(500).send(
            {
                message: 'Deu ruim',
            }
        );
    }    
};

exports.delete =  async(req, res, next) => {
    try {
        await productRepository.delete(req.body.id);
        res.status(200).send({            
            message: 'Produto removido com sucesso'
        });    
    } catch (e) {
        res.status(400).send({
            message: 'Deu ruim ao remover',
            data: e
        });
    }    
};