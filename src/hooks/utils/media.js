// mediaLoader.js
import backgroundImage from '../../media/bg/bgdiamond.png';
import diamondIcon from '../../media/icons/diamante.png';
import soundFile from '../../media/backmusic.mp3';
import character0 from '../../media/anim/0.gif'
import character1 from '../../media/anim/1.gif'
import character2 from '../../media/anim/2.gif'
import character3 from '../../media/anim/3.gif'
import character4 from '../../media/anim/4.gif'
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

import pickaxe0 from '../../media/pickaxes/1.png'
import pickaxe1 from '../../media/pickaxes/1.png'
import pickaxe2 from '../../media/pickaxes/2.png'
import pickaxe3 from '../../media/pickaxes/3.png'
import pickaxe4 from '../../media/pickaxes/4.png'


const mediaFiles = { backgroundImage, diamondIcon, soundFile ,character0,g1,g2,docs,tg,fox,x,ton,line,backgroundProfile,ProfileFox,backgroundUpgrade,upgradetable,pickaxe1,character1,
    pickaxe0,pickaxe2,pickaxe3,pickaxe4,character2,character3,character4
};
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
    const audio = new Audio();
    if (audio.canPlayType('audio/mpeg')) {
        return new Promise((resolve, reject) => {
            audio.src = src;
            audio.oncanplaythrough = resolve;
            audio.onerror = () => reject(new Error('Failed to load audio: ' + src));
        });
    } else {
        return Promise.reject(new Error('MP3 audio not supported by this browser.'));
    }
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
