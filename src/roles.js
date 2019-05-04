export default {
  barista: {
    can: ['order']
  },
  admin: {
    can: ['user', 'product'],
    inherits: ['barista']
  }
}
