//Remplire par votre propre clé api récupérer sur le site de google cloud console
const apiKey = "YOUR_API_KEY";
//Remplire par votre l'ID de votre chaine youtube 
//exemple https://www.youtube.com/channel/UCxxxxxxxxxxxxxxxxxxxxxx l'ID de la chaine est UCxxxxxxxxxxxxxxxxxxxxxx 
const channelId = "YOUR_CHANNEL_ID"; 

async function checkLive() {
    //Url pour récupérer les donné de l'API
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&eventType=live&key=${apiKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        //On vérifi si la chaine est en live 
        if (data.items.length > 0) {
            let videoId = data.items[0].id.videoId;
            document.getElementById("live-player").src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            document.getElementById("live-container").style.display = "block";
            document.getElementById("waiting-container").style.display = "none";
        } else {
            document.getElementById("live-container").style.display = "none";
            document.getElementById("waiting-container").style.display = "block";
        }
    } catch (error) {
        console.error("Erreur lors de la récupération du live :", error);
    }
}

checkLive();