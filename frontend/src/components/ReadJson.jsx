import players from "../json/players.json"

export default function ReadJson() {


    return (
        <>
            {players && players.map(({draktnr, navn}) => (
                <div key={draktnr}>
                    {navn}
                </div>
            ))}
        </>
    )
}