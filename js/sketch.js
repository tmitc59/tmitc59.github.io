const synth = new Tone.PolySynth().toDestination();

let notes = 
{
  'a': 'C4',
  's': 'D4',
  'd': 'E4',
  'f': 'F4',
  'g': 'G4',
  'h': 'A4',
  'j': 'B4',
  'k': 'C5'
}

function setup() 
{
  createCanvas(400, 400);
  synth.volume.value = 10;
  duration = 0.5;
}

function draw() 
{
  background(255);
  textSize(25);

  text("Volume", 128, 65);
  text('(' + synth.volume.value + ')', 145, 95);
  b1 = createButton ("-10");
  b1.position(100, 100);
  b2 = createButton ("+10");
  b2.position(200, 100);
  b1.mousePressed(subVolume);
  b2.mousePressed(addVolume);

  text("Duration", 125, 260);
  text('(' + duration + ')', 145, 290);
  b3 = createButton ("-0.5");
  b3.position(100, 300);
  b4 = createButton ("+0.5");
  b4.position(200, 300);
  b3.mousePressed(durationDown);
  b4.mousePressed(durationUp);
}

function keyPressed() 
{
  let toPlay = notes[key];
  console.log(toPlay);
  synth.triggerAttackRelease(toPlay, duration);
}

function subVolume() 
{
  synth.volume.value = (synth.volume.value - 10);
  if (synth.volume.value < 0)
  synth.volume.value = 0;
}

function addVolume() 
{
  synth.volume.value = (synth.volume.value + 10);
  if (synth.volume.value > 20)
    synth.volume.value = 20;
}

function durationDown() 
{
  duration = (duration - 0.5);
  if(duration == 0)
    duration = duration + 0.5;
}

function durationUp() 
{
  duration = (duration + 0.5);
}