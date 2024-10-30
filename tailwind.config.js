/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html", // Main HTML file in the project root
    "./assets/js/**/*.{js}", // All JavaScript files inside assets/js folder
  ],
  theme: {
    extend: {
      colors: {
        p1: "#DE3232",
        p1Text: "#630000",
        p2: "#3F1D00",
        p2Text: "#FF7700",
        p3: "#02B20B",
        p3Text: "#002A02",
        bgKanban: "#D9D9D9",
        lightModeMain: "#6096BA",
        darkModeMain: "##274C77",
        greyText: "#908C8C",
        greyHighLights: "#808080",
        tirer:"#817C7C",
        hightLightWithContrast:"rgba(128, 128, 128,0.29)",
        
      },
    },
  },
  plugins: [],
};
