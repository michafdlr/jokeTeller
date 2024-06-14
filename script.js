const audioElement = document.getElementById('audio')
const btnJoke = document.getElementById('button')

const apiKey = getTtsKey();
let hl = 'de-de'
let codec = 'MP3'
let src = 'Hallo Welt!'

const jokeUrl = 'https://v2.jokeapi.dev/joke/Any?lang=de&blacklistFlags=racist'

const getJoke = async () => {
  const response = await fetch(jokeUrl);
  const data  = await response.json();
  console.log(data.delivery)
  if (!data.error && typeof data.delivery != 'undefined') {
    src = data.delivery;
  } else {
    src = "Ich fand leider keinen Joke.";
  }
}

const transformToSpeech = async () => {
  const voiceUrl = `http://api.voicerss.org/?key=${apiKey}&hl=${hl}&c=${codec}&src=${src}`
  const response = await fetch(voiceUrl);
  audioElement.src = response.url;
  audioElement.play();
}

btnJoke.addEventListener('click', async () => {
  await getJoke();
  await transformToSpeech();
})
