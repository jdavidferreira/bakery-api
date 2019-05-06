export default {
  barista: {
    can: ['order', 'customer']
  },
  admin: {
    can: ['user', 'product'],
    inherits: ['barista']
  }
}
