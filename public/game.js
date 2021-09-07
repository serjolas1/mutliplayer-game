const socket = io("http://localhost:3000");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

const SIZE = 32;

const urlSearch = new URLSearchParams(window.location.search);

const username = urlSearch.get("username");

socket.emit("connectToGame", {
    username
})

document.addEventListener("keydown", (event) => {
    console.log(event.key);
    const key_direction = {
        "ArrowUp": "up",
        "ArrowDown": "down",
        "ArrowRight": "right",
        "ArrowLeft": "left",
    }

    socket.emit("move", {
        direction: key_direction[event.key]
    })
})

socket.on("players", (data) => {
    updateCanvas(data);
})

function updateCanvas(players) {
    console.log(players);
    ctx.fillStyle = "green";

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    players.forEach((player) => {
        ctx.fillRect(SIZE * player.position.x, SIZE * player.position.y, SIZE, SIZE);
    })
}
