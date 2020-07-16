const Joi = require("@hapi/joi");

exports.createUser = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().min(8).required(),
    roleId: Joi.number().required(),
  });
  return schema.validate(data);
};

exports.updateUser = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    password: Joi.string().min(3),
    roleId: Joi.number(),
  });
  return schema.validate(data);
};

exports.createRole = (data) => {
  const schema = Joi.object({
    roleName: Joi.string().min(3).required(),
  });
  return schema.validate(data);
};

exports.updateRole = (data) => {
  const schema = Joi.object({
    name: Joi.string().min(3),
  });
  return schema.validate(data);
};

//modbus
exports.createAddressType = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
  });
  return schema.validate(data);
};

exports.updateAddressType = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
  });
  return schema.validate(data);
};

exports.createDevice = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    ip: Joi.string().required(),
    port: Joi.number().required(),
    unitId: Joi.number().required(),
    createdAt: Joi.date(),
  });
  return schema.validate(data);
};

exports.updateDevice = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    ip: Joi.string(),
    port: Joi.number(),
    unitId: Joi.number(),
  });
  return schema.validate(data);
};

exports.createAddressModbus = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    address: Joi.number().required(),
    device_id: Joi.number().required(),
    type_id: Joi.number().required(),
  });
  return schema.validate(data);
};

exports.updateAddressModbus = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    address: Joi.number(),
    device_id: Joi.number(),
    type_id: Joi.number(),
  });
  return schema.validate(data);
};

exports.createLogsModbus = (data) => {
  const schema = Joi.object({
    device_id: Joi.number().required(),
    data: Joi.array().required(),
    createdAt: Joi.date(),
  });
  return schema.validate(data);
};

exports.updateLogsModbus = (data) => {
  const schema = Joi.object({
    device_id: Joi.number().required(),
    data: Joi.array().required(),
  });
  return schema.validate(data);
};

exports.createScreen = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    screenId: Joi.string().required(),
  });
  return schema.validate(data);
};

exports.updateScreen = (data) => {
  const schema = Joi.object({
    name: Joi.string(),
    screenId: Joi.string(),
  });
  return schema.validate(data);
};

exports.createUserScreen = (data) => {
  const schema = Joi.object({
    userId: Joi.number().required(),
    screenId: Joi.number().required(),
    flag: Joi.boolean().required(),
  });
  return schema.validate(data);
};

exports.updateUserScreen = (data) => {
  const schema = Joi.object({
    userId: Joi.number(),
    screenId: Joi.number(),
    flag: Joi.boolean(),
  });
  return schema.validate(data);
};

exports.badReq = (res, msg) => {
  return res.status(400).json({ message: msg || "Bad request." });
};
