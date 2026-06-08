function STATE() {
  let synth = null;

  return {
    pillShape: false,
    baseOctave: 3,
    octaveRange: [2, 3, 4, 5, 6],
    notes: ["D#", "F#", "G#", "A#", "C#"],
    noteKeys: ["s", "d", "f", "j", "k"],
    pressed: [],
    playableNote(note) {
      return note === "C#"
        ? `${note}${this.baseOctave + 1}`
        : `${note}${this.baseOctave}`;
    },
    async startNote(note) {
      await Tone.start();
      if (!synth) synth = new Tone.PolySynth(Tone.Synth).toDestination();
      this.releaseNote(note);
      this.pressed.push(note);
      synth.triggerAttack(this.playableNote(note));
    },
    releaseNote(note) {
      this.pressed = this.pressed.filter((n) => n !== note);
      if (synth) synth.triggerRelease(this.playableNote(note));
    },
    async playNote(event) {
      await this.startNote(event.target.innerText);
    },
    stopNote(event) {
      event.target.blur();
      this.releaseNote(event.target.innerText);
    },
    async keyPress(event) {
      const num = parseInt(event.key);
      if (this.octaveRange.includes(num)) {
        this.baseOctave = num;
        return;
      }
      const i = this.noteKeys.indexOf(event.key);
      if (i === -1 || event.repeat) return;
      await this.startNote(this.notes[i]);
    },
    keyRelease(event) {
      const i = this.noteKeys.indexOf(event.key);
      if (i === -1) return;
      this.releaseNote(this.notes[i]);
    },
  };
}
