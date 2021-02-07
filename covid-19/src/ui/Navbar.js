import logo from "./images/coronavirus.png";

const navStyle = {
  backgroundColor: "#333",
  overflow: "hidden",
};

const titleStyle = {
  float: "left",
  color: "#f2f2f2",
  textAlign: "center",
  padding: "14px 0px 14px 16px",
  textDecoration: "none",
  fontSize: "17px",
  fontFamily: "Arial",
  fontWeight: "bold",
};

const logoStyle = {
  float: "left",
  padding: "8px",
};

const buttonStyle = {
  float: "right",
  color: "#f2f2f2",
  textAlign: "center",
  padding: "14px 16px",
  textDecoration: "none",
  fontSize: "17px",
  fontFamily: "Arial",
  fontWeight: "bold",
};

const Navbar = () => (
  <div style={navStyle}>
    <a href="/" style={titleStyle}>
      COVID-19
    </a>
    <a href="/">
      <img src={logo} alt="Logo" style={logoStyle} />
    </a>
    <a href="/countries/add" style={buttonStyle}>
      ADD COUNTRY
    </a>
    <a href="/countries" style={buttonStyle}>
      COUNTRIES
    </a>
  </div>
);

export default Navbar;
