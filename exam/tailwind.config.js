/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'sx': {max:'376px'},
        // => @media (min-width: 640px) { ... }
        'sm': {max:'768px'},
        // // => @media (min-width: 640px) { ... }
  
        'md': {max:'1024px'},
        // // => @media (min-width: 768px) { ... }
  
        // 'lg': {min:'1024px'},
        // // => @media (min-width: 1024px) { ... }
  
        // 'xl': {max:'1280px'},
        // // => @media (min-width: 1280px) { ... }
  
        // '2xl': {max:'1536px'},
        // => @media (min-width: 1536px) { ... }
      },
      flex: {
        '2': "2 2 0%",
      },
    },
  },
  plugins: [],
};
