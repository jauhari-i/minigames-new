import Users from '../../models/Users'
import { check } from 'express-validator'

export const registerCheck = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name cannot be empty'),
  check('email').custom(val => {
    if (!val) {
      return Promise.reject('Email cannot be empty')
    }
    return Users.findOne({ email: val }).then(u => {
      if (u) {
        return Promise.reject('User with this email already exist')
      }
    })
  }),
  check('username').custom(val => {
    if (!val) {
      return Promise.reject('Username cannot be empty')
    }
    return Users.findOne({ username: val }).then(u => {
      if (u) {
        return Promise.reject('Username already used')
      }
    })
  }),
  check('password')
    .not()
    .isEmpty()
    .withMessage('Password cannot be empty'),
  check('confirmPassword')
    .not()
    .isEmpty()
    .withMessage('Please confirm your password!'),
]

export const loginCheck = [
  check('email')
    .not()
    .isEmpty()
    .withMessage('Email cannot be empty')
    .isEmail()
    .withMessage('Email is invalid'),
  check('password')
    .not()
    .isEmpty()
    .withMessage('Password cannot be empty'),
]
