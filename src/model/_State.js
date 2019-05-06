export default {
  NEW: 'New',
  READY: 'Ready',
  CONFIRMED: 'Confirmed',
  DELIVERED: 'Delivered',
  PROBLEM: 'Problem',
  CANCELLED: 'Cancelled',
  values: function() {
    const obj = Object.values(this)
    obj.length--
    return obj
  }
}
