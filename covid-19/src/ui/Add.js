import React from "react";
import { connect } from "react-redux";
import { postCountryAdd, postCommentAdd } from "../state/ducks/add";
import { useHistory } from "react-router-dom";
import { Formik, Form, FieldArray, Field } from "formik";
import { v4 as uuidv4 } from "uuid";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import TextField from "@material-ui/core/TextField";

const Add = ({ postCountryAdd, postCommentAdd }) => {
  const history = useHistory();

  return (
    <div style={{ textAlign: "center" }}>
      <Formik
        initialValues={{
          name: "",
          code: "",
          population: 0,
          updated_at: new Date().toISOString().slice(0, 10),
          today: {
            deaths: 0,
            confirmed: 0,
          },
          latest_data: {
            deaths: 0,
            confirmed: 0,
            recovered: 0,
            critical: 0,
            calculated: {
              cases_per_million_population: 0,
            },
          },
          comments: [""],
        }}
        enableReinitialize={true}
        validateOnMount={true}
        validate={(values) => {
          const errors = {};
          if (values.name.length < 3) {
            errors.name = "Name is too short!";
          } else if (values.name.length > 50) {
            errors.name = "Name is too long!";
          } else if (values.code === "") {
            errors.code = "Required!";
          } else if (values.code.length !== 2) {
            errors.code = "Code must be two letters long!";
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
          values.comments.forEach((comment, index) => {
            if (comment === "") {
              errors[`comments.${index}`] = "Required!";
            }
          });
          return errors;
        }}
        onSubmit={(values, { setErrors, resetForm }) => {
          postCountryAdd(
            {
              name: values.name,
              code: values.code.toUpperCase(),
              population: values.population,
              updated_at: values.updated_at,
              today: {
                deaths: values.today.deaths,
                confirmed: values.today.confirmed,
              },
              latest_data: {
                deaths: values.latest_data.deaths,
                confirmed: values.latest_data.confirmed,
                recovered: values.latest_data.recovered,
                critical: values.latest_data.critical,
                calculated: {
                  cases_per_million_population:
                    values.latest_data.calculated.cases_per_million_population,
                },
              },
            },
            setErrors
          ).then((res) => {
            if (!res.error) {
              values.comments.map((comment) =>
                postCommentAdd({
                  id: uuidv4(),
                  code: values.code.toUpperCase(),
                  body: comment,
                })
              );
              resetForm();
              history.push("/countries");
            }
          });
        }}
      >
        {({ values, errors, touched, handleChange, handleBlur }) => (
          <Form>
            <br />
            <InputLabel>Name:</InputLabel>
            <TextField
              placeholder="Name"
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values?.name}
            />
            <div>{touched.name && errors.name}</div>
            <br />
            <InputLabel>Code:</InputLabel>
            <TextField
              placeholder="Code"
              name="code"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values?.code}
            />
            <div>{touched.code && errors.code}</div>
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
            <FieldArray name="comments">
              {({ remove, push }) => (
                <div>
                  {values.comments.length > 0 &&
                    values.comments.map((comment, index) => (
                      <div key={index}>
                        <div>
                          <Field
                            name={`comments.${index}`}
                            placeholder="Comment"
                            type="text"
                            onBlur={handleBlur}
                          />
                          <Button type="button" onClick={() => remove(index)}>
                            Delete
                          </Button>
                        </div>
                        <div>
                          {touched.comments &&
                            touched.comments[index] &&
                            errors[`comments.${index}`]}
                        </div>
                      </div>
                    ))}
                  <Button type="button" onClick={() => push("")}>
                    Add comment
                  </Button>
                </div>
              )}
            </FieldArray>
            <br />
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

const mapDispatchToProps = {
  postCountryAdd,
  postCommentAdd,
};

export default connect(null, mapDispatchToProps)(Add);
