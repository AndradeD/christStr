'use strict';

const ValidationContract = require('../validators/fluent-validator');
const orderRepository = require ('../repositories/order-repository');
const guid = require('guid');
const authService = require('../services/auth-service');

exports.get = async(req,res,next) => {
    try {
        var data = await orderRepository.get();
        res.status(200).send(data);
     }catch(e){
         res.status(500).send({
             message: 'Falha ao obter pedidos.'
         });
     }
}

exports.post = async(req, res, next) => {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    var dataToken = await authService.decodeToken(token);
    
    let data = {
        customer: dataToken.id,
        number: guid.raw().substring(0,6),
        items: req.body.items
    };    

    try {
       await orderRepository.create(data);
       res.status(200).send({
           message: 'Pedido cadastrado com sucesso.'
       });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao cadastrar pedido.'
        });
    }
    
}