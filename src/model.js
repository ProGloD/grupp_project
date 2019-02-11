export default {
  listCount: 0,
  noteCount: 0,
  allLists: [],
  createList: function() {
    this.listCount++;
    let list = {
      id: "list" + this.listCount,
      titel: "New list"
    };

    this.allLists.push(list);
    return list;
  },
  createNote: function() {
    this.noteCount++;
    let note = {
      id: "note" + this.noteCount,
      titel: "New note"
    };

    return note;
  },
  getAllLists: function() {
    return this.allLists;
  }
}