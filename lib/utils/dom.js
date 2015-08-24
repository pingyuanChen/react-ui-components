"use strict";

module.exports = {
  isDescendant: function isDescendant(parent, child) {
    var node = child.parentNode;

    while (node != null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }
};