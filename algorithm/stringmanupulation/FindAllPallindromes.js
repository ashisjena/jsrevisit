const str = 'yzmkkmzews';

// https://www.geeksforgeeks.org/find-palindromic-sub-strings-given-string-set-2/
const findAllPallindromes = str => {
  const results = [];

  for (let pivot = 0; pivot < str.length; pivot += .5) { // when pivot is non-fractional check for odd length pallindrome and when fractional check for even length
    // First nearest Element;
    let pallindromeRadius = pivot - Math.trunc(pivot);

    while ((pivot + pallindromeRadius) < str.length && (pivot - pallindromeRadius) >= 0
      && str.charAt(Math.trun(pivot - pallindromeRadius)) === str.charAt(Math.trunc(pivot + pallindromeRadius))) {

      const pallindrome = str.substring(Math.trunc(pivot - pallindromeRadius), Math.trunc(pivot + pallindromeRadius + 1));
      if (pallindrome.length > 1) {
        results.push(pallindrome);
      }
      pallindromeRadius++;
    }
  }

  return results;
}

console.log(findAllPallindromes(str));