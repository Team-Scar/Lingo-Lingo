import {useEffect, useState} from 'react';

// export const useLocalStorage = (key, initialValue) => {
//   const PREFIX = 'livechat-';
//   const prefixedKey = PREFIX + key;
//   const [value, setValue] = useState(() => {
//     const jsonValue = localStorage.getItem(prefixedKey);
//     if (jsonValue != null) {
//       return JSON.parse(jsonValue);
//     };
//     if (typeof initialValue === 'function') {
//       return initialValue();
//     } else {
//       return initialValue;
//     }
//   });

//   useEffect(() => {
//     localStorage.setItem(prefixedKey, JSON.stringify(value));
//   }, [prefixedKey, value]);

//   return [value, setValue];
// };


// *********** */
const PREFIX = 'livechatId-';

export const useLocalStorage = (key, initialValue) => {
  const newLocal = PREFIX + key;
  const prefixedKey = newLocal;
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey);
    if (jsonValue != null) return JSON.parse(jsonValue);
    if (typeof initialValue === 'function') {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value));
  }, [prefixedKey, value]);

  return [value, setValue];
};


// export const useLocalStorage = (key, initialValue) => {
//   // State to store our value
//   // Pass initial state function to useState so logic is only executed once
//   const [storedValue, setStoredValue] = useState(() => {
//     if (typeof window === 'undefined') {
//       return initialValue;
//     }
//     try {
//       // Get from local storage by key
//       const item = window.localStorage.getItem(key);
//       // Parse stored json or if none return initialValue
//       return item ? JSON.parse(item) : initialValue;
//     } catch (error) {
//       // If error also return initialValue
//       console.log(error);
//       return initialValue;
//     }
//   });
//   // Return a wrapped version of useState's setter function that ...
//   // ... persists the new value to localStorage.
//   const setValue = (value) => {
//     try {
//       // Allow value to be a function so we have same API as useState
//       const valueToStore =
//         value instanceof Function ? value(storedValue) : value;
//       // Save state
//       setStoredValue(valueToStore);
//       // Save to local storage
//       if (typeof window !== 'undefined') {
//         window.localStorage.setItem(key, JSON.stringify(valueToStore));
//       }
//     } catch (error) {
//       // A more advanced implementation would handle the error case
//       console.log(error);
//     }
//   };
//   return [storedValue, setValue];
// };
