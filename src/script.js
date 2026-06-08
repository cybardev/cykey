function STATE() {
  let synth = null;

  return {
    pillShape: false,
    baseOctave: 3,
    octaveRange: [2, 3, 4, 5, 6],
    notes: ["D#", "F#", "G#", "A#", "C#"],
    pressed: [],
    playableNote(note) {
      return note === "C#"
        ? `${note}${this.baseOctave + 1}`
        : `${note}${this.baseOctave}`;
    },
    releaseNote(note) {
      this.pressed = this.pressed.filter((n) => n !== note);
      if (synth) synth.triggerRelease(this.playableNote(note));
    },
    async playNote(event) {
      await Tone.start();
      if (!synth) synth = new Tone.PolySynth(Tone.Synth).toDestination();
      const note = event.target.innerText;
      this.releaseNote(note);
      this.pressed.push(note);
      synth.triggerAttack(this.playableNote(note));
    },
    stopNote(event) {
      event.target.blur();
      this.releaseNote(event.target.innerText);
    },
  };
}
