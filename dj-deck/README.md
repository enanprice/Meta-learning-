# Deckhand

Two-deck DJ software that runs in the browser. Vanilla JavaScript and the Web Audio API, with no framework and no build step.

## Run it

Double-click `index.html`. It works straight from `file://` in Chrome, Edge, Firefox and Safari.

Some browser features are stricter on `file://`. If MIDI, folder access or output selection misbehave, serve the folder instead:

```sh
cd dj-deck
python3 -m http.server 8000     # then open http://localhost:8000
```

Chrome or Edge give you everything. Firefox has no output-device picker for Web Audio, and its MIDI needs a site-permission add-on. Safari has no Web MIDI and can't pick output devices.

## Using it

- **Load tracks**: drag files onto a deck or its waveform lane, press **Load**, or add a folder under **Library** and double-click a track. MP3, WAV, FLAC and M4A work anywhere the browser can decode them.
- **Waveforms**: the lanes at the top scroll past the playhead. Blue is bass, amber is mids, white is highs. Drag a lane to scratch, and scroll or use −/+ to zoom. Click the small overview in each deck to jump.
- **Cue** works like a CDJ. Press it while stopped to set the cue, hold it on the cue point to preview, and press it while playing to go back and stop.
- **Sync** matches tempo to the other deck (including half/double time) and snaps to its beat grid. Moving the synced deck's pitch fader turns sync off.
- **Pads** have four modes:
  - **Hot cues**: press an empty pad to set one, press a set pad to jump. Shift-click, right-click or Delete mode removes one.
  - **Loops**: 1–16 beats, IN/OUT, ½, ×2 and EXIT/RELOOP.
  - **FX**: echo, reverb, flanger and beat roll, with times in beats. Tap to latch, hold for momentary.
  - **Grid**: tap tempo, ÷2/×2, BPM ±0.01, move the grid, set the downbeat, and reset.
- **Q** (quantize) snaps cues and loops to the beat grid.
- Hot cues, the main cue and grid edits are saved per track (by file name and size).
- **Recording**: pick WAV (lossless, about 10 MB/min) or WebM (Opus, about 2 MB/min), press **Rec** or F8, and press it again to stop and download.
- **Audio** (top right) picks the master output and a separate headphone output. Channel **CUE** buttons, the **Cue / Mst** knob and **Phones** then control what's in the headphones. Device names appear after you press "Show device names" (the browser asks for microphone permission; nothing is recorded).
- Press **?** for every keyboard shortcut. Deck A sits under the left hand (F play, D cue, S sync, 1‑4/Q‑R hot cues) and deck B under the right (J, K, L, 7‑0/U‑P).

## Mapping a MIDI controller

1. Plug the controller in, press **MIDI** (top right) and choose **Enable MIDI**. The browser asks once. After that, controllers are detected automatically, including when you plug them in later.
2. Press **Start MIDI learn** (or F9). Mappable controls get a dashed outline.
3. Click a control on screen, then move or press the matching one on the controller. A green outline means it's mapped. Keep going: click, move, click, move.
   - Knobs and faders learn a CC (or pitch bend, for 14-bit pitch faders).
   - Buttons and pads learn a note or a CC.
   - Jog wheels: click the platter in the middle of a deck, then turn the wheel. The relative encoding (two's complement or centred on 64) is detected for you. A jog bends the tempo while playing and scrubs while stopped.
   - Right-click a control while learning to clear its mapping.
4. Press **Done** or Esc. Mappings are saved in the browser (localStorage) per device name and load whenever that controller is connected.

The MIDI panel lists every mapping. There you can switch a knob to relative mode for endless encoders, remove mappings, or **Export / Import** the mapping as JSON to move it between browsers or machines.

## Code layout

| File | What it does |
| --- | --- |
| `js/core.js` | Namespace, helpers, storage, toasts, worklet loading |
| `js/worklet.js` | AudioWorklet processors: deck player (varispeed, WSOLA key lock, loops, scratch), beat roll, master limiter plus WAV tap |
| `js/engine.js` | AudioContext, per-deck signal chain (trim, LR4 3-band isolator, filter, FX, fader, crossfader), transport, cues, loops, beat grid, sync |
| `js/fx.js` | Echo, reverb, flanger, beat roll |
| `js/analysis.js` | BPM and beat grid, downbeat, key, 3-band waveform data (runs in Web Workers) |
| `js/waveform.js` | Canvas renderers: scrolling lanes, overview, jog platter |
| `js/controls.js` | Knob, fader and button components, plus the control registry used by keyboard and MIDI |
| `js/ui.js` | Deck panels, mixer, frame loop |
| `js/keyboard.js`, `js/midi.js`, `js/io.js`, `js/library.js` | Shortcuts, MIDI, outputs and recording, library (IndexedDB) |

## Tests

```sh
node tests/make-fixtures.mjs          # synthetic tracks with known BPM/key → tests/fixtures/
node tests/analysis-node.mjs          # BPM, grid, downbeat and key accuracy on the fixtures
node tests/run.mjs                    # engine tests: renders real audio offline and measures it
node tests/ui.mjs                     # drives the app in headless Chromium (stages 1–2)
node tests/ui-stage3.mjs              # hot cues, loops, FX, keys, MIDI (fake device), library, recording
```

You can also open `tests/index.html` in a browser to run the engine tests. The UI tests need Playwright (`npm i -g playwright`).
