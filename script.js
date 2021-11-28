let video = document.getElementById("video");
let model;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d")
const setupCamera = () => {
    console.log('ss');
  navigator.mediaDevices
    .getUserMedia({
      video: { width: 600, height: 400 },
      audio: false,
    })
    .then((stream) => {
      video.srcObject = stream;
    });
};


const detectFaces =async () =>{
    const predictions =await model.estimateFaces(video, false);
    // console.log(predictions);
    ctx.drawImage(video,0,0,600,400);

    predictions.forEach(eachPeople => {
       ctx.beginPath();
       ctx.lineWidth ="4";
       ctx.strokeStyle = "blue";
       ctx.rect(
        eachPeople.topLeft[0],
        eachPeople.topLeft[1],
        eachPeople.bottomRight[0] -eachPeople.topLeft[0],
        eachPeople.bottomRight[1] -eachPeople.topLeft[1]

       )
       ctx.stroke();

       ctx.fillStyle = "red"
       eachPeople.landmarks.forEach(landmark =>{
           ctx.fillRect(landmark[0],landmark[1],5,5)
       })
    });
}

setupCamera();
video.addEventListener('loadeddata',async ()=>{
  ctx.canvas.width = window.innerWidth;

  ctx.canvas.height = 3*window.innerWidth/4;

  
    model =await blazeface.load();
    setInterval(detectFaces,60)
    // detectFaces()
})

