import React from "react";

const NewRules = () => {
  return (
    <>
      <div className="w-full h-screen">
        <div className="hero min-h-screen bg-[#020b12]">
          <div className="hero-content flex-col lg:flex-row">
            <img
              src={require(`../assets/back.png`)}
              className="max-w-sm rounded-lg shadow-2xl"
              alt="Hungry Shark Card"
            />
            <div>
              <h1 className="text-5xl font-bold text-orange-700">
                HUNGRY SHARKS
              </h1>
              <p className="py-6 text-2xl">
                You don't have to swim faster than the Shark! Just faster than
                the person you're with...
              </p>
              <p className="py-6 text-xl">In the deck of cards there are some Hungry Sharks. You play the game by taking turns drawing cards until a player draws a Hungry Shark. When that happens, the player is eaten by the Hungry Shark and they lose!</p>
              <p className="py-6 text-xl">All of the other cards in the deck will give you powerful tools to help avoid being eaten.</p>
              <p className="py-6 text-xl">Each player starts with one Sacrificial Goat card + 7 other random cards. The Hungry Shark cards are hiding somewhere in the remaining deck of cards.</p>
              <p className="py-6 text-xl">When it is your turn, you can play a card from your hand or pass. Play as many or as few cards as you'd like. Your turn ends by you drawing a card from the deck and hoping it is not a Hungry Shark.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end items-end mb-10 mr-20">
        <h1 className="text-5xl font-bold text-orange-700">ACTION CARDS</h1>
      </div>

      {/* Put the two inner divs in the same column*/}
      <div className="flex flex-col justify-center items-center">
        {/*  */}
        <div className="flex flex-row justify-center items-center mb-10">
          <div className="card card-side bg-[#670c0c] shadow-xl w-[600px] mx-5">
            <div className="card-body flex flex-col justify-center items-center">
              <h2 className="card-title text-orange-600 text-3xl">Hungry Shark</h2>
              <h2>
                Draw this card and it is Game Over! You Lose! (Unless you have a
                Goat to sacrifice, of course)
              </h2>
            </div>
            <figure>
              <img
                src={require(`../assets/HS.png`)}
                alt="Hungry Shark Card"
                style={{ width: "200px" }}
              />
            </figure>
          </div>

          <div className="card card-side bg-[#670c0c] shadow-xl w-[600px] mx-5">
            <figure>
              <img
                src={require(`../assets/SG.png`)}
                alt="Movie"
                style={{ width: "200px" }}
              />
            </figure>
            <div className="card-body flex flex-col justify-center items-center">
              <h2 className="card-title text-orange-600 text-3xl">
                Sacrificial Goat
              </h2>
              <h2>
                Play this card when you draw a Hungry Shark to avoid being
                eaten.{" "}
              </h2>
              <h1>If you have one, it will be automatically played for you.</h1>
            </div>
          </div>
        </div>
        {/*  */}

        {/*  */}
        <div className="flex flex-row justify-center items-center mb-10">
          <div className="card card-side bg-[#670c0c] shadow-xl w-[600px] mx-5">
            <div className="card-body flex flex-col justify-center items-center">
              <h2 className="card-title text-orange-600 text-3xl">
                Communist Regime
              </h2>
              <h2>
                Play this card to get one Random Card from your opponent's hand
              </h2>
            </div>
            <figure>
              <img
                src={require(`../assets/CR.png`)}
                alt="Hungry Shark Card"
                style={{ width: "200px" }}
              />
            </figure>
          </div>

          <div className="card card-side bg-[#670c0c] shadow-xl w-[600px] mx-5">
            <figure>
              <img
                src={require(`../assets/SH.png`)}
                alt="Movie"
                style={{ width: "200px" }}
              />
            </figure>
            <div className="card-body flex flex-col justify-center items-center">
              <h2 className="card-title text-orange-600 text-3xl">Shuffler</h2>
              <h2>
                Play this card to shuffle the deck if you feel like you have
                intel of a Hungry Shark coming up
              </h2>
            </div>
          </div>
        </div>
        {/*  */}

        {/*  */}
        <div className="flex flex-row justify-center items-center mb-10">
          <div className="card card-side bg-[#670c0c] shadow-xl w-[600px] mx-5">
            <div className="card-body flex flex-col justify-center items-center">
              <h2 className="card-title text-orange-600 text-3xl">Snooze</h2>
              <h2>Skip one turn to potentially avoid drawing a Hungry Shark</h2>
            </div>
            <figure>
              <img
                src={require(`../assets/SN.png`)}
                alt="Hungry Shark Card"
                style={{ width: "200px" }}
              />
            </figure>
          </div>

          <div className="card card-side bg-[#670c0c] shadow-xl w-[600px] mx-5">
            <figure>
              <img
                src={require(`../assets/DR.png`)}
                alt="Movie"
                style={{ width: "200px" }}
              />
            </figure>
            <div className="card-body flex flex-col justify-center items-center">
              <h2 className="card-title text-orange-600 text-3xl">
                Divine Revelation
              </h2>
              <h2>
                Take a peek at the top three cards from the draw pile. Plan out
                your moves accordingly
              </h2>
            </div>
          </div>
        </div>
        {/*  */}

        {/*  */}
        <div className="flex flex-row justify-center items-center mb-10">
          <div className="card card-side bg-[#670c0c] shadow-xl w-[600px] mx-5">
            <div className="card-body flex flex-col justify-center items-center">
              <h2 className="card-title text-orange-600 text-3xl">White Crayon</h2>
              <h2>
                You can not play this card because it is just as useless as a
                white crayon. But hey, at least it is not a Hungry Shark!
              </h2>
            </div>
            <figure>
              <img
                src={require(`../assets/WC.png`)}
                alt="Hungry Shark Card"
                style={{ width: "200px" }}
              />
            </figure>
          </div>

          <div className="card card-side bg-[#670c0c] shadow-xl w-[600px] mx-5">
            <figure>
              <img
                src={require(`../assets/DT.png`)}
                alt="Movie"
                style={{ width: "200px" }}
              />
            </figure>
            <div className="card-body flex flex-col justify-center items-center">
              <h2 className="card-title text-orange-600 text-3xl">
                Double Trouble
              </h2>
              <h2>
                Play this card to end your turn without having to draw a card.
                The opposing player will then have to take two turns instead
              </h2>
              <h2>
                If you have two turns remaining and you play this card, it will
                reduce your turns to zero
              </h2>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </>
  );
};

export default NewRules;
