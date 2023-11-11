// requires ascii
const art = require("ascii-art");

// function for ascii to prompt with a 1500 mili timer
const asciiArt = () => {
  art.font("Employee Tracker", "doom").then((rendered) => {
    console.log(rendered);
    setTimeout(() => {
      console.clear();
    }, 1500);
  });
};

module.exports = asciiArt;

//i was taught this cool little feature to show a little intro font
//when I first run the program.  Shoutout to my classmatesssssss!!!!
