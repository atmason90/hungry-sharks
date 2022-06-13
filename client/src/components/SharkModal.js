import React from 'react'

const SharkModal = ({setModalOn}) => {
    const handleCloseModal = () => {
        setModalOn(false);
    }
  return (
    <div className="   bg-[#170303] opacity-95 fixed inset-0 z-50   ">
      <div className="flex h-screen justify-center items-center ">
        <div className="flex-col justify-center  bg-[#030917] py-12 px-24 border-4 border-orange-700 rounded-xl ">
          <div className="flex  text-xl  text-white justify-center mb-10">
            <h1>
              A Hungry Shark Card was Drawn.
              <h1 className="text-orange-600">If the player has a Sacrificial Goat, it will be played.</h1>
            </h1>
          </div>
          <div className="flex modalDiv">
            <img src={require(`../assets/HS.png`)} alt="Hungry Shark"></img>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={handleCloseModal}
              className="rounded px-4 py-2 ml-4 btn-wide text-white bg-black border-orange-700 border-2"
            >
              Oh no!
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SharkModal