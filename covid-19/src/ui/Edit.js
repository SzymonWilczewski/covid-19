import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  countryEditSelector,
  getCountryEdit,
  putCountryEdit,
} from "../state/ducks/edit";
import { useLocation, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";

const Edit = ({ country, getCountryEdit, putCountryEdit }) => {
  const { pathname } = useLocation();
  const history = useHistory();

  useEffect(() => getCountryEdit(pathname.slice(-7, -5)), [
    getCountryEdit,
    pathname,
  ]);

  return (
    <div style={{ textAlign: "center" }}>
      <Formik
        initialValues={{
          name: country?.name,
          code: country?.code,
          population: country?.population,
          updated_at: country?.updated_at?.slice(0, 10),
          today: {
            deaths: country?.today?.deaths,
            confirmed: country?.today?.confirmed,
          },
          latest_data: {
            deaths: country?.latest_data?.deaths,
            confirmed: country?.latest_data?.confirmed,
            recovered: country?.latest_data?.recovered,
            critical: country?.latest_data?.critical,
            calculated: {
              cases_per_million_population:
                country?.latest_data?.calculated?.cases_per_million_population,
            },
          },
        }}
        enableReinitialize={true}
        validateOnMount={true}
        validate={(values) => {
          const errors = {};
          if (values.name.length < 3) {
            errors.name = "Name is too short!";
          } else if (values.name.length > 50) {
            errors.name = "Name is too long!";
          } else if (values.population === "") {
            errors.population = "Required!";
          } else if (isNaN(values.population)) {
            errors.population = "Integer required!";
          } else if (
            values.updated_at > new Date().toISOString().slice(0, 10)
          ) {
            errors.updated_at = "Updated at cannot be a future date!";
          } else if (values.today.deaths === "") {
            errors.today_deaths = "Required!";
          } else if (isNaN(values.today.deaths)) {
            errors.today_deaths = "Integer required!";
          } else if (values.today.confirmed === "") {
            errors.today_confirmed = "Required!";
          } else if (isNaN(values.today.confirmed)) {
            errors.today_confirmed = "Integer required!";
          } else if (values.latest_data.deaths === "") {
            errors.latest_data_deaths = "Required!";
          } else if (isNaN(values.latest_data.deaths)) {
            errors.latest_data_deaths = "Integer required!";
          } else if (values.latest_data.confirmed === "") {
            errors.latest_data_confirmed = "Required!";
          } else if (isNaN(values.latest_data.confirmed)) {
            errors.latest_data_confirmed = "Integer required!";
          } else if (values.latest_data.recovered === "") {
            errors.latest_data_recovered = "Required!";
          } else if (isNaN(values.latest_data.recovered)) {
            errors.latest_data_recovered = "Integer required!";
          } else if (values.latest_data.critical === "") {
            errors.latest_data_critical = "Required!";
          } else if (isNaN(values.latest_data.critical)) {
            errors.latest_data_critical = "Integer required!";
          } else if (
            values.latest_data.calculated.cases_per_million_population === ""
          ) {
            errors.latest_data_calculated_cases_per_million_population =
              "Required!";
          } else if (
            isNaN(values.latest_data.calculated.cases_per_million_population)
          ) {
            errors.latest_data_calculated_cases_per_million_population =
              "Integer required!";
          }
          return errors;
        }}
        onSubmit={(values, { resetForm }) => {
          putCountryEdit(values);
          resetForm();
          history.push(`/countries/${country.code}`);
        }}
      >
        {({ values, errors, handleChange }) => (
          <Form>
            <br />
            <InputLabel>Name:</InputLabel>
            <TextField
              placeholder="Name"
              name="name"
              onChange={handleChange}
              value={values?.name}
            />
            <div>{errors?.name}</div>
            <br />
            <InputLabel>Population:</InputLabel>
            <TextField
              placeholder="Population"
              name="population"
              onChange={handleChange}
              value={values?.population}
            />
            <div>{errors?.population}</div>
            <br />
            <InputLabel>Updated at:</InputLabel>
            <TextField
              type="date"
              name="updated_at"
              onChange={handleChange}
              value={values?.updated_at}
            />
            <div>{errors?.updated_at}</div>
            <br />
            <InputLabel>Today deaths:</InputLabel>
            <TextField
              placeholder="Today deaths"
              name="today.deaths"
              onChange={handleChange}
              value={values?.today?.deaths}
            />
            <div>{errors?.today_deaths}</div>
            <br />
            <InputLabel>Today confirmed:</InputLabel>
            <TextField
              placeholder="Today confirmed"
              name="today.confirmed"
              onChange={handleChange}
              value={values?.today?.confirmed}
            />
            <div>{errors?.today_confirmed}</div>
            <br />
            <InputLabel>Total deaths:</InputLabel>
            <TextField
              placeholder="Total deaths"
              name="latest_data.deaths"
              onChange={handleChange}
              value={values?.latest_data?.deaths}
            />
            <div>{errors?.latest_data_deaths}</div>
            <br />
            <InputLabel>Total cases:</InputLabel>
            <TextField
              placeholder="Total cases"
              name="latest_data.confirmed"
              onChange={handleChange}
              value={values?.latest_data?.confirmed}
            />
            <div>{errors?.latest_data_confirmed}</div>
            <br />
            <InputLabel>Total recovered:</InputLabel>
            <TextField
              placeholder="Total recovered"
              name="latest_data.recovered"
              onChange={handleChange}
              value={values?.latest_data?.recovered}
            />
            <div>{errors?.latest_data_recovered}</div>
            <br />
            <InputLabel>Total critical:</InputLabel>
            <TextField
              placeholder="Total critical"
              name="latest_data.critical"
              onChange={handleChange}
              value={values?.latest_data?.critical}
            />
            <div>{errors?.latest_data_critical}</div>
            <br />
            <InputLabel>Cases per million people:</InputLabel>
            <TextField
              placeholder="Cases per million people"
              name="latest_data.calculated.cases_per_million_population"
              onChange={handleChange}
              value={
                values?.latest_data?.calculated?.cases_per_million_population
              }
            />
            <div>
              {errors?.latest_data_calculated_cases_per_million_population}
            </div>
            <br />
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    country: countryEditSelector(state),
  };
};

const mapDispatchToProps = {
  getCountryEdit,
  putCountryEdit,
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
