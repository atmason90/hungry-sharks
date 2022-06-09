import React from 'react'

const ViewCardModal = ({setCardViewP1On, card, playtheCard}) => {

    const closeModal = () => {
        setCardViewP1On(false);
      };

  return (
    <div className="   bg-[#030917] opacity-95 fixed inset-0 z-50   ">
      <div className="flex h-screen justify-center items-center ">
        <div className="flex-col justify-center  bg-[#030917] py-12 px-24 border-4 border-orange-700 rounded-xl ">
          <div className="flex  text-xl  text-white justify-center mb-10">
            <h1>You are about to play this card... <h1 className="text-orange-600">Click Play to proceed </h1></h1>
          </div>
          <div className="flex flec-col modalDiv">
            <img src={require(`../assets/${card}.png`)} alt={`${card}`}></img>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={closeModal}
              className="rounded px-4 py-2 ml-4 btn-wide text-white bg-black border-orange-700 border-2"
            >
              Back
            </button>
            <button
              onClick={playtheCard}
              className="rounded px-4 py-2 ml-4 btn-wide text-white bg-black border-orange-700 border-2"
            >
              Play!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewCardModal