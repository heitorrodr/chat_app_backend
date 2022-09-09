const peer = new Peer("91993705151");

peer.on('open', function (id) {
    console.log('My peer ID is: ' + id);
});



peer.on("connection", (conn) => {

    conn.on("data", (data) => {
        // Will print 'hi!'
        console.log(data);
    });
    conn.on("open", () => {
        conn.send("hello!");
    });


    peer.on("call", (call) => {
	console.log(call)
        call.answer(window.localStream);
        call.on('stream', (remoteStream) => {
            console.log(remoteStream);
            console.log('jjj')
            const localVideo = document.getElementById("local-video");
            localVideo.srcObject = remoteStream;
        })


    })
});
