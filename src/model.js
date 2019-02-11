export default {
  listCount: 0,
  allLists: [],
  createList: function() {
    this.listCount++;
    let list = {
      id: "list" + this.listCount,
      titel: "New list"
    }

    this.allLists.push(list);
    return list;
  },
  createNote: function() {

  },
  getAllLists: function() {
    return this.allLists;
  }
}