import React, { useEffect, useState } from "react";

/**
 * Don't touch these imports!
 */
import {
  fetchAllCenturies,
  fetchAllClassifications,
  fetchQueryResults,
} from "../api";

const Search = (props) => {
  // Make sure to destructure setIsLoading and setSearchResults from the props

  /**
   * We are at the Search component, a child of app. This has a form, so we need to use useState for
   * our controlled inputs:
   *
   * centuryList, setCenturyList (default should be an empty array, [])
   * classificationList, setClassificationList (default should be an empty array, [])
   * queryString, setQueryString (default should be an empty string, '')
   * century, setCentury (default should be the string 'any')
   * classification, setClassification (default should be the string 'any')
   */
  const [centuryList, setCenturyList] = useState([]);
  const [classificationList, setClassificationList] = useState([]);
  const [queryString, setQueryString] = useState("");
  const [century, setCentury] = useState("any");
  const [classification, setClassification] = useState("any");
  /**
   * Inside of useEffect, use Promise.all([]) with fetchAllCenturies and fetchAllClassifications
   *
   * In the .then() callback pass the returned lists to setCenturyList and setClassificationList
   *
   * Make sure to console.error on caught errors from the API methods.
   */
  useEffect(() => {
    try {
      Promise.all([fetchAllCenturies(), fetchAllClassifications()]).then(
        (result) => {
          setCenturyList(result[0]);
          setClassificationList(result[1]);
        }
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  /**
   * This is a form element, so we need to bind an onSubmit handler to it which:
   *
   * calls event.preventDefault()
   * calls setIsLoading, set it to true
   *
   * then, in a try/catch/finally block:
   *
   * try to:
   * - get the results from fetchQueryResults({ century, classification, queryString })
   * - pass them to setSearchResults
   *
   * catch: error to console.error
   *
   * finally: call setIsLoading, set it to false
   */

  return (
    <form
      id="search"
      onSubmit={async (event) => {
        // write code here -- Done
        event.preventDefault();
        props.setIsLoading(true);
        try {
          let results = await fetchQueryResults({
            century,
            classification,
            queryString,
          });
          props.setSearchResults(results);
        } catch (error) {
          console.log(error);
        } finally {
          props.setIsLoading(false);
        }
      }}
    >
      <fieldset>
        <label htmlFor="keywords">Query</label>
        <input
          id="keywords"
          type="text"
          placeholder="enter keywords..."
          // TODO UN-comment and fill in the correct value:
          value={queryString}
          // TODO UN-comment and fill in the correct onChange function
          onChange={(e) => setQueryString(e.target.value)}
        />
      </fieldset>
      <fieldset>
        <label htmlFor="select-classification">
          Classification{" "}
          <span className="classification-count">
            ({classificationList.length})
          </span>
        </label>
        <select
          name="classification"
          id="select-classification"
          // TODO UN-comment the value property, and pass it the correct value
          value={classification}
          // TODO UN-comment and fill in the correct onChange function
          onChange={(e) => setClassification(e.target.value)}
        >
          <option value="any">Any</option>
          {
            /* map over the classificationList, return an <option /> */
            classificationList.map((entry) => {
              return <option key={`key=${entry.id}`}>{entry.name}</option>;
            })
          }
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor="select-century">
          Century <span className="century-count">({centuryList.length})</span>
        </label>
        <select
          name="century"
          id="select-century"
          // TODO UN-comment the value property, and pass it the correct value
          value={century}
          // TODO UN-comment and fill in the correct onChange function
          onChange={(e) => setCentury(e.target.value)}
        >
          <option value="any">Any</option>
          {
            /* map over the centuryList, return an <option /> */
            centuryList.map((entry) => {
              return <option key={`key=${entry.id}`}>{entry.name}</option>;
            })
          }
        </select>
      </fieldset>
      <button>SEARCH</button>
    </form>
  );
};

export default Search;
