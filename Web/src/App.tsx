import { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog'
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/form/CreateAdModal';
import axios from 'axios';
import './styles/main.css';
import logoImg from './assets/logo-nlw-esports.svg';



interface Game {
  id: string;
  title: string;
  bannerUrl: string;
  _count:{
    ads: number;
  }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games')
      .then(response => {
        setGames(response.data)
      })
  }, [])

  return (
    <div className="max-w-[1200px] mx-auto flex flex-col items-center my-20">
      
      <div className="flex flex-col items-center">
        <img src={logoImg} alt="logo" className="w-56" />
        <h1 className="text-6xl text-white font-black mt-20">
          Your<span className="text-transparent bg-nlw-gradient bg-clip-text"> duo </span>is here.
        </h1>
      </div>
      
      <div className="grid grid-cols-6 gap-6 mt-16">
        {games.map(game => {
          return (
            <GameBanner
              key={game.id}
              bannerUrl={game.bannerUrl}
              title={game.title}
              adsCount={game._count.ads}
              /> 
          )
        })}
        
      </div>
        <Dialog.Root>
          <CreateAdBanner />
          <CreateAdModal />
        </Dialog.Root>
    </div>
  )
}

export default App
