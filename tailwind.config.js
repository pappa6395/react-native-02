/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        rubik: ['Rubik-Regular', 'sans-sarif'],
        rubikBold: ['Rubik-Bold', 'sans-serif'],
        rubikExtraBold: ['Rubik-ExtraBold', 'sans-serif'],
        rubikSemibold: ['Rubik-Semibold', 'sans-serif'],
        rubikMedium: ['Rubik-Medium', 'sans-serif'],
        rubikRegular: ['Rubik-Regular', 'sans-serif'],
        rubikLight: ['Rubik-Light', 'sans-serif'],
      },
      colors: {
        primary: {
          100: '#F2F7FF',
          200: '#E5EFFF',
          300: '#0061FF',
        },
        secondary: '#ffffff',
        accent: {
          100: '#FBFBFD',
        },
        black: {
          default: '#000000',
          100: '#8C8E98',
          200: '#666876',
          300: '#191d31',
        },
        success: '#4CAF50',
        warning: '#FFA500',
        danger: {
          default: '#FF0000',
          100: '#F75555'
        },
        info: '#0000FF',
        light: '#F5F5F5',
        dark: '#333333',
      }
    },
  },
  plugins: [],
}