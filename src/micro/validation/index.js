import validate from 'validate.js'
import {
  getAdminEmails,
  getUserException,
  getGameNames,
  getGameUpdateNames,
} from './validation_query'
import { timeArray } from '../../constants/timePlay'

export const validateLogin = async data => {
  const rule = {
    email: {
      presence: { message: 'is required' },
      email: { message: 'is not valid email' },
    },
    password: {
      presence: { message: 'is required' },
    },
  }
  const validation = await validate(data, rule)

  if (validation === undefined) {
    return {
      error: false,
      message: '',
    }
  } else if (validation.password) {
    return {
      error: true,
      message: validation.password[0],
    }
  } else if (validation.email) {
    return {
      error: true,
      message: validation.email[0],
    }
  } else {
    return {
      error: false,
      message: '',
    }
  }
}

export const validateRegisterAdmin = async data => {
  const emails = await getAdminEmails()
  const rule = {
    name: {
      presence: { message: 'is required' },
    },
    email: {
      presence: { message: 'is required' },
      email: { message: 'is not valid email' },
      exclusion: {
        within: emails,
        message: 'is already used',
      },
    },
    password: {
      presence: { message: 'is required' },
    },
    confirmPassword: {
      presence: { message: 'is required' },
      equality: {
        attribute: 'password',
        message: 'is not same as password',
      },
    },
  }

  const validation = await validate(data, rule)

  if (validation === undefined) {
    return {
      error: false,
      message: '',
    }
  } else if (validation.name) {
    return {
      error: true,
      message: validation.name[0],
    }
  } else if (validation.email) {
    return {
      error: true,
      message: validation.email[0],
    }
  } else if (validation.password) {
    return {
      error: true,
      message: validation.password[0],
    }
  } else if (validation.confirmPassword) {
    return {
      error: true,
      message: validation.confirmPassword[0],
    }
  } else {
    return {
      error: false,
      message: '',
    }
  }
}

export const validateRegisterUser = async data => {
  const { emails, username } = await getUserException()
  const rule = {
    name: {
      presence: { message: 'is required' },
    },
    username: {
      presence: { message: 'is required' },
      exclusion: {
        within: username,
        message: 'is already used',
      },
    },
    email: {
      presence: { message: 'is required' },
      email: { message: 'is not valid email' },
      exclusion: {
        within: emails,
        message: 'is already used',
      },
    },
    password: {
      presence: { message: 'is required' },
    },
    confirmPassword: {
      presence: { message: 'is required' },
      equality: {
        attribute: 'password',
        message: 'is not same as password',
      },
    },
  }

  const validation = await validate(data, rule)

  if (validation === undefined) {
    return {
      error: false,
      message: '',
    }
  } else if (validation.name) {
    return {
      error: true,
      message: validation.name[0],
    }
  } else if (validation.username) {
    return {
      error: true,
      message: validation.username[0],
    }
  } else if (validation.email) {
    return {
      error: true,
      message: validation.email[0],
    }
  } else if (validation.password) {
    return {
      error: true,
      message: validation.password[0],
    }
  } else if (validation.confirmPassword) {
    return {
      error: true,
      message: validation.confirmPassword[0],
    }
  } else {
    return {
      error: false,
      message: '',
    }
  }
}

export const validateGame = async data => {
  const names = await getGameNames()

  const rule = {
    title: {
      presence: { message: 'is required' },
      exclusion: {
        within: names,
        message: 'is already used',
      },
    },
    price: {
      presence: { message: 'is required' },
    },
    image: {
      presence: { message: 'is required' },
    },
    rating: {
      presence: { message: 'is required' },
    },
    description: {
      presence: { message: 'is required' },
    },
    discount: {
      presence: { message: 'is required' },
    },
    difficulty: {
      presence: { message: 'is required' },
    },
    capacity: {
      presence: { message: 'is required' },
    },
    duration: {
      presence: { message: 'is required' },
    },
    ready: {
      presence: { message: 'is required' },
    },
    genre: {
      presence: { message: 'is required' },
    },
    url: {
      presence: { message: 'is required' },
    },
  }

  const validation = await validate(data, rule)

  if (validation === undefined) {
    return {
      error: false,
      message: '',
    }
  } else if (validation.title) {
    return {
      error: true,
      message: validation.title[0],
    }
  } else if (validation.price) {
    return {
      error: true,
      message: validation.price[0],
    }
  } else if (validation.image) {
    return {
      error: true,
      message: validation.image[0],
    }
  } else if (validation.rating) {
    return {
      error: true,
      message: validation.rating[0],
    }
  } else if (validation.description) {
    return {
      error: true,
      message: validation.description[0],
    }
  } else if (validation.discount) {
    return {
      error: true,
      message: validation.discount[0],
    }
  } else if (validation.difficulty) {
    return {
      error: true,
      message: validation.difficulty[0],
    }
  } else if (validation.capacity) {
    return {
      error: true,
      message: validation.capacity[0],
    }
  } else if (validation.duration) {
    return {
      error: true,
      message: validation.duration[0],
    }
  } else if (validation.ready) {
    return {
      error: true,
      message: validation.ready[0],
    }
  } else if (validation.genre) {
    return {
      error: true,
      message: validation.genre[0],
    }
  } else if (validation.url) {
    return {
      error: true,
      message: validation.url[0],
    }
  } else {
    return {
      error: false,
      message: '',
    }
  }
}

export const validateUpdateGame = async (data, gameId) => {
  const names = await getGameUpdateNames(gameId)

  const rule = {
    title: {
      presence: { message: 'is required' },
      exclusion: {
        within: names,
        message: 'is already used',
      },
    },
    price: {
      presence: { message: 'is required' },
    },
    image: {
      presence: { message: 'is required' },
    },
    rating: {
      presence: { message: 'is required' },
    },
    description: {
      presence: { message: 'is required' },
    },
    discount: {
      presence: { message: 'is required' },
    },
    difficulty: {
      presence: { message: 'is required' },
    },
    capacity: {
      presence: { message: 'is required' },
    },
    duration: {
      presence: { message: 'is required' },
    },
    ready: {
      presence: { message: 'is required' },
    },
    genre: {
      presence: { message: 'is required' },
    },
    url: {
      presence: { message: 'is required' },
    },
  }

  const validation = await validate(data, rule)

  if (validation === undefined) {
    return {
      error: false,
      message: '',
    }
  } else if (validation.title) {
    return {
      error: true,
      message: validation.title[0],
    }
  } else if (validation.price) {
    return {
      error: true,
      message: validation.price[0],
    }
  } else if (validation.image) {
    return {
      error: true,
      message: validation.image[0],
    }
  } else if (validation.rating) {
    return {
      error: true,
      message: validation.rating[0],
    }
  } else if (validation.description) {
    return {
      error: true,
      message: validation.description[0],
    }
  } else if (validation.discount) {
    return {
      error: true,
      message: validation.discount[0],
    }
  } else if (validation.difficulty) {
    return {
      error: true,
      message: validation.difficulty[0],
    }
  } else if (validation.capacity) {
    return {
      error: true,
      message: validation.capacity[0],
    }
  } else if (validation.duration) {
    return {
      error: true,
      message: validation.duration[0],
    }
  } else if (validation.ready) {
    return {
      error: true,
      message: validation.ready[0],
    }
  } else if (validation.genre) {
    return {
      error: true,
      message: validation.genre[0],
    }
  } else if (validation.url) {
    return {
      error: true,
      message: validation.url[0],
    }
  } else {
    return {
      error: false,
      message: '',
    }
  }
}

export const validateCart = async data => {
  const rule = {
    gameId: {
      presence: { message: 'is required' },
    },
    date: {
      presence: { message: 'is required' },
    },
    time: {
      presence: { message: 'is required' },
      numericality: {
        onlyInteger: true,
        greaterThanOrEqualTo: 0,
        lessThanOrEqualTo: timeArray.length,
        notLessThanOrEqualTo: 'Time is not valid',
        notGreaterThanOrEqualTo: 'Time is not valid',
        notIntefet: 'Time is not valid',
        strict: true,
        noString: true,
      },
    },
    members: {
      presence: { message: 'is required' },
    },
  }

  const validation = await validate(data, rule)

  if (validation === undefined) {
    return {
      error: false,
      message: '',
    }
  } else if (validation.gameId) {
    return {
      error: true,
      message: validation.gameId[0],
    }
  } else if (validation.date) {
    return {
      error: true,
      message: validation.date[0],
    }
  } else if (validation.time) {
    return {
      error: true,
      message: validation.time[0],
    }
  } else if (validation.members) {
    return {
      error: true,
      message: validation.members[0],
    }
  } else {
    return {
      error: false,
      message: '',
    }
  }
}
