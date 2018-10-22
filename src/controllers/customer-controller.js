'use strict';

const ValidationContract = require('../validators/fluent-validator');
const customerRepository = require ('../repositories/customer-repository');
const md5 = require('md5');

const emailService = require('../services/email-service');
const authService = require('../services/auth-service');

exports.post = async(req, res, next) => {
    let contract = new ValidationContract();

    contract.hasMinLen(req.body.name,3,'O título deve conter 3 caracteres no mínimo.');
    contract.isEmail(req.body.email,'Email inválido.');
    contract.hasMinLen(req.body.password,6,'A senha deve conter 6 caracteres no mínimo.');

    if (!contract.isValid()){
        res.status(400).send(contract.errors()).end();
        return;
    }

    let data = {
       name: req.body.name,
       email: req.body.email,
       password: md5(req.body.password + global.SALT_KEY),
       roles: ["user"]
    }

    emailService.send(req.body.email,'Bem vindo a loja Cristã da Web', global.EMAIL_TMPL.replace('{0}',req.body.name));

    try {
       await customerRepository.create(data);
       res.status(200).send({
           message: 'Cliente cadastrado com sucesso.'
       });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao cadastrar cliente.'
        });
    }
    
}


exports.authenticate = async(req, res, next) => {
    let data = {       
       email: req.body.email,
       password: md5(req.body.password + global.SALT_KEY) 
    }

    try {
       const customer = await customerRepository.authenticate(data);

       if (!customer){
            res.status(404).send({
                message: 'Usuário ou senha Inválidos!'
            });    
            return;
       }

       const token = await authService.generateToken({
           id: customer.id,
           email: customer.email,
           name: customer.name,
           roles: customer.roles
       })

       res.status(201).send({
           token: token,
           data: {
               email: customer.email,
               name: customer.name               
           }
       });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar requisição.'
        });
    }
    
}


exports.refreshToken = async(req, res, next) => {
    try {

        var token = req.body.token || req.query.token || req.headers['x-access-token'];
        var data = await authService.decodeToken(token);
    
       const customer = await customerRepository.getById(data.id);

       if (!customer){
            res.status(401).send({
                message: 'Cliente não encontrado!'
            });    
            return;
       }

       const tokenData = await authService.generateToken({
           id: customer.id,
           email: customer.email,
           name: customer.name,
           roles: customer.roles
       })

       res.status(201).send({
           token: tokenData,
           data: {
               email: customer.email,
               name: customer.name               
           }
       });
    }catch(e){
        res.status(500).send({
            message: 'Falha ao processar requisição.'
        });
    }
    
}