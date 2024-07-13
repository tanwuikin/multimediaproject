/*
const express = require('express');
const app = express();
const fs = require('fs');

app.get('/', function(req, res){
    res.sendFile(__dirname+ "/index.html");
})


app.get('/video', function(req, res){
    const range = req.headers.range;
    if(!range){
        res.status(400).send("Requires Range header");
    }
    const videoPath = "./cdn.mp4";
    const videoSize = fs.statSync(videoPath).size;
    // console.log("size of video is:", videoSize);
    const CHUNK_SIZE = 10**6; //1 MB
    const start = Number(range.replace(/\D/g, "")); 
    const end = Math.min(start + CHUNK_SIZE , videoSize-1);
    const contentLength = end-start+1;
    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": 'bytes',
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    }
    res.writeHead(206,headers);
    const videoStream = fs.createReadStream(videoPath,{start, end});
    videoStream.pipe(res);

})

app.listen(3000, function(){
    console.log("Server is running on port:", 3000);
})
*/

/*
const express = require('express');
const app = express();
const fs = require('fs');

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get('/video', function(req, res) {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
        return;
    }

    const videoName = req.query.name;
    if (!videoName) {
        res.status(400).send("Requires video name");
        return;
    }

    const videoPath = `./${videoName}.mp4`;
    if (!fs.existsSync(videoPath)) {
        res.status(404).send("Video not found");
        return;
    }

    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6; // 1 MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": 'bytes',
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    };

    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
});

app.listen(2999, function() {
    console.log("Server is running on port:", 2999);
});
*/

/*
const express = require('express');
const app = express();
const fs = require('fs');

// Function to simulate QoS parameters
function calculateQoS() {
    const latency = Math.floor(Math.random() * 900) + 100; // 100 to 1000 milliseconds
    const bitrate = Math.floor(Math.random() * 4500) + 500; // 500 to 5000 kbps
    const packetLoss = (Math.random() * 10).toFixed(2); // 0.00 to 10.00
    const syncSkew = Math.floor(Math.random() * 200) - 100; // -100 to 100 milliseconds
    const playbackJitter = Math.floor(Math.random() * 50); // 0 to 50 milliseconds

    return { latency, bitrate, packetLoss, syncSkew, playbackJitter };
}

app.get('/', function(req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.get('/video', function(req, res) {
    const range = req.headers.range;
    if (!range) {
        res.status(400).send("Requires Range header");
        return;
    }

    const videoName = req.query.name;
    if (!videoName) {
        res.status(400).send("Requires video name");
        return;
    }

    const videoPath = `./${videoName}.mp4`;
    if (!fs.existsSync(videoPath)) {
        res.status(404).send("Video not found");
        return;
    }

    const videoSize = fs.statSync(videoPath).size;
    const CHUNK_SIZE = 10 ** 6; // 1 MB
    const start = Number(range.replace(/\D/g, ""));
    const end = Math.min(start + CHUNK_SIZE, videoSize - 1);
    const contentLength = end - start + 1;

    const headers = {
        "Content-Range": `bytes ${start}-${end}/${videoSize}`,
        "Accept-Ranges": 'bytes',
        "Content-Length": contentLength,
        "Content-Type": "video/mp4"
    };

    // Simulate QoS parameters
    const qosParams = calculateQoS();

    // Append QoS headers
    Object.assign(headers, {
        "X-Latency": qosParams.latency,
        "X-Bitrate": qosParams.bitrate,
        "X-Packet-Loss": qosParams.packetLoss,
        "X-Sync-Skew": qosParams.syncSkew,
        "X-Playback-Jitter": qosParams.playbackJitter
    });

    res.writeHead(206, headers);
    const videoStream = fs.createReadStream(videoPath, { start, end });
    videoStream.pipe(res);
});

app.listen(2999, function() {
    console.log("Server is running on port:", 2999);
});
*/


<!DOCTYPE html>
<html>
<head>
    <title>Video streaming with Node.js</title>
</head>
<body>
    <h1>Video Streaming</h1>

    <ul>
        <li><a href="#" onclick="playVideo('Negaraku')">Play Negaraku</a></li>
        <li><a href="#" onclick="playVideo('VarsitiKita')">Play VarsitiKita</a></li>
        <li><a href="#" onclick="playVideo('DuliYangMahaMulia')">Play DuliYangMahaMulia</a></li>
    </ul>

    <video id="videoPlayer" width="50%" controls>
        <source id="videoSource" src="https://newtesting1.s3.Asia Pacific (Singapore) ap-southeast-1.amazonaws.com/Negaraku.mp4" type="video/mp4">
        Your browser does not support the video tag.
    </video>

    <!-- Placeholder for QoS parameters -->
    <div id="qosParameters">
        <h2>Quality of Service Parameters</h2>
        <ul>
            <li><strong>Latency:</strong> <span id="latencyValue">Calculating...</span> ms</li>
            <li><strong>Bitrate:</strong> <span id="bitrateValue">Calculating...</span> kbps</li>
            <li><strong>Packet Loss:</strong> <span id="packetLossValue">Calculating...</span>%</li>
            <li><strong>Sync Skew:</strong> <span id="syncSkewValue">Calculating...</span> ms</li>
            <li><strong>Playback Jitter:</strong> <span id="playbackJitterValue">Calculating...</span> ms</li>
        </ul>
    </div>

    <script>
        // Function to update QoS parameters on the webpage
        function updateQoS(latency, bitrate, packetLoss, syncSkew, playbackJitter) {
            document.getElementById('latencyValue').textContent = latency;
            document.getElementById('bitrateValue').textContent = bitrate;
            document.getElementById('packetLossValue').textContent = packetLoss;
            document.getElementById('syncSkewValue').textContent = syncSkew; // Display syncSkew with ' ms'
            document.getElementById('playbackJitterValue').textContent = playbackJitter; // Display playbackJitter with ' ms'
        }

        function playVideo(videoName) {
            const videoPlayer = document.getElementById('videoPlayer');
            const videoSource = document.getElementById('videoSource');
            videoSource.src = `https://your-bucket-name.s3.your-region.amazonaws.com/${videoName}.mp4`;
            videoPlayer.load();
            videoPlayer.play();

            // Simulate updating QoS every 5 seconds (for demo purposes)
            setInterval(() => {
                const latency = Math.floor(Math.random() * 900) + 100;
                const bitrate = Math.floor(Math.random() * 4500) + 500;
                const packetLoss = (Math.random() * 10).toFixed(2);
                const syncSkew = Math.floor(Math.random() * 200) - 100;
                const playbackJitter = Math.floor(Math.random() * 50);
                updateQoS(latency, bitrate, packetLoss, syncSkew, playbackJitter); // Pass all QoS parameters
            }, 2000); // Update every 2 seconds
        }
    </script>
</body>
</html>

