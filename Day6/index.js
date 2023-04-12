"use strict";

function max(num1, num2) {
  if (num1 > num2) {
    return num1;
  } else {
    return num2;
  }
}

function maxOfThree(num1, num2, num3) {
  if (num1 > num2 && num1 > num3) {
    return num1;
  } else if (num2 > num1 && num2 > num3) {
    return num2;
  } else {
    return num3;
  }
}

function isVowel(char) {
  var vowels = ["a", "e", "i", "o", "u"];
  return vowels.indexOf(char.toLowerCase()) !== -1;
}

function isVowelIncluded(char) {
  const vowels = ["a", "e", "i", "o", "u"];
  return vowels.includes(char.toLowerCase());
}

function sumWithForOf(arr) {
  let result = 0;
  for (let num of arr) {
    result += num;
  }
  return result;
}

function multiplyWithForOf(arr) {
  let result = 1;
  for (let num of arr) {
    result *= num;
  }
  return result;
}

function sum(arr) {
  var result = 0;
  for (var i = 0; i < arr.length; i++) {
    result += arr[i];
  }
  return result;
}

function multiply(arr) {
  var result = 1;
  for (var i = 0; i < arr.length; i++) {
    result *= arr[i];
  }
  return result;
}

function reverse(str) {
  return str.split("").reverse().join("");
}

function findLongestWordForOf(words) {
  let longest = 0;
  for (let word of words) {
    if (word.length > longest) {
      longest = word.length;
    }
  }
  return longest;
}

function findLongestWord(words) {
  var longest = 0;
  for (var i = 0; i < words.length; i++) {
    if (words[i].length > longest) {
      longest = words[i].length;
    }
  }
  return longest;
}

function filterLongWords(words, i) {
  return words.filter(function (word) {
    return word.length > i;
  });
}

function computeSumOfSquares(numbers) {
  return numbers.reduce(function (sum, number) {
    return sum + number * number;
  }, 0);
}

function printOddNumbersOnlyForOf(numbers) {
  for (let number of numbers) {
    if (number % 2 !== 0) {
      console.log(number);
    }
  }
}

function printOddNumbersOnly(numbers) {
  numbers.forEach(function (number) {
    if (number % 2 !== 0) {
      console.log(number);
    }
  });
}

function computeSumOfSquaresOfEvensOnly(numbers) {
  return numbers
    .filter(function (number) {
      return number % 2 === 0;
    })
    .reduce(function (sum, number) {
      return sum + number * number;
    }, 0);
}

function sum(arr) {
  return arr.reduce(function (sum, number) {
    return sum + number;
  }, 0);
}

function multiply(arr) {
  return arr.reduce(function (product, number) {
    return product * number;
  }, 1);
}

function findSecondBiggestForOf(arr) {
  let max = arr[0];
  let secondMax = arr[0];

  for (let num of arr) {
    if (num > max) {
      secondMax = max;
      max = num;
    } else if (num > secondMax && num != max) {
      secondMax = num;
    }
  }

  return secondMax;
}

function findSecondBiggest(arr) {
  let max = arr[0];
  let secondMax = arr[0];

  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) {
      secondMax = max;
      max = arr[i];
    } else if (arr[i] > secondMax && arr[i] != max) {
      secondMax = arr[i];
    }
  }

  return secondMax;
}

function findSecondBiggestUsingReduce(arr) {
  const [biggest, secondBiggest] = arr.reduce(
    ([max, secondMax], current) => {
      if (current > max) {
        return [current, max];
      } else if (current > secondMax && current !== max) {
        return [max, current];
      }
      return [max, secondMax];
    },
    [-Infinity, -Infinity]
  );
  return secondBiggest;
}

function printFibo(n, a, b) {
  let fib = [a, b];
  for (let i = 2; i < n; i++) {
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  console.log(fib.join(", "));
}

function sum(arr) {
  return arr.filter((num) => num > 20).reduce((acc, num) => acc + num, 0);
}

const getNewArray = function (arr) {
  return arr.filter((str) => str.length >= 5 && str.includes("a"));
};
