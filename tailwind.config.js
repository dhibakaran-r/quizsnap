/** @type {import('tailwindcss').Config} */
// import i from './src/assets/images/bgeff.jpg'
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary : "#0144CB",
      secondary : "#3572EF",
      bluedk : "#3D50E0",
      bluelg : "#3ABEF9",
      bluellg : "#A7E6FF",
      primlight : "#7FA1E5",
      bluebg : "#FAFBFE",
      bgwhite : "#fff",
      bluetext : "#243568",
      textlg : "#243568",
      textgray : "#585858",
      outlg : "#e1e1ff",
      textsec : "#CB8801",
      shadbg : "#b3cbfe",
      redbg : "#ED5E68",
      bgno : "#7D8089",
      graylg : "#DEE2E6",
      success : "#4CAF50",
      secbr : "#D8DFE3"

    },
    extend: {
      animation: {
        slowSpin: "spin 3s linear infinite",
      },
      backgroundImage: {
        bgimg: "url('/src/assets/images/totmcq.jpg')",
        bgimg2: "url('/src/assets/images/cardbg.jpg')"
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    ]
}


