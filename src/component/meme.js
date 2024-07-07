import React,{useState,useEffect} from 'react'
import memesData from './memesData'

export default function Meme() {
   // const [url, setUrl] = React.useState('https://i.imgflip.com/30b1gx.jpg');

   const [meme, setMeme] = React.useState({
      topText: '',
      bottomText: '',
      randomImg: 'http://i.imgflip.com/1bij.jpg'
   });

   const [allMeme, setAllMeme] = React.useState(memesData);

   function handleChange(event) {
      const { name, value } = event.target;
      setMeme(prevMeme => ({
         ...prevMeme,
         [name]: value
      }));
   }
   console.log(meme);

   useEffect(() => {
      fetch('https://api.imgflip.com/get_memes')
         .then(res => res.json())
      .then(data=>setAllMeme(data.data.memes))
   }, [])
   
   function getMemeImg() { 
      const randomMeme = allMeme[Math.floor(Math.random() * allMeme.length)];
      const url = randomMeme.url;
      setMeme({
         ...meme,
         randomImg: url
      });
   }
   return (
      <main>
         <div className='form' >
            <input
               type='text'
               name='topText'
               value={meme.topText}
               placeholder='Top Text'
               onChange={handleChange}
               className='form-input' />
            <input
               type='text'
               name='bottomText'
               value={meme.bottomText}
               onChange={handleChange}
               placeholder='Bottom Text'
               className='form-input' />
            <button
               onClick={getMemeImg} className='form-btn' >
               Get a new meme image 🌁
            </button>
         </div>
         <div className='meme'>
            <img src={meme.randomImg} alt='Meme' className='meme-img' />
            <h2 className='meme-text top'>{meme.topText}</h2>
            <h2 className='meme-text bottom'>{meme.bottomText}</h2>
         </div>
      </main>
   )
}