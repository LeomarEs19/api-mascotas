import {check} from 'express-validator'

export const middlewaresCreateUsers =[
    check('fullname','nombre, campo oblogatorio').not().isEmpty().isLength({ min: 3, max: 100 }).isString(),
    check('email','email invalido').not().isEmpty().isEmail(),
    check('password', 'la password es de caracter obligatorio').not().isEmpty().isLength({ min: 3, max: 100 }),
];
export const middlewaresUpdate=[
  check('fullname','falta el nombre').optional().isLength({ min: 3, max: 100 }).isString().not().isEmpty(),
  check('email','email invalido').optional().isEmail().not().isEmpty(),
  check('password','password').optional().isLength({ min: 3, max: 100 }).isString().not().isEmpty(),
];
