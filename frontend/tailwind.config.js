/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
    theme: {
      fontFamily: {
        sans: [ "Montserrat" , "sans-serif"],
        serif: [ "Montserrat" , "sans-serif"],
        prompt: [ "Prompt" , "sans-serif"],
        cormorant : [ "Cormorant" , "sans-serif"]
      },
      extend: {
        keyframes: {
          slideDown: {
            from: { transform: "translateY(-100%)" },
            to: { transform: "translateY(0)" },
          },
          slideLeft: {
            from: { transform: "translateX(-100%)" },
            to: { transform: "translateY(0)" },
          },
        },
        animation: {
          slideDown: "slideDown 1s ease-out",
          slideLeft: "slideLeft 1s ease-out",
        },
      },
    },
    plugins: [],
  };
  