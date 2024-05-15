// mediaLoader.js
import backgroundImage from '../../media/bg/bgdiamond.png';
import diamondIcon from '../../media/icons/diamante.png';
import soundFile from '../../media/backmusic.mp3';
import character from '../../media/fox.gif'
import g1 from '../../media/icons/g1.png'
import g2 from '../../media/icons/g2.png'
import docs from '../../media/icons/docs.png'
import tg from '../../media/icons/telegram.png'
import x from '../../media/icons/x.png'
import fox from '../../media/icons/fox.png'
import ton from '../../media/icons/ton.png'
import line from '../../media/bg/line.png'
import backgroundProfile from '../../media/bg/bgprofile.png'
import ProfileFox from '../../media/bg/profileFox.png'
import backgroundUpgrade from '../../media/bg/upgradeback.png'
import upgradetable from '../../media/bg/upgrade1.png'

import pickaxe1 from '../../media/pickaxes/1.png'


const mediaFiles = { backgroundImage, diamondIcon, soundFile ,character,g1,g2,docs,tg,fox,x,ton,line,backgroundProfile,ProfileFox,backgroundUpgrade,upgradetable,pickaxe1};
export { mediaFiles };

function preloadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = resolve;
        img.onerror = reject;
    });
}

function preloadAudio(src) {
    return new Promise((resolve, reject) => {
        const audio = new Audio();
        audio.src = src;
        audio.oncanplaythrough = resolve;
        audio.onerror = reject;
    });
}

export function loadAllMedia() {
    const loaders = Object.values(mediaFiles).map(file => {
        // Check file type based on its path or any other heuristic
        if (file.endsWith('.mp3')) {
            return preloadAudio(file);
        } else {
            return preloadImage(file);
        }
    });

    return Promise.all(loaders);
}
