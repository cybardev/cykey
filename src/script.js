function STATE() {
  let synth = null;

  return {
    baseOctave: 3,
    octaveRange: [2, 3, 4, 5, 6],
    notes: ["D#", "F#", "G#", "A#", "C#"],
    async playNote(event) {
      await Tone.start();
      if (!synth) synth = new Tone.Synth().toDestination();
      const note = event.target.innerText;
      let toPlay =
        note === "C#"
          ? `${note}${this.baseOctave + 1}`
          : `${note}${this.baseOctave}`;
      synth.triggerAttack(toPlay);
    },
    stopNote(event) {
      event.target.blur();
      if (synth) synth.triggerRelease();
    },
  };
}
