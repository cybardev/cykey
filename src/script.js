function STATE() {
  const SYNTH = new Tone.Synth().toDestination();

  return {
    baseOctave: 4,
    notes: ["D#", "F#", "G#", "A#", "C#"],
    async playNote(note) {
      await Tone.start();
      let octave = parseInt(this.baseOctave);
      let toPlay = note === "C#" ? `${note}${octave + 1}` : `${note}${octave}`;
      SYNTH.triggerAttackRelease(toPlay, "8n");
    },
  };
}
