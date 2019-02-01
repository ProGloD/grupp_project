export default {
  count: 0,
  increase: function() {
    this.count++;
  },
  allLists: [],
  addList: function() {
    let list = {

    };

    this.allLists.push(list);

    return list;
  },
  getAllLists: function() {
    return this.allLists;
  }
}