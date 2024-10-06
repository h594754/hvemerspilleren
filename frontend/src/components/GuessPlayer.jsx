    import { useEffect, useState } from "react"
    import players from "../json/players.json"
    import { Alert, Box } from "@mui/material";

    export default function GuessPlayer() {
        const [playerToFind, setPlayerToFind] = useState(null);
        const [guesses, setGuesses] = useState([]);
        const [filteredPlayers, setFilteredPlayers] = useState(null);
        const [guessCount, setGuessCount] = useState(0);
        const [searchItem, setSearchItem] = useState("");
        const [correctPlayer, setCorrectPlayer] = useState(false);
        const allPlayers = players; 
        const [level, setLevel] = useState(1);

        

        useEffect(() => {
            const findPlayer = () => {
                if(level == "1") {
                    const player = allPlayers[2]; // Setting a player for testing
                    setPlayerToFind(player);
                    
                }
                else if(level == "2") {
                    const player = allPlayers[6]; // Setting a player for testing
                    setPlayerToFind(player);
                    
                }
                else if(level == "3") {
                    const player = allPlayers[10]; // Setting a player for testing
                    setPlayerToFind(player);
                    
                }
                else if(level == "4") {
                    const player = allPlayers[11]; // Setting a player for testing
                    setPlayerToFind(player);
                    
                }
                
            }

            findPlayer(); 
        }, [level]);



        const changeLevel = (newLevel) => {
            setLevel(newLevel);
            setSearchItem("");
            setGuessCount(0);
            setGuesses([]);
            setCorrectPlayer(null);
        }
        

        const guessPlayer = (guess) => {
            if(guess === playerToFind.navn) {
                setCorrectPlayer(true);
                return true;
            } 
            return false;
        }


        const handleInputChange = (e) => {

            const searchTerm = e.target.value;
            setSearchItem(searchTerm);

            if(searchTerm.length >= 2) {
                const filteredItems = allPlayers.filter((player) => player.navn.toLowerCase().includes(searchTerm.toLowerCase()));
                setFilteredPlayers(filteredItems);
            }
            if(searchItem === "") {
                setFilteredPlayers(null);
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


            setGuesses([playerInfo, ...guesses]);
            setGuessCount(guessCount + 1);
            setSearchItem("");
            setFilteredPlayers(null);

        };


        return (
            <div>
                <div>
                
                <select name="levels" id="levels" value={level} onChange={(e) => changeLevel(e.target.value)}>
                        <option value="1"> Level 1 </option>
                        <option value="2"> Level 2 </option>
                        <option value="3"> Level 3 </option>
                        <option value="4"> Level 4 </option>
                        
                    </select>    
                </div>

                
              {correctPlayer && (
                <Alert icon={false} style={{backgroundColor: "green", color: "white", maxWidth: "200px", alignItems: "center",  margin: "auto", marginBottom: "10px"}}>Correct</Alert>
              )}
              {guessCount > 4 && !correctPlayer && (
                 <Alert icon={false} style={{backgroundColor: "red", color: "white", maxWidth: "350px", alignItems: "center",  margin: "auto", marginBottom: "10px"}}>The correct player was: {playerToFind.navn} </Alert>
              )}

              <div className="searchbar-container">
                
              <div className="searchbar" style={{ visibility: guessCount < 5 && !correctPlayer ? 'visible' : 'hidden' }}>
                <input
                  type="text"
                  value={searchItem}
                  onChange={handleInputChange}
                  placeholder={`Gjett ${guessCount + 1} av 5`}
                />
                <ul>
                  {searchItem && filteredPlayers?.map((player) => (
                    <li key={player.navn} onClick={() => handleSubmit(player.navn)}>
                      {player.navn} {player.posisjon}
                    </li>
                ))}
                    


                  
                </ul>
              </div>
                
              </div>
          
              <div>
                    {correctPlayer && (
                    <div>
                        <p className="correct">{playerToFind.navn}</p>
                        <Box className="player-card-container">
                        <p className="correct">#{playerToFind.draktnr}</p>
                        <p className="correct">{calculateAge(playerToFind.dateofbirth)}</p>
                        <p className="correct">{playerToFind.nasjonalitet}</p>
                        <p className="correct">{playerToFind.posisjon}</p>
                        </Box>
                      </div>
                    )}
              
              


              {guesses.map((guess, index) => (
                    <div key={index}>
                        <p className="player-name">{guess.navn}</p>
                        <Box className="player-card-container">
                            {playerToFind.draktnr === guess.draktnr ? (
                                <p className="correct">#{guess.draktnr}</p>
                            ) : playerToFind.draktnr > guess.draktnr ? (
                                <p>&uarr; #{guess.draktnr}</p>
                            ) : (
                                <p>&darr; #{guess.draktnr}</p>
                            )}
                            {calculateAge(playerToFind.dateofbirth) === calculateAge(guess.dateofbirth) ? (
                                <p className="correct">{calculateAge(guess.dateofbirth)}</p>
                            ) : calculateAge(playerToFind.dateofbirth) > calculateAge(guess.dateofbirth) ? (
                                <p>&uarr; {calculateAge(guess.dateofbirth)}</p>
                            ) : (
                                <p>&darr; {calculateAge(guess.dateofbirth)}</p>
                            )}
                            <div>
                                {guess.nasjonalitet === playerToFind.nasjonalitet ? (
                                    <p className="correct">{guess.nasjonalitet}</p>
                                ) : (
                                    <p style={{ color: "red" }}>{guess.nasjonalitet}</p>
                                )}
                            </div>
                            {guess.posisjon === playerToFind.posisjon ? (
                                <p className="correct">{guess.posisjon}</p>
                            ) : (
                                <p style={{ color: "red" }}>{guess.posisjon}</p>
                            )}
                        </Box>
                    </div>
                ))}
              </div>

            {correctPlayer && 
            <div>
                {level > 1 && <button onClick={() => changeLevel(level - 1)}>Previous level</button>}
                {level < 4 && <button onClick={() => changeLevel(level + 1)}>Next level</button>}
            </div>
            }

            {guessCount > 4 && !correctPlayer && 
            <div>
                {level > 1 && <button onClick={() => changeLevel(level - 1)}>Previous level</button>}
                {level < 4 && <button onClick={() => changeLevel(level + 1)}>Next level</button>}
            </div>
            }
            
            </div>
          );
          


    }
