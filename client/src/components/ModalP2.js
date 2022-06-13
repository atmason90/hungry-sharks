import React from "react";

const ModalP2 = ({ setModalOn, card1, card2, card3 }) => {
  const handleCloseModal = () => {
    setModalOn(false);
  };

  return (
    <div className="   bg-[#030917] opacity-95 fixed inset-0 z-50   ">
      <div className="flex h-screen justify-center items-center ">
        <div className="flex-col justify-center  bg-[#030917] py-12 px-24 border-4 border-orange-700 rounded-xl ">
          <div className="flex  text-xl  text-white justify-center mb-10">
            <h1>
              The Gods have blessed you with some intel!{" "}
              <h1 className="text-orange-600">The Next 3 Cards are: </h1>
            </h1>
          </div>
          <div className="flex modalDiv">
            <img src={require(`../assets/${card1}.png`)} alt={`${card1}`}></img>
            <img
              src={
                card2
                  ? require(`../assets/${card2}.png`)
                  : require(`../assets/back.png`)
              }
              alt={`${card2}`}
            ></img>
            <img
              src={
                card3
                  ? require(`../assets/${card3}.png`)
                  : require(`../assets/back.png`)
              }
              alt={`${card3}`}
            ></img>
          </div>
          <div className="flex justify-center mt-6">
            <button
              onClick={handleCloseModal}
              className="rounded px-4 py-2 ml-4 btn-wide text-white bg-black border-orange-700 border-2"
            >
              Intel Received!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalP2;
