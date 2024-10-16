/** @type {import('tailwindcss').Config} */
// import i from './src/assets/images/bgeff.jpg'
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      primary: "#0144CB",
      secondary: "#3572EF",
      bluedk: "#3D50E0",
      bluelg: "#3ABEF9",
      bluellg: "#A7E6FF",
      primlight: "#7FA1E5",
      bluebg: "#FAFBFE",
      bgwhite: "#fff",
      bluetext: "#243568",
      textlg: "#243568",
      textgray: "#585858",
      outlg: "#e1e1ff",
      textsec: "#CB8801",
      shadbg: "#b3cbfe",
      redbg: "#ED5E68",
      bgno: "#7D8089",
      graylg: "#DEE2E6",
      success: "#4CAF50",
      secbr: "#D8DFE3",
      lggray: "#ADBBC7",
      stgray: "#a7a8a9",
      xltgray: "#DDDEE2",
      secgray: "#39424E"

    },
    extend: {
      animation: {
        slowSpin: "spin 3s linear infinite",
      },
      backgroundImage: {
        bgimg: "url('/src/assets/images/totmcq.jpg')",
        bgimg2: "url('/src/assets/images/cardbg.jpg')",
        bgimg3: "url('/src/assets/images/bgeff2.jpg')",
        bgimg4: "url('/src/assets/images/bgeff3.jpg')",
        bgimg5: "url('/src/assets/images/bgeff4.jpg')",
        bgimg6: "url('/src/assets/images/bgeff5.jpg')",
        bgimg7: "url('/src/assets/images/bgeff6.jpg')",
        bgimg8: "url('/src/assets/images/bgeff7.jpg')",
        bgimg9: "url('/src/assets/images/bgeff8.png')",
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
  ]
}


