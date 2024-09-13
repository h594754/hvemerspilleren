    import { useEffect, useState } from "react"
    import players from "../json/players.json"

    export default function GuessPlayer() {
        const [playerToFind, setPlayerToFind] = useState(null);
        const [guess1, setGuess1] = useState(null);
        const [guess2, setGuess2] = useState(null);
        const [guess3, setGuess3] = useState(null);
        const [guess4, setGuess4] = useState(null);
        const [guess5, setGuess5] = useState(null);
        const [guess, setGuess] = useState("");
        const [guessCount, setGuessCount] = useState(0);

        

        useEffect(() => {
            const findPlayer = () => {
                const player = players[2];
                setPlayerToFind(player); // Set the selected player
            }

            findPlayer(); 
        }, []);

        const guessPlayer = (guess) => {
            if(guess === playerToFind.navn) {
                alert("YOU WON!")
                return;
            } 

            

            console.log("this is run", guess);
        }

        
        
        const handleSubmit = (e) => {
            e.preventDefault();
            
            if (guessCount > 4) {
                alert("Game over, not anymore guesses");
                return;
            }

            if (guessCount === 0) {
                setGuess1(guess);
                guessPlayer(guess);
            } else if (guessCount === 1) {
                setGuess2(guess);
                guessPlayer(guess);
            } else if (guessCount === 2) {
                setGuess3(guess);
                guessPlayer(guess);
            } else if (guessCount === 3) {
                setGuess4(guess);
                guessPlayer(guess);
            } else if (guessCount === 4) {
                setGuess5(guess);
                guessPlayer(guess);
            }

            setGuessCount(guessCount + 1);
            setGuess("");

            
        };

        console.log("Guess count:", guessCount);
        console.log("Guesses:", { guess1, guess2, guess3, guess4, guess5 });
        


        return (
            <div>
                
                    {guessCount < 5 ? 
                    <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)} 
                    />  
                    <button type="submit">Choose player</button>
                    </form>
                    :
                    <div>
                        The correct player was: {playerToFind.navn} 
                    </div>
                    }
            
                    


            </div>
        )


    }