import { NextFunction, Request, Response } from "express";
import * as yup from 'yup'
import { pt } from 'yup-locale-pt'
import { errorBadRequest } from "../helpers/http-helpers";

yup.setLocale(pt)

export default function handleYupValidationError(
    esquema: yup.Schema<unknown>,
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        esquema.validateSync(req.body, {
            abortEarly: false,
        })

        return next()
    } catch (error) {
        const yupErrors = error as yup.ValidationError
        const validateErrors: Record<string, string> = {}
        yupErrors.inner.forEach((error) => {
            if (!error.path) return
            validateErrors[error.path] = error.message
        })

        const returnData = errorBadRequest(validateErrors)

        res.status(returnData.statusCode).json(returnData)
    }
}
