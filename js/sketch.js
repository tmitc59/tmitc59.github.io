let colorPalette = [
  "red",
  "orange",
  "yellow",
  "green",
  "cyan",
  "blue",
  "magenta",
  "brown",
  "white",
  "black",
];

let currentColor = colorPalette[0];

const sampler = new Tone.Sampler({
  urls: {
    C3: "sounds/paintbrush.wav" ,
    C3: "sounds/dip.wav" ,
  },
  onload: () => {
    console.log("Sampler loaded");
  },
}).toDestination();

//creates canvas and color boxes
function setup() {
  createCanvas(2500, 1500);
  //colorMode(HSB);
  //creates pallete on left side
  for (let i = 0; i < colorPalette.length; i++) {
    push();
    fill(colorPalette[i]);
    noStroke();
    rect(0, i * 40 + i, 40, 40);
    pop();
  }

  // define your notes and durations for your music
const notes = ["C4", "E4", "G4", "B4"];
const durations = [1, 0.5, 0.25, 0.25];

// create a sequence that plays the notes in the "notes" array
// with the corresponding durations in the "durations" array
const synth = new Tone.Synth().toDestination();
const musicPart = new Tone.Sequence(
  (time, noteIndex) => {
    synth.triggerAttackRelease(notes[noteIndex], durations[noteIndex], time);
  },
  [0, 1, 2, 3],
  "4n"
);

// start the sequence and loop it indefinitely
Tone.Transport.start();
musicPart.loop = true;
musicPart.start(0);

}


//Checks the position of the mouse to make sure it is not painting over boxes
function draw() {
  if(mouseIsPressed){
    if (mouseX > 45 && mouseY > colorPalette.length * 1) {
      stroke(currentColor);
      strokeWeight(10);
      line(mouseX, mouseY, pmouseX, pmouseY);
    }
  } 

}

//Checks to see if the user has clicked on a color box
function mousePressed() {
  let x = 0;
  let y = 0;
  let l = 40;
  let k = 40;

  for (let i = 0; i < colorPalette.length; i++) {
    if (
      mouseX >= x &&
      mouseX < x + l &&
      mouseY >= y + i * (k + 1) &&
      mouseY < y + i * (k + 1) + k
    ) {
      currentColor = colorPalette[i];
      sampler.triggerAttack("C6")
      break;
    }
  }
}
