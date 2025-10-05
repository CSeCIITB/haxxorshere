# Challenge Matrix - CTF Platform

A cyberpunk-themed challenge website with progressive unlocking system.

## Folder Structure

```
challenge-site/
│
├── index.html          ← Main webpage
├── style.css           ← Page styling  
├── script.js           ← Page logic (flags, unlocking, audio)
│
├── challenges/         ← Downloadable challenge files
│   ├── challenge1.zip
│   ├── challenge2.zip
│   └── challenge3.zip
│
├── audio/              ← Voice lines that play when solved
│   ├── voice1.mp3
│   ├── voice2.mp3
│   └── voice3.mp3
│
└── images/             ← Visual assets for the site
    └── README.txt
```

## Features

- **Progressive Challenge System**: Challenges unlock sequentially
- **Audio Integration**: Victory sounds and voice messages
- **Cyberpunk Theme**: Matrix-inspired dark design with neon effects
- **Responsive Design**: Works on desktop and mobile
- **Local Storage**: Progress is saved automatically

## Challenge Flags

1. **Digital Awakening** (Easy): `CTF{welcome_to_the_matrix}`
2. **Cipher Nexus** (Medium): `CTF{crypto_master}`  
3. **System Override** (Hard): `CTF{final_boss}`

## Setup Instructions

1. Extract all files to a folder called `challenge-site`
2. Replace the placeholder audio files in `audio/` with actual MP3 files
3. Add visual assets to the `images/` folder
4. Open `index.html` in a web browser

## Customization

- **Challenges**: Edit the `challengesData` array in `script.js`
- **Styling**: Modify colors and effects in `style.css`
- **Audio**: Replace placeholder files with actual MP3 recordings
- **Images**: Add background images and icons to the `images/` folder

## Browser Compatibility

- Modern browsers with HTML5 support
- JavaScript enabled
- Web Audio API support (for sound effects)

## Notes

- The current implementation uses text-to-speech for audio
- Challenge ZIP files contain placeholder content
- All progress is stored locally in the browser
- No server-side functionality required

Enjoy your journey through the Challenge Matrix! 🕶️
