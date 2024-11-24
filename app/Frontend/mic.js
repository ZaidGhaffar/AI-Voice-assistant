if (active){
   navigator.mediaDevices.getUserMedia({audio : true})
   .then(strem =>{
                console.log("Microphone access granted 🎙️");
                sliderText.textContent = "Listening... 🎧";
            })
    .catch(error=>
    {
        console.error("Microphone access denied ❌", error);
        sliderText.textContent = "Mic access denied 😢";
    });
}
    
