/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./assets/js/**/*.js", 
  ],
  theme: {
    extend: {
      colors: {
        p1: "rgba(231, 0, 0,0.63)",
        p1Text: "#630000",
        p2: "rgba(255, 119, 0,0.63)",
        p2Text: "rgba(63, 29, 0,0.63)",
        p3: "rgba(2, 178, 11,0.63)",
        p3Text: "rgba(0, 42, 2,0.63)",
        bgKanban: "#D9D9D9",
        lightModeMain: "#6096BA",
        darkModeMain: "##274C77",
        greyText: "#908C8C",
        greyHighLights: "#808080",
        tirer:"#817C7C",
        hightLightWithContrast:"rgba(128, 128, 128,0.29)",
        
      },
      screens:{
        "bt-sm" : "820px",
      },
    },
  },
  plugins: [],
};
