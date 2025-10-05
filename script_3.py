# Create placeholder files for the challenges and audio folders
import os
import zipfile

# Create directories
os.makedirs('challenges', exist_ok=True)
os.makedirs('audio', exist_ok=True)
os.makedirs('images', exist_ok=True)

# Create placeholder challenge files
challenge_files = {
    'challenge1.zip': 'Challenge 1: Digital Awakening\n\nThis would contain the actual challenge files, puzzles, and instructions.\n\nFlag: CTF{welcome_to_the_matrix}',
    'challenge2.zip': 'Challenge 2: Cipher Nexus\n\nThis would contain cryptographic puzzles and encrypted files to decode.\n\nFlag: CTF{crypto_master}', 
    'challenge3.zip': 'Challenge 3: System Override\n\nThis would contain the final, most difficult challenge files.\n\nFlag: CTF{final_boss}'
}

for filename, content in challenge_files.items():
    filepath = os.path.join('challenges', filename)
    with zipfile.ZipFile(filepath, 'w') as zf:
        zf.writestr('readme.txt', content)
        zf.writestr('challenge.txt', f'Placeholder challenge file for {filename}')

print("✅ Created challenge ZIP files:")
for filename in challenge_files.keys():
    print(f"   - challenges/{filename}")

# Create placeholder audio files (text files explaining audio content)
audio_files = {
    'voice1.mp3': 'Voice message: "Congratulations! You\'ve taken your first step into the matrix."',
    'voice2.mp3': 'Voice message: "Excellent work, crypto master. The codes bend to your will."',
    'voice3.mp3': 'Voice message: "System compromised. You are the chosen one. Welcome to the real world."'
}

for filename, content in audio_files.items():
    filepath = os.path.join('audio', filename + '.txt')
    with open(filepath, 'w') as f:
        f.write(f"Placeholder for {filename}\n\n{content}\n\nNote: Replace this text file with actual MP3 audio file.")

print("✅ Created audio placeholder files:")
for filename in audio_files.keys():
    print(f"   - audio/{filename}.txt (placeholder)")

# Create a README for the images folder
with open('images/README.txt', 'w') as f:
    f.write("""Images Folder
=============

This folder should contain images to make your challenge site look visually appealing.

Suggested images:
- background.jpg - Main background image
- logo.png - Site logo
- challenge-icons/ - Icons for different challenge types
- effects/ - Visual effect images

The CSS is already set up to use background images and visual effects.
You can add images here and reference them in the CSS file.
""")

print("✅ Created images folder with README")

# Create a main README file
readme_content = """# Challenge Matrix - CTF Platform

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
"""

with open('README.md', 'w') as f:
    f.write(readme_content)

print("✅ Created README.md with setup instructions")

# List all created files
print("\n📁 Complete file structure created:")
print("├── index.html")
print("├── style.css") 
print("├── script.js")
print("├── README.md")
print("├── challenges/")
print("│   ├── challenge1.zip")
print("│   ├── challenge2.zip")
print("│   └── challenge3.zip")
print("├── audio/")
print("│   ├── voice1.mp3.txt (placeholder)")
print("│   ├── voice2.mp3.txt (placeholder)")
print("│   └── voice3.mp3.txt (placeholder)")
print("└── images/")
print("    └── README.txt")

print("\n🎉 Challenge Matrix website files are ready for download!")