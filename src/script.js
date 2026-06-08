function STATE() {
  let synth = null;

  return {
    baseOctave: 3,
    noteDuration: 8,
    durationRange: [1, 2, 4, 8, 16, 32],
    octaveRange: [2, 3, 4, 5, 6],
    notes: ["D#", "F#", "G#", "A#", "C#"],
    durationLabel(d) {
      return `1/${parseInt(d)}`;
    },
    async playNote(note) {
      await Tone.start();
      if (!synth) synth = new Tone.Synth().toDestination();
      let toPlay =
        note === "C#"
          ? `${note}${this.baseOctave + 1}`
          : `${note}${this.baseOctave}`;
      synth.triggerAttackRelease(toPlay, `${this.noteDuration}n`);
    },
  };
}
