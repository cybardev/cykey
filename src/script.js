function STATE() {
  let synth = null;

  return {
    baseOctave: 3,
    octaveRange: [2, 3, 4, 5, 6],
    notes: ["D#", "F#", "G#", "A#", "C#"],
    pressed: [],
    playableNote(note) {
      return note === "C#"
        ? `${note}${this.baseOctave + 1}`
        : `${note}${this.baseOctave}`;
    },
    async playNote(event) {
      await Tone.start();
      if (!synth) synth = new Tone.PolySynth(Tone.Synth).toDestination();
      const note = event.target.innerText;
      if (!this.pressed.includes(note)) this.pressed.push(note);
      synth.triggerAttack(this.playableNote(note));
    },
    stopNote(event) {
      event.target.blur();
      const note = event.target.innerText;
      this.pressed = this.pressed.filter((n) => n !== note);
      if (synth)
        synth.triggerRelease(this.playableNote(event.target.innerText));
    },
  };
}
