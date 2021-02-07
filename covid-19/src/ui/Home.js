import background from "./images/background.jpg";

const Home = () => (
  <div
    style={{
      backgroundImage: `url(${background})`,
      height: "100vh",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }}
  >
    <div
      style={{
        fontSize: "50px",
        fontWeight: "bold",
        fontFamily: "Arial",
        textAlign: "center",
        position: "relative",
        top: "50%",
        transform: "translate(0, -50%)",
      }}
    >
      CORONAVIRUS PANDEMIC
    </div>
  </div>
);

export default Home;
