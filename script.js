class Song {
    constructor(name, artist) {
        this.name = name;
        this.artist = artist;
        this.prev = null;
        this.next = null;
    }
}

let head = null;
let current = null;

function addSong() {
    let name = document.getElementById("songName").value;
    let artist = document.getElementById("artistName").value;

    let newSong = new Song(name, artist);

    if (!head) {
        head = newSong;
        current = head;
    } else {
        let temp = head;
        while (temp.next) {
            temp = temp.next;
        }
        temp.next = newSong;
        newSong.prev = temp;
    }

    displayPlaylist();
}

function displayPlaylist() {
    let list = document.getElementById("playlist");
    list.innerHTML = "";

    let temp = head;
    while (temp) {
        let li = document.createElement("li");
        li.innerText = temp.name + " - " + temp.artist;
        list.appendChild(li);
        temp = temp.next;
    }
}

function nextSong() {
    if (current && current.next) {
        current = current.next;
        updateNowPlaying();
    }
}

function prevSong() {
    if (current && current.prev) {
        current = current.prev;
        updateNowPlaying();
    }
}

function updateNowPlaying() {
    document.getElementById("nowPlaying").innerText =
        "Now Playing: " + current.name + " - " + current.artist;
}

function shuffle() {
    let songs = [];
    let temp = head;

    while (temp) {
        songs.push(temp);
        temp = temp.next;
    }

    songs.sort(() => Math.random() - 0.5);

    head = songs[0];
    head.prev = null;

    let tempNode = head;
    for (let i = 1; i < songs.length; i++) {
        tempNode.next = songs[i];
        songs[i].prev = tempNode;
        tempNode = tempNode.next;
    }
    tempNode.next = null;

    current = head;
    displayPlaylist();
    updateNowPlaying();
}
