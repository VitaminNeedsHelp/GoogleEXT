(() =>{
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;

        if (type === 'NEW') {
            currentVideo = videoId;
            newVideoLoaded();
        }
    });

    const newVideoLoaded = () => {
        const bookmarkBtnExists = document.getElementsByClassName('bookmark-btn')[0];

        if(!bookmarkBtnExists) {
            const bookmarkBtn = document.createElement('img');

            bookmarkBtn.src = chrome.runtime.getURL('assets/bookmark.png');
            bookmarkBtn.className = 'ytb-button ' + 'bookmark-btn';
            bookmarkBtn.title = 'Click to bookmark this video at the current timestamp';

            youtubeLeftControls = document.getElementsByClassName('ytp-left-controls')[0];
            youtubePlayer = document.getElementsByClassName('video-stream')[0];

            youtubeLeftControls.appendChild(bookmarkBtn);
            bookmarkBtn.addEventListener('click', addNewBookmarkEventHandler);
        }
    }
    newVideoLoaded();

    const addNewBookmarkEventHandler = () => {
        const currentTime = youtubePlayer.currentTime;
        const newBookmark = {
            time: currentTime,
            desc: 'Bookmark at ' + getTime(currentTime) + ' seconds'

        };

        chrome.storage.sync.set({
            
        });
    };
})();

const getTime = (t) => {
    var date = new Date(0);
    date.setSeconds(t);

    return date.toISOString().substr(11, 8);
};
