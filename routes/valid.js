const Joi=require('@hapi/joi'); // npm i @hapi/joi@15.0.3



const RegisterValidate=(data)=>{
    const schema={
        name:Joi.string().min(3).required(),
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required()
    }

    return Joi.validate(data,schema); 
}


const LoginValidate=(data)=>{

    const schema={
        email:Joi.string().min(6).required().email(),
        password:Joi.string().min(6).required()
    }

    return Joi.validate(data,schema);
}





module.exports.RegisterValidate=RegisterValidate
module.exports.LoginValidate=LoginValidate
