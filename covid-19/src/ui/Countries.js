import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  countriesSelector,
  getCountries,
  deleteCountry,
} from "../state/ducks/countries";
import { Link } from "react-router-dom";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import LaunchIcon from "@material-ui/icons/Launch";
import DeleteIcon from "@material-ui/icons/Delete";
import ArrowUpwardRounded from "@material-ui/icons/ArrowUpwardRounded";
import ArrowDownwardRounded from "@material-ui/icons/ArrowDownwardRounded";

const Countries = ({ countries, getCountries, deleteCountry }) => {
  useEffect(() => getCountries(), [getCountries]);

  const [filter, setFilter] = useState({
    country: "",
    cases: "",
    deaths: "",
    recovered: "",
  });

  const [sort, setSort] = useState({
    country: "",
    cases: "",
    deaths: "",
    recovered: "",
  });

  const [filteredSortedCountries, setFilteredSortedCountries] = useState([]);
  const [countriesToRender, setCountriesToRender] = useState([]);
  const [countriesCount, setCountriesCount] = useState(
    Math.ceil(window.innerHeight / 81)
  );

  useEffect(() => {
    let tempCountries = [...countries];

    if (filter.country !== "") {
      tempCountries = tempCountries.filter((country) =>
        country.name.toLowerCase().includes(filter.country.toLowerCase())
      );
    }
    if (filter.cases !== "") {
      tempCountries = tempCountries.filter((country) =>
        country.latest_data.confirmed.toString().includes(filter.cases)
      );
    }
    if (filter.deaths !== "") {
      tempCountries = tempCountries.filter((country) =>
        country.latest_data.deaths.toString().includes(filter.deaths)
      );
    }
    if (filter.recovered !== "") {
      tempCountries = tempCountries.filter((country) =>
        country.latest_data.recovered.toString().includes(filter.recovered)
      );
    }

    if (sort.country === "asc") {
      tempCountries.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort.country === "desc") {
      tempCountries.sort((a, b) => b.name.localeCompare(a.name));
    }
    if (sort.cases === "asc") {
      tempCountries.sort(
        (a, b) => a.latest_data.confirmed - b.latest_data.confirmed
      );
    } else if (sort.cases === "desc") {
      tempCountries.sort(
        (a, b) => b.latest_data.confirmed - a.latest_data.confirmed
      );
    }
    if (sort.deaths === "asc") {
      tempCountries.sort((a, b) => a.latest_data.deaths - b.latest_data.deaths);
    } else if (sort.deaths === "desc") {
      tempCountries.sort((a, b) => b.latest_data.deaths - a.latest_data.deaths);
    }
    if (sort.recovered === "asc") {
      tempCountries.sort(
        (a, b) => a.latest_data.recovered - b.latest_data.recovered
      );
    } else if (sort.recovered === "desc") {
      tempCountries.sort(
        (a, b) => b.latest_data.recovered - a.latest_data.recovered
      );
    }

    setCountriesCount(Math.ceil(window.innerHeight / 81));
    setFilteredSortedCountries(tempCountries);
  }, [filter, sort, countries]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = (e) => {
    const bottom =
      e.target.scrollingElement.scrollHeight -
      e.target.scrollingElement.scrollTop -
      e.target.scrollingElement.clientHeight;
    if (bottom < 1000) {
      setCountriesCount((countriesCount) => countriesCount + 10);
    }
  };

  useEffect(() => {
    setCountriesToRender(filteredSortedCountries.slice(0, countriesCount));
  }, [filteredSortedCountries, countriesCount]);

  return (
    <div onScroll={handleScroll}>
      <h1 style={{ textAlign: "center" }}>Countries</h1>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "medium",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  switch (sort.country) {
                    case "asc":
                      return setSort({ ...sort, country: "desc" });
                    case "desc":
                      return setSort({ ...sort, country: "" });
                    default:
                      return setSort({ ...sort, country: "asc" });
                  }
                }}
              >
                Country
                {(sort.country === "asc" && <ArrowUpwardRounded />) ||
                  (sort.country === "desc" && <ArrowDownwardRounded />)}
              </div>
            </TableCell>
            <TableCell>
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "medium",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  switch (sort.cases) {
                    case "asc":
                      return setSort({ ...sort, cases: "desc" });
                    case "desc":
                      return setSort({ ...sort, cases: "" });
                    default:
                      return setSort({ ...sort, cases: "asc" });
                  }
                }}
              >
                Total Cases
                {(sort.cases === "asc" && <ArrowUpwardRounded />) ||
                  (sort.cases === "desc" && <ArrowDownwardRounded />)}
              </div>
            </TableCell>
            <TableCell>
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "medium",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  switch (sort.deaths) {
                    case "asc":
                      return setSort({ ...sort, deaths: "desc" });
                    case "desc":
                      return setSort({ ...sort, deaths: "" });
                    default:
                      return setSort({ ...sort, deaths: "asc" });
                  }
                }}
              >
                Total Deaths
                {(sort.deaths === "asc" && <ArrowUpwardRounded />) ||
                  (sort.deaths === "desc" && <ArrowDownwardRounded />)}
              </div>
            </TableCell>
            <TableCell>
              <div
                style={{
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  fontSize: "medium",
                  fontWeight: "bold",
                }}
                onClick={() => {
                  switch (sort.recovered) {
                    case "asc":
                      return setSort({ ...sort, recovered: "desc" });
                    case "desc":
                      return setSort({ ...sort, recovered: "" });
                    default:
                      return setSort({ ...sort, recovered: "asc" });
                  }
                }}
              >
                Total Recovered
                {(sort.recovered === "asc" && <ArrowUpwardRounded />) ||
                  (sort.recovered === "desc" && <ArrowDownwardRounded />)}
              </div>
            </TableCell>
            <TableCell>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  fontSize: "medium",
                  fontWeight: "bold",
                }}
              >
                Options
              </div>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow key="filter">
            <TableCell>
              <input
                type="text"
                placeholder="Filter country"
                value={filter.country}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    country: e.target.value,
                  })
                }
              ></input>
            </TableCell>
            <TableCell>
              <input
                type="text"
                placeholder="Filter cases"
                value={filter.cases}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    cases: e.target.value,
                  })
                }
              ></input>
            </TableCell>
            <TableCell>
              <input
                type="text"
                placeholder="Filter deaths"
                value={filter.deaths}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    deaths: e.target.value,
                  })
                }
              ></input>
            </TableCell>
            <TableCell>
              <input
                type="text"
                placeholder="Filter recovered"
                value={filter.recovered}
                onChange={(e) =>
                  setFilter({
                    ...filter,
                    recovered: e.target.value,
                  })
                }
              ></input>
            </TableCell>
            <TableCell></TableCell>
          </TableRow>
          {countriesToRender &&
            countriesToRender.map((country) => (
              <TableRow key={country.code} hover={true}>
                <TableCell>{country.name}</TableCell>
                <TableCell>{country.latest_data.confirmed}</TableCell>
                <TableCell>{country.latest_data.deaths}</TableCell>
                <TableCell>{country.latest_data.recovered}</TableCell>
                <TableCell>
                  <Link to={`/countries/${country.code}`}>
                    <IconButton>
                      <LaunchIcon />
                    </IconButton>
                  </Link>
                  <IconButton
                    onClick={() =>
                      window.confirm(
                        `Are you sure you want to delete ${country.name}?`
                      ) && deleteCountry(country)
                    }
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    countries: countriesSelector(state),
  };
};

const mapDispatchToProps = {
  getCountries,
  deleteCountry,
};

export default connect(mapStateToProps, mapDispatchToProps)(Countries);
