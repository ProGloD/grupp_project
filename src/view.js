export default {
  render: function(to, arr) {
    for (let el of arr) {
      to.appendChild(el);
    }
  }
};