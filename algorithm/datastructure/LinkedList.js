function Node(value, next = null, prev = null) {
  let pValue = value;
  let pNext = next;
  let pPrev = prev;
  return {
    getValue() {
      return pValue;
    },
    setNext(node) {
      pNext = node;
    },
    getNext() {
      return pNext;
    },
    setPrev(node) {
      pPrev = node;
    },
    getPrev() {
      return pPrev;
    }
  };
}

class LinkedList {
  constructor(arr) {
    this.head = null;
    this.tail = null;
    if (arr && arr.length > 0) {
      this.createLinkedList(arr);
    }
  }

  reverseLinkedList() {
    const reverseRecur = (node, reversedPart) => {
      const next = node.getNext();
      node.setNext(reversedPart);
      reversedPart = node;

      if (next === null) {
        this.tail = this.head;
        this.head = reversedPart;
        return;
      }
      reverseRecur(next, reversedPart);
    };

    reverseRecur(this.head, null);
  }

  findNthElementFromEnd(n) { // ex. find 3rd last element
    let finger1 = this.head;
    let finger2 = this.head;

    for (; n > 0; n-- , finger1 = finger1.getNext());
    for (; finger1 !== null; finger1 = finger1.getNext(), finger2 = finger2.getNext());

    return finger2.getValue();
  }

  createLinkedList(values) {
    this.head = new Node(values.shift()); // Removes 1st element from the array and returns the value.
    this.tail = this.head;

    values.map(value => {
      const node = new Node(value);
      this.tail.setNext(node);
      node.setPrev(this.tail);
      this.tail = node;
    });
  }

  add(value) {
    const node = new Node(value);
    this.tail.setNext(node);
    this.tail = node;
  }

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }

  length() {
    let count = 0;
    for (let finger = this.head; finger !== null; finger = finger.getNext(), count++);
    return count;
  }

  static print(head) {
    for (let finger = head; finger !== null; finger = finger.getNext()) {
      process.stdout.write(finger.getValue() + ', ');
    }
    console.log(); // Print a new line at the end.
  }

  static findIntersectionBetweenTwoLinkedList(list1, list2) {
    let l1 = list1.length();
    let l2 = list2.length();

    let lListFinger, sListFinger;
    if (l1 > l2) {
      lListFinger = list1.getHead();
      sListFinger = list2.getHead();
    } else {
      lListFinger = list2.getHead();
      sListFinger = list1.getHead();
    }

    let diff = Math.abs(l1 - l2);

    while (diff > 0) {
      lListFinger = lListFinger.getNext();
      diff--;
    }

    for (; sListFinger !== null && lListFinger !== null; sListFinger = sListFinger.getNext(), lListFinger = lListFinger.getNext()) {
      if (sListFinger.getValue() === lListFinger.getValue()) {
        return sListFinger;
      }
    }
    return new Node();
  }
}


/************/
//Test Area//
/***********/
const lList = new LinkedList();

lList.createLinkedList([1, 2, 3, 5, 7]);
LinkedList.print(lList.getHead()); // Output 1, 2, 3, 5, 7

console.log(lList.findNthElementFromEnd(2)); // Output 2

lList.reverseLinkedList();
LinkedList.print(lList.getHead()); // Output 7, 5, 3, 2, 1

const l1 = new LinkedList([1, 2, 3, 4, 5, 10, 11, 12]);
const l2 = new LinkedList([100, 200, 10, 11, 12]);

console.log(LinkedList.findIntersectionBetweenTwoLinkedList(l1, l2).getValue());