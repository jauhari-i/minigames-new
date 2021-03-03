import Users from '../../models/Users'
import Admin from '../../models/Admin'
import Game from '../../models/Game'
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

export const updateUser = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name cannot be empty'),
  check('userImage')
    .not()
    .isEmpty()
    .withMessage('User image cannot be empty'),
  check('city')
    .not()
    .isEmpty()
    .withMessage('City cannot be empty'),
  check('province')
    .not()
    .isEmpty()
    .withMessage('Province cannot be empty'),
  check('birthday')
    .not()
    .isEmpty()
    .withMessage('Birthday cannot be empty'),
  check('phoneNumber')
    .not()
    .isEmpty()
    .withMessage('Phone number cannot be empty'),
]

export const changePassword = [
  check('oldPassword')
    .not()
    .isEmpty()
    .withMessage('Old password cannot be empty'),
  check('newPassword')
    .not()
    .isEmpty()
    .withMessage('New password cannot be empty'),
  check('confirmPassword')
    .not()
    .isEmpty()
    .withMessage('Password confirmation cannot be empty'),
]

export const updateAdmin = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name cannot be empty'),
  check('image')
    .not()
    .isEmpty()
    .withMessage('Image cannot be empty'),
]

export const addAdmin = [
  check('name')
    .not()
    .isEmpty()
    .withMessage('Name cannot be empty'),
  check('email').custom(val => {
    if (!val) {
      return Promise.reject('Email cannot be empty')
    }
    return Admin.findOne({ adminEmail: val }).then(u => {
      if (u) {
        return Promise.reject('Email already used')
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

export const addGame = [
  check('title')
    .not()
    .isEmpty()
    .withMessage('Title cannot be empty'),
  check('price')
    .not()
    .isEmpty()
    .withMessage('Price cannot be empty'),

  check('poster')
    .not()
    .isEmpty()
    .withMessage('Poster cannot be empty'),

  check('image')
    .not()
    .isEmpty()
    .withMessage('Image cannot be empty'),
  check('rating')
    .not()
    .isEmpty()
    .withMessage('Rating cannot be empty'),
  check('discount')
    .not()
    .isEmpty()
    .withMessage('Discount cannot be empty'),
  check('difficulty')
    .not()
    .isEmpty()
    .withMessage('Difficulty cannot be empty'),
  check('capacity')
    .not()
    .isEmpty()
    .withMessage('Capacity cannot be empty'),
  check('duration')
    .not()
    .isEmpty()
    .withMessage('Duration cannot be empty'),
  check('ready')
    .not()
    .isEmpty()
    .withMessage('Game status cannot be empty'),
  check('url').custom(val => {
    if (!val) {
      return Promise.reject('Url cannot be empty')
    }
    return Game.findOne({ gameUrl: val }).then(u => {
      if (u) {
        return Promise.reject('Url already used')
      }
    })
  }),
]

export const editGame = [
  check('title')
    .not()
    .isEmpty()
    .withMessage('Title cannot be empty'),
  check('price')
    .not()
    .isEmpty()
    .withMessage('Price cannot be empty'),

  check('poster')
    .not()
    .isEmpty()
    .withMessage('Poster cannot be empty'),

  check('image')
    .not()
    .isEmpty()
    .withMessage('Image cannot be empty'),
  check('rating')
    .not()
    .isEmpty()
    .withMessage('Rating cannot be empty'),
  check('discount')
    .not()
    .isEmpty()
    .withMessage('Discount cannot be empty'),
  check('difficulty')
    .not()
    .isEmpty()
    .withMessage('Difficulty cannot be empty'),
  check('capacity')
    .not()
    .isEmpty()
    .withMessage('Capacity cannot be empty'),
  check('duration')
    .not()
    .isEmpty()
    .withMessage('Duration cannot be empty'),
  check('ready')
    .not()
    .isEmpty()
    .withMessage('Game status cannot be empty'),
  check('url')
    .not()
    .isEmpty()
    .withMessage('Url cannot be empty'),
]

// const { gameId, playDate, members, time } = data

export const addCart = [
  check('gameId')
    .not()
    .isEmpty()
    .withMessage('Game id cannot be empty'),
  check('playDate')
    .not()
    .isEmpty()
    .withMessage('Playing Date cannot be empty'),
  check('members')
    .not()
    .isEmpty()
    .withMessage('Members cannot be empty'),
  check('time')
    .not()
    .isEmpty()
    .withMessage('Time Cannot be empty'),
]

export const checkoutTr = [
  check('cartId')
    .not()
    .isEmpty()
    .withMessage('Cart id cannot be empty'),
]

export const rejectTr = [
  check('reason')
    .not()
    .isEmpty()
    .withMessage('Reason cannot be empty'),
]

export const uploadPayment = [
  check('image')
    .not()
    .isEmpty()
    .withMessage('Image cannot be empty'),
]

export const newCode = [
  check('playDate')
    .not()
    .isEmpty()
    .withMessage('Playing Date cannot be empty'),
  check('time')
    .not()
    .isEmpty()
    .withMessage('Time cannot be epty'),
]
