const audioElement = document.getElementById('audio')
const btnJoke = document.getElementById('button')
const langSelector = document.getElementById('lang-selector')

const apiKey = getTtsKey();
let hl = ''
let codec = 'MP3'
let src = ''
let language = ''
let jokeLanguage = ''

const setLanguage = () => {
  language = langSelector.value
}

const getJoke = async () => {
  if (language === 'german') {
    jokeLanguage = 'de'
  } else {
    jokeLanguage = 'en'
  }
  const jokeUrl = `https://v2.jokeapi.dev/joke/Any?lang=${jokeLanguage}&blacklistFlags=racist`
  const response = await fetch(jokeUrl);
  const data  = await response.json();
  console.log(data.setup)
  console.log(data.delivery)
  if (!data.error && typeof data.delivery != 'undefined' && typeof data.setup != 'undefined') {
    src = data.setup + data.delivery;
  } else {
    if (language === 'german') {
      src = "Ich fand leider keinen Joke.";
    } else {
      src = 'No joke found.'
    }
  }
}

const transformToSpeech = async () => {
  if (language === 'german') {
    hl = 'de-de'
  } else {
    hl = 'en-us'
  }
  const voiceUrl = `http://api.voicerss.org/?key=${apiKey}&hl=${hl}&c=${codec}&src=${src}`
  const response = await fetch(voiceUrl);
  audioElement.src = response.url;
  audioElement.play();
}

btnJoke.addEventListener('click', async () => {
  await getJoke();
  await transformToSpeech();
})

langSelector.addEventListener('change', setLanguage)
