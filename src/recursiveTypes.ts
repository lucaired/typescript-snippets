import assert from "assert";

type LinkedList<T> = { value: T | undefined } & { next: LinkedList<T> | null };

const list = { value: 1, next: { value: 2, next: { value: 3, next: null } } };

function printList<T>(node: LinkedList<T>) {
  console.log(node.value);
  if (node.next !== null) {
    printList(node.next);
  }
}

function addToList<T>(value: T, node: LinkedList<T>): LinkedList<T> {
  if (node.next === null) {
    node.next = { value, next: null };
  } else {
    addToList(value, node.next);
  }
  return node;
}

printList(list);
addToList(4, list);
printList(list);

/**
 * Iterate through the node and when we encounter a list as value, we store the next and
 * build a new list from the values. We then add the values one-by-one a list and then we
 * append the old next to the last element of the list.
 *
 * @param node the head node of the list
 * @returns the flattened list
 */
function flattenList<T>(node: LinkedList<T>): LinkedList<T> | null {
  function flattenNode<T>(node: LinkedList<T>): LinkedList<T> | null {
    if (node.value instanceof Array) {
      // {value: undefined, next: { value: <value>, next: {} }}
      const newStartNode: LinkedList<T> = {
        value: undefined,
        next: null,
      };
      let currNode = newStartNode;
      for (const val of node.value) {
        // if you use for...in, it will be of type string
        const newNode = { value: val, next: null };
        currNode.next = newNode;
        currNode = newNode;
      }
      return newStartNode.next;
    } else {
      return node;
    }
  }
  return flattenNode(node);
}
const list3 = {
  value: [1, 2, 3],
  next: null,
};
const emptyList = {
  value: undefined,
  next: null,
};
console.log("Tested %j ➡️ 👍", list3);
assert.deepStrictEqual(flattenList(list3), {
  value: 1,
  next: { value: 2, next: { value: 3, next: null } },
});
console.log("Tested %j ➡️ 👍", emptyList);
assert.deepStrictEqual(flattenList(emptyList), {
  value: undefined,
  next: null,
});

console.log("All assertions passed");
