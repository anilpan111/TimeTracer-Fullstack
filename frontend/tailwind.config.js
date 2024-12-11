const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        colorLevel1: '#F3F0E2', // Replace with your desired color   #00df9a  #302E3B
        colorLevel2: '#e3d6bc',
        colorLevel3: '#D9D5D2',
        colorLevel4: '#E8E0D6',
        colorLevel5: '#8E867B',
      }
    },
    fontFamily:{
      myFont: ["DM Serif Display"]
    }
  },
  darkMode: "class",
  plugins: [nextui()]
}

