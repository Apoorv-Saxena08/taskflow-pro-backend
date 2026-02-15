//joi use krenge validation ke liye, aur express middleware ke through use krenge, taki controller clean rhe

const Joi = require("joi");

const createTaskSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(100)
        .required(),

    description: Joi.string()
        .max(500)
        .optional(),

    completed: Joi.boolean()
        .optional()
});

const updateTaskSchema = Joi.object({
    title: Joi.string()
        .min(3)
        .max(100)
        .optional(),

    description: Joi.string()
        .max(500)
        .optional(),

    completed: Joi.boolean()
        .optional()
});

module.exports = {
    createTaskSchema,
    updateTaskSchema
};