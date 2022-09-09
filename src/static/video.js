const peer = new Peer("asdfsdsssds");

peer.on('open', function (id) {
    console.log(id)
    const conn = peer.connect('asdfasdfsdfasf');
    conn.on('open', function () {
        conn.send('hi!');
    });

    peer.on("connection", (conn) => {
        console.log(conn)
        conn.on("data", (data) => {
            console.log(data);
        });
        conn.on("open", () => {
            conn.send("hello!");
        });
    });

    navigator.mediaDevices.getUserMedia({
        video: {
            facingMode: 'environment'
        },
        audio: true
    }).then((function (stream) {
        const call = peer.call('asdfasdfsdfasf', stream);
        call.on('stream', (remoteStream) => {
            console.log(remoteStream)
        })

    })).catch(function (err) {
        console.warn(err);
    });

});


const socketOptions = {
    transportOptions: {
        polling: {
            extraHeaders: {
                Authorization: 'Bearer ---'
            }
        }
    }
};

const chatSocket = io('http://10.0.0.108:3000', socketOptions);

chatSocket.emit('newUser', 'MOBILEEE');
chatSocket.on('userJoined', (data) => {

    const blob = new Blob([data]);
    const localVideo = document.getElementById("local-video");
    localVideo.src = URL.createObjectURL(blob);
})
/*chatSocket.on('userJoined', id => {
    const call = peer.call(id, myVideoStream);
    const vid = document.createElement('video');
    call.on('error', (err) => {
        alert(err);
    });
    call.on('stream', (userStream) => {
        addVideo(vid, userStream);
    })
});
*/
/*
navigator.mediaDevices.getUserMedia({ video: true }).then((function (stream) {

    const recorder = new MediaRecorder(stream, options);
    const fileReader = new FileReader();
    recorder.start(1000);
    recorder.ondataavailable = function (e) {

        chatSocket.emit('stream-data', e.data);

    }


    //    const localVideo = document.getElementById("local-video");
    //    localVideo.srcObject = stream;

})).catch(function (err) {
    console.warn(err);
});
*/

