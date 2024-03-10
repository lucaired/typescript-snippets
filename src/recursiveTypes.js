"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var assert_1 = require("assert");
var list = { value: 1, next: { value: 2, next: { value: 3, next: null } } };
function printList(node) {
    console.log(node.value);
    if (node.next !== null) {
        printList(node.next);
    }
}
function addToList(value, node) {
    if (node.next === null) {
        node.next = { value: value, next: null };
    }
    else {
        addToList(value, node.next);
    }
    return node;
}
function replaceAllOccurences(value, newValue, node) {
    if (node.value === value) {
        node.value = newValue;
    }
    if (node.next !== null) {
        replaceAllOccurences(value, newValue, node.next);
    }
    return node;
}
printList(list);
addToList(4, list);
printList(list);
replaceAllOccurences(4, 5, list);
/**
 * Iterate through the node and when we encounter a list as value, we store the next and
 * build a new list from the values. We then add the values one-by-one a list and then we
 * append the old next to the last element of the list.
 *
 * @param node the head node of the list
 * @returns the flattened list
 */
function flattenList(node) {
    function flattenNode(node) {
        if (node.value instanceof Array) {
            // {value: undefined, next: { value: <value>, next: {} }}
            var newStartNode_1 = {
                value: undefined,
                next: null,
            };
            var currNode_1 = newStartNode_1;
            for (var _i = 0, _a = node.value; _i < _a.length; _i++) {
                var val = _a[_i];
                // if you use for...in, it will be of type string
                var newNode = { value: val, next: null };
                currNode_1.next = newNode;
                currNode_1 = newNode;
            }
            return newStartNode_1.next;
        }
        else {
            return node;
        }
    }
    var newStartNode = {
        value: undefined,
        next: null,
    };
    var currNode = newStartNode;
    return flattenNode(newStartNode);
}
var list3 = {
    value: [1, 2, 3],
    next: null,
};
var emptyList = {
    value: undefined,
    next: null,
};
assert_1.default.deepStrictEqual(flattenList(list3), {
    value: 1,
    next: { value: 2, next: { value: 3, next: null } },
});
assert_1.default.deepStrictEqual(flattenList(emptyList), {
    value: undefined,
    next: null,
});
