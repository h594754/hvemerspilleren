    import { useEffect, useState } from "react"
    import players from "../json/players.json"

    export default function GuessPlayer() {
        const [playerToFind, setPlayerToFind] = useState(null);
        const [guess1, setGuess1] = useState(null);
        const [guess2, setGuess2] = useState(null);
        const [guess3, setGuess3] = useState(null);
        const [guess4, setGuess4] = useState(null);
        const [guess5, setGuess5] = useState(null);
        const [filteredPlayers, setFilteredPlayers] = useState(null);
        const [guessCount, setGuessCount] = useState(0);
        const [searchItem, setSearchItem] = useState("");
        const allPlayers = players; 

        

        useEffect(() => {
            const findPlayer = () => {
                const player = allPlayers[2];
                setPlayerToFind(player); // Set the selected player
            }

            findPlayer(); 
        }, []);

        const guessPlayer = (guess) => {
            if(guess === playerToFind.navn) {
                alert("YOU WON!")
                console.log("True is run!")
                return true;
            } 

            

            console.log("this is run", guess);
            return false;
        }

        console.log("Who to find:", allPlayers[2]);

        const handleInputChange = (e) => {

            const searchTerm = e.target.value;
            setSearchItem(searchTerm);

            if(searchTerm.length >= 2) {
                const filteredItems = allPlayers.filter((player) => player.navn.toLowerCase().includes(searchTerm.toLowerCase()));
                setFilteredPlayers(filteredItems);
            }
            
        }

        const calculateAge = (dateOfBirth) => {
            const [day, month, year] = dateOfBirth.split('.');
            const birthDate = new Date(year, month - 1, day);
            const today = new Date();
            let age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();

            // If the birth date hasn't occurred yet this year, subtract 1 from the age
            if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }

            return age;
        }

        
        const handleSubmit = (playerName) => {
            // e.preventDefault();

            console.log("INput to handle sumbit", playerName);
            if (guessCount > 4) {
                alert("Game over, not anymore guesses");
                return;
            }
            const playerInfo = allPlayers.find((player) => player.navn === playerName);

            if (!playerInfo) {
                alert("Player not found");
                return;
            }
            
            
            if(guessPlayer(playerName)) {
                return;
            } 


            if (guessCount === 0) {
                setGuess1(playerInfo);
                
            } else if (guessCount === 1) {
                setGuess2(playerInfo);
                
            } else if (guessCount === 2) {
                setGuess3(playerInfo);
                
            } else if (guessCount === 3) {
                setGuess4(playerInfo);
                
            } else if (guessCount === 4) {
                setGuess5(playerInfo);
                
            }



            setGuessCount(guessCount + 1);
            setSearchItem("");
            setFilteredPlayers(null);
            
        };

        console.log("Guess count:", guessCount);
        console.log("Guesses:", { guess1, guess2, guess3, guess4, guess5 });
        


        return (
            <div>
                
                    {guessCount < 5 ? 
                
                    
                    <div>
                    <input type="text" value={searchItem} onChange={handleInputChange} />
                    <ul>
                        
                        {searchItem && filteredPlayers?.map((player) => (
                            <li key={player.navn} onClick={() => handleSubmit(player.navn)}>{player.navn} {player.posisjon}</li>
                        ))}
                    </ul>
                    </div>
                     
                    :
                    <div>
                        The correct player was: {playerToFind.navn} 
                    </div>
                    }

                    <div>
                        {/* Check and display guess5 details if guessed */}
                        {guess5 && (
                            <div>
                            <p>{guess5.navn}</p>
                            
                            {playerToFind.draktnr === guess5.draktnr ? 
                                <p className="correct">{guess5.draktnr}</p>
                                :(
                                    playerToFind.draktnr > guess5.draktnr ? (
                                        <p>&uarr; {guess5.draktnr}</p>
                                    )
                                    : 
                                    (
                                        <p>&darr; {guess5.draktnr}</p>
                                    )
                                )
                            }

                            {calculateAge(playerToFind.dateofbirth) === calculateAge(guess5.dateofbirth) ? (
                                <p className="correct"> {calculateAge(guess5.dateofbirth)} </p>
                            ) : (
                                calculateAge(playerToFind.dateofbirth) > calculateAge(guess5.dateofbirth) ? (
                                    <p>&uarr; {calculateAge(guess5.dateofbirth)}</p>
                            ) : (
                                    <p>&darr; {calculateAge(guess5.dateofbirth)}</p>
                            )
                            )}

                            <div>
                            {guess5.nasjonalitet === playerToFind.nasjonalitet ? 
                                <p className="correct"> {guess5.nasjonalitet} </p> :
                                <p style={{color: "red"}}>{guess5.nasjonalitet} </p> 
                            }
                            </div>
                            {guess5.posisjon === playerToFind.posisjon ? 
                                <p className="correct"> {guess5.posisjon} </p> :
                                <p style={{color: "red"}}>{guess5.posisjon} </p> 
                            }
                            {/* <img src={guess5.bilde} alt="Playerimage" style={{ height: "20px", width: "auto" }} /> */}
                            </div>
                        )}

                        {/* Check and display guess4 details if guessed */}
                        {guess4 && (
                            <div>
                            <p>{guess4.navn}</p>
                            {playerToFind.draktnr === guess4.draktnr ? 
                                <p className="correct">{guess4.draktnr}</p>
                                :(
                                    playerToFind.draktnr > guess4.draktnr ? (
                                        <p>&uarr; {guess4.draktnr}</p>
                                    )
                                    : 
                                    (
                                        <p>&darr; {guess4.draktnr}</p>
                                    )
                                )
                            }

                            {calculateAge(playerToFind.dateofbirth) === calculateAge(guess4.dateofbirth) ? (
                                <p className="correct"> {calculateAge(guess4.dateofbirth)} </p>
                            ) : (
                                calculateAge(playerToFind.dateofbirth) > calculateAge(guess4.dateofbirth) ? (
                                    <p>&uarr; {calculateAge(guess4.dateofbirth)}</p>
                            ) : (
                                    <p>&darr; {calculateAge(guess4.dateofbirth)}</p>
                            )
                            )}


                            {guess4.nasjonalitet === playerToFind.nasjonalitet ? 
                                <p className="correct"> {guess4.nasjonalitet} </p> :
                                <p style={{color: "red"}}>{guess4.nasjonalitet} </p> 
                            }
                            {guess4.posisjon === playerToFind.posisjon ? 
                                <p className="correct"> {guess4.posisjon} </p> :
                                <p style={{color: "red"}}>{guess4.posisjon} </p> 
                            }
                            {/* <img src={guess4.bilde} alt="Playerimage" style={{ height: "20px", width: "auto" }} /> */}
                            </div>
                        )}

                        {/* Check and display guess3 details if guessed */}
                        {guess3 && (
                            <div>
                            <p>{guess3.navn}</p>
                            {playerToFind.draktnr === guess3.draktnr ? 
                                <p className="correct">{guess3.draktnr}</p>
                                :(
                                    playerToFind.draktnr > guess3.draktnr ? (
                                        <p>&uarr; {guess3.draktnr}</p>
                                    )
                                    : 
                                    (
                                        <p>&darr; {guess3.draktnr}</p>
                                    )
                                )
                            }
                            
                            {calculateAge(playerToFind.dateofbirth) === calculateAge(guess1.dateofbirth) ? (
                                <p className="correct"> {calculateAge(guess3.dateofbirth)} </p>
                            ) : (
                                calculateAge(playerToFind.dateofbirth) > calculateAge(guess3.dateofbirth) ? (
                                    <p>&uarr; {calculateAge(guess3.dateofbirth)}</p>
                            ) : (
                                    <p>&darr; {calculateAge(guess3.dateofbirth)}</p>
                            )
                            )}
                            
                            
                            {guess3.nasjonalitet === playerToFind.nasjonalitet ? 
                                <p className="correct"> {guess3.nasjonalitet} </p> :
                                <p style={{color: "red"}}>{guess3.nasjonalitet} </p> 
                            }
                            {guess3.posisjon === playerToFind.posisjon ? 
                               <p className="correct"> {guess3.posisjon} </p> :
                                <p style={{color: "red"}}>{guess3.posisjon} </p> 
                            }
                            {/* <img src={guess3.bilde} alt="Playerimage" style={{ height: "20px", width: "auto" }} /> */}
                            </div>
                        )}

                        {/* Check and display guess2 details if guessed */}
                        {guess2 && (
                            <div>
                            <p>{guess2.navn}</p>
                            {playerToFind.draktnr === guess2.draktnr ? 
                                <p className="correct">{guess2.draktnr}</p>
                                :(
                                    playerToFind.draktnr > guess2.draktnr ? (
                                        <p>&uarr; {guess2.draktnr}</p>
                                    )
                                    : 
                                    (
                                        <p>&darr; {guess2.draktnr}</p>
                                    )
                                )
                            }
                            
                            {calculateAge(playerToFind.dateofbirth) === calculateAge(guess2.dateofbirth) ? (
                                <p className="correct"> {calculateAge(guess1.dateofbirth)} </p>
                            ) : (
                                calculateAge(playerToFind.dateofbirth) > calculateAge(guess2.dateofbirth) ? (
                                    <p>&uarr; {calculateAge(guess2.dateofbirth)}</p>
                            ) : (
                                    <p>&darr; {calculateAge(guess2.dateofbirth)}</p>
                            )
                            )}
                            
                            
                            
                            {guess2.nasjonalitet === playerToFind.nasjonalitet ? 
                                <p className="correct"> {guess2.nasjonalitet} </p> :
                                <p style={{color: "red"}}>{guess2.nasjonalitet} </p> 
                            }
                            {guess2.posisjon === playerToFind.posisjon ? 
                                <p className="correct"> {guess2.posisjon} </p> :
                                <p style={{color: "red"}}>{guess2.posisjon} </p> 
                            }
                            {/* <img src={guess2.bilde} alt="Playerimage" style={{ height: "20px", width: "auto" }} /> */}
                            </div>
                        )}

                        {/* Check and display guess1 details if guessed */}
                        {guess1 && (
                            <div>
                            <p>{guess1.navn}</p>

                            {playerToFind.draktnr === guess1.draktnr ? 
                                <p className="correct">{guess1.draktnr}</p>
                                :(
                                    playerToFind.draktnr > guess1.draktnr ? (
                                        <p>&uarr; {guess1.draktnr}</p>
                                    )
                                    : 
                                    (
                                        <p>&darr; {guess1.draktnr}</p>
                                    )
                                )
                            }
                            
                            {calculateAge(playerToFind.dateofbirth) === calculateAge(guess1.dateofbirth) ? (
                                <p className="correct"> {calculateAge(guess1.dateofbirth)} </p>
                            ) : (
                                calculateAge(playerToFind.dateofbirth) > calculateAge(guess1.dateofbirth) ? (
                                    <p>&uarr; {calculateAge(guess1.dateofbirth)}</p>
                            ) : (
                                    <p>&darr; {calculateAge(guess1.dateofbirth)}</p>
                            )
                            )}
                           




                            {guess1.nasjonalitet === playerToFind.nasjonalitet ? 
                                <p className="correct"> {guess1.nasjonalitet} </p> :
                                <p style={{color: "red"}}>{guess1.nasjonalitet} </p> 
                            }
                            {guess1.posisjon === playerToFind.posisjon ? 
                                <p className="correct"> {guess1.posisjon} </p> :
                                <p style={{color: "red"}}>{guess1.posisjon} </p> 
                            }
                            {/* <img src={guess1.bilde} alt="Playerimage" style={{ height: "20px", width: "auto" }} /> */}
                            </div>
                        )}
                    </div>


            
                    


            </div>
        )


    }