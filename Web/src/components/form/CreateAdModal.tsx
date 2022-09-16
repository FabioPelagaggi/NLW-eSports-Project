import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as ToggleGroup from '@radix-ui/react-toggle-group'
import { useEffect, useState, FormEvent } from 'react';
import { Check, GameController } from 'phosphor-react'
import axios from 'axios';
import { Input } from './input'


interface Game {
    id: string;
    title: string;
}

export function CreateAdModal(){
    const [games, setGames] = useState<Game[]>([])
    const [weekDays, setWeekDays] = useState<string[]>([])
    const [useVoiceChannel, setUseVoiceChannel] = useState(false)

    useEffect(() => {
        axios('http://localhost:3333/games')
            .then(response => {
                setGames(response.data)
            })
    }, [])

    async function handleCreateAd(event : FormEvent){
        event.preventDefault();
        
        const formData = new FormData(event.target as HTMLFormElement)
        const data = Object.fromEntries(formData)

        try {
            await axios.post(`http://localhost:3333/games/${data.game}/ads`, {
                name: data.name,
                yearsPlaying: Number(data.yearsPlaying),
                discord: data.discord,
                weekDays: weekDays.map(Number),
                hourStart: data.hourStart,
                hourEnd: data.hourEnd,
                useVoiceChannel: useVoiceChannel
            })

            alert('Ad created successfully')
        } catch(err){
            alert('Ad creation fail')
            console.log(err)
        }

        console.log(data)
        console.log(weekDays)
        console.log(useVoiceChannel)
    }

    return(
        <Dialog.Portal>
            <Dialog.Overlay className="bg-black/60 inset-0 fixed"/>
            <Dialog.Content className="fixed bg-[#2A2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-black/25">
                <Dialog.Title className="text-2xl font-black">Create an Ad</Dialog.Title>
                
                <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">

                    <div className="flex flex-col gap-2">
                        <label htmlFor="game" className="font-semibold">Choose a game</label>
                        <select 
                            name="game" 
                            id="game" 
                            className="
                                bg-zinc-900 
                                py-3 px-4 
                                rounded 
                                appearance-none
                                text-sm 
                                placeholder:text-zinc-500
                                cursor-pointer
                            "
                            defaultValue=""
                            >
                                <option disabled value="">Select a game</option>
                                {games.map(game => {
                                    return <option key={game.id} value={game.id}>{game.title}</option>
                                })}
                        </select>
                    </div>

                    <div className="flex flex-col gap-2">
                        <label htmlFor="name" className="font-semibold">Your Nickname</label>
                        <Input name="name" id="name" placeholder="How you'll be known"/>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="yearsPlaying" className="font-semibold">How long do you play?</label>
                            <Input name="yearsPlaying" id="yearsPlaying" type="number" placeholder="Tell how much experience you have"/>
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="discord" className="font-semibold">Discord Tag</label>
                            <Input name="discord" id="discord" type="text" placeholder="What's your discord tag" />
                        </div>
                    </div>

                    <div className="flex gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="weekDays" className="font-semibold">When do you usually play?</label>
                            
                            <ToggleGroup.Root value={weekDays} onValueChange={setWeekDays} type="multiple" className="grid grid-cols-4 gap-2"> 
                                <ToggleGroup.Item 
                                    value="0"
                                    title="Sunday"
                                    className={`w-8 h-8 rounded transition-all ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >S</ToggleGroup.Item>
                                
                                <ToggleGroup.Item
                                    value="1"
                                    title="Monday"
                                    className={`w-8 h-8 rounded transition-all ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >M</ToggleGroup.Item>
                                
                                <ToggleGroup.Item
                                    value="2" 
                                    title="Tuesday"
                                    className={`w-8 h-8 rounded transition-all ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >T</ToggleGroup.Item>
                                
                                <ToggleGroup.Item 
                                    value="3"
                                    title="Wednesday"
                                    className={`w-8 h-8 rounded transition-all ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >W</ToggleGroup.Item>
                                
                                <ToggleGroup.Item 
                                    value="4"
                                    title="Thursday"
                                    className={`w-8 h-8 rounded transition-all ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >T</ToggleGroup.Item>
                                
                                <ToggleGroup.Item 
                                    value="5"
                                    title="Friday"
                                    className={`w-8 h-8 rounded transition-all ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >F</ToggleGroup.Item>
                                
                                <ToggleGroup.Item 
                                    value="6"
                                    title="Saturday"
                                    className={`w-8 h-8 rounded transition-all ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`}
                                >S</ToggleGroup.Item>
                            </ToggleGroup.Root>
                        </div>
                    <div className="flex flex-col gap-2 flex-1">
                        <label htmlFor="hourStart" className="font-semibold">Whith time of day?</label>
                        <div className="grid grid-cols-2 gap-2">
                            <Input name="hourStart" id="hourStart" type="time" placeholder="Start"/>
                            <Input name="hourEnd" id="hourEnd" type="time" placeholder="End"/>
                        </div>
                    </div>
                    </div>

                    <label className="mt-2 flex items-center gap-2 text-sm cursor-pointer">
                        <Checkbox.Root 
                            onCheckedChange={(checked) => {
                                if(checked == true){
                                    setUseVoiceChannel(true)
                                } else {
                                    setUseVoiceChannel(false)
                                }
                            }} 
                            className="w-6 h-6 p-1 rounded bg-zinc-900">
                            <Checkbox.Indicator>
                                <Check className="w-4 h-4 text-emerald-400" />
                            </Checkbox.Indicator>
                        </Checkbox.Root>
                        Use voice communication
                    </label>

                    <footer className="mt-4 flex justify-end gap-4">
                        <Dialog.Close className="bg-zinc-500 px-5 h-12 rounded-md font-semibold transition-all hover:bg-zinc-600">Cancel</Dialog.Close>
                        <button type="submit" className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 transition-all hover:bg-violet-600">
                            <GameController size={24} />
                            Publish
                        </button>
                    </footer>

                </form>
            </Dialog.Content>
        </Dialog.Portal>
    )
}