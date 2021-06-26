module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "base-black": "#353535",
        "base-green": "#79BA6E",
        "base-smoke": "#D9D9D9",
        "base-blue": "#284B63",
        "base-teal": "#6CAEB2",
      },
      fontFamily: {
        "sans-serif": ["Montserrat", "sans-serif"],
      },
      zIndex: {
        1: 1,
        "-10": "-10",
      },
      minHeight: {
        1: "0.25rem",
        2: "0.5rem",
        3: "0.75rem",
        4: "1rem",
        5: "1.25rem",
        6: "1.5rem",
        7: "1.75rem",
        8: "2rem",
        10: "2.5rem",
        12: "3rem",
        14: "3.5rem",
        16: "4rem",
        18: "4.5rem",
        20: "5rem",
        22: "5.5rem",
        24: "6rem",
        26: "6.5rem",
        28: "7rem",
        30: "7.5rem",
        32: "8rem",
        64: "16rem",
        xs: "20rem",
        sm: "24rem",
        md: "28rem",
        lg: "32rem",
        xl: "36rem",
        "2x1": "42rem",
        "3xl": "48rem",
        "4xl": "56rem",
        "5xl": "64rem",
        "6xl": "72rem",
        "7xl": "80rem",
      },
      keyframes: {
        fill: {
          "0%": { width: "0%", height: "1px" },
          "50%": { width: "100%", height: "1px" },
          "100%": { width: "100%", height: "100%", background: "#FFFFFF" },
        },
      },
      animation: {
        fill: "fill 1s forwards",
      },
    },
  },
  variants: {
    extend: {
      zIndex: ["hover"],
      padding: ["hover"],
      margin: ["last"],
    },
  },
  plugins: [],
};
