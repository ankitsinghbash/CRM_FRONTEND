// // import { createContext, useEffect, useState } from 'react';

// // export const ThemeContext = createContext();

// // const ThemeProvider = ({ children }) => {
// //   const [theme, setTheme] = useState('light');

// //   const toggleTheme = () => {
// //     const root = document.documentElement;

// //     if (theme === 'dark') {
// //       root.classList.remove('dark');
// //       setTheme('light');
// //       localStorage.setItem('theme', 'light');
// //       console.log("Switched to light mode"); 
// //     } else {
// //       root.classList.add('dark');
// //       setTheme('dark');
// //       localStorage.setItem('theme', 'dark');
// //       console.log("Switched to Dark mode"); 
// //     }
// //   };

// //   useEffect(() => {
// //     const savedTheme = localStorage.getItem('theme');
// //     if (savedTheme === 'dark') {
// //       document.documentElement.classList.add('dark');
// //       setTheme('dark');
// //     }
// //   }, []);

// //   return (
// //     <ThemeContext.Provider value={{ theme, toggleTheme }}>
// //       {children}
// //     </ThemeContext.Provider>
// //   );
// // };

// // export default ThemeProvider;
















// import { createContext, useEffect, useState } from 'react';

// export const ThemeContext = createContext();

// const ThemeProvider = ({ children }) => {
//   const [theme, setTheme] = useState('comfortable');

//   const toggleTheme = () => {
//     const root = document.documentElement;
//     root.classList.remove(theme);

//     let newTheme;

//     switch (theme) {
//       case 'comfortable':
//         newTheme = 'compact';
//         break;
//       case 'compact':
//         newTheme = 'spacious';
//         break;
//       case 'spacious':
//         newTheme = 'dark';
//         break;
//       default:
//         newTheme = 'comfortable';
//     }

//     root.classList.add(newTheme);
//     setTheme(newTheme);
//     localStorage.setItem('theme', newTheme);
//     console.log(`Switched to ${newTheme} mode`);
//   };

//   useEffect(() => {
//     const savedTheme = localStorage.getItem('theme') || 'comfortable';
//     document.documentElement.classList.add(savedTheme);
//     setTheme(savedTheme);
//   }, []);

//   return (
//     <ThemeContext.Provider value={{ theme, toggleTheme }}>
//       {children}
//     </ThemeContext.Provider>
//   );
// };

// export default ThemeProvider;

















import { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('comfortable'); // default theme

  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    root.classList.remove(theme);         // Remove current
    root.classList.add(newTheme);         // Add new
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    console.log(`Switched to ${newTheme} mode`);
  };

  const toggleTheme = (selectedTheme = null) => {
    if (selectedTheme) {
      applyTheme(selectedTheme); // Explicit mode passed
      return;
    }

    // If no argument, cycle through
    let nextTheme;
    switch (theme) {
      case 'comfortable':
        nextTheme = 'comfortable';
        break;
      case 'compact':
        nextTheme = 'spacious';
        break;
      case 'spacious':
        nextTheme = 'dark';
        break;
      default:
        nextTheme = 'compact';
    }

    applyTheme(nextTheme);
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'comfortable';
    document.documentElement.classList.add(savedTheme);
    setTheme(savedTheme);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
