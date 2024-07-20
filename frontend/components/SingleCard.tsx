//@ts-ignore
export default function SingleCard({card, handleChoice, flipped, disabled}) {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
    }
    return (
        //@ts-ignore
        <div className='card relative'>
            <div className={flipped ? "flipped" : ""}>
                <img 
                    className="front rounded-lg block w-full" 
                    alt='front of card'
                    //@ts-ignore 
                    src={card.src}
                />

                <img 
                    className="back rounded-lg block w-full" 
                    alt='back of card' 
                    src='cover.png'
                    onClick = {handleClick}
                />
            </div>
      </div>
    )
}