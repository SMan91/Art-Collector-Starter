import React, { Fragment } from "react";

// Don't touch this import
import { fetchQueryResultsFromTermAndValue } from "../api";

/**
 * We need a new component called Searchable which:
 *
 * Has a template like this:
 *
 * <span className="content">
 *  <a href="#" onClick={async (event) => {}}>SOME SEARCH TERM</a>
 * </span>
 *
 * You'll need to read searchTerm, searchValue, setIsLoading, and setSearchResults off of the props.
 *
 * When someone clicks the anchor tag, you should:
 *
 * - preventDefault on the event
 * - call setIsLoading, set it to true
 *
 * Then start a try/catch/finally block:
 *
 * try:
 *  - await the result of fetchQueryResultsFromTermAndValue, passing in searchTerm and searchValue
 *  - send the result to setSearchResults (which will update the Preview component)
 * catch:
 *  - console.error the error
 * finally:
 *  - call setIsLoading, set it to false
 */
const Searchable = (props) => {
  const searchTerm = props.searchTerm;
  const searchValue = props.searchValue;
  const setIsLoading = props.setIsLoading;
  const setSearchResults = props.setSearchResults;
  console.log("Props in Searchable ", props);

  // console.log("Search Term: ", searchTerm);

  return (
    <span className="content">
      {" "}
      <a
        href="#"
        onClick={async (event) => {
          event.preventDefault();
          setIsLoading(true);
          console.log("Search Term: ", searchTerm);
          console.log("Search Value: ", searchValue);
          try {
            let result = await fetchQueryResultsFromTermAndValue(
              searchTerm,
              searchValue
            );
            setSearchResults(result);
          } catch (error) {
            console.log(error);
          } finally {
            setIsLoading(false);
          }
        }}
      >
        Search Term: {searchTerm}
      </a>{" "}
    </span>
  );
};

/**
 * We need a new component called Feature which looks like this when no featuredResult is passed in as a prop:
 *
 * <main id="feature"></main>
 *
 * And like this when one is:
 *
 * <main id="feature">
 *   <div className="object-feature">
 *     <header>
 *       <h3>OBJECT TITLE</h3>
 *       <h4>WHEN IT IS DATED</h4>
 *     </header>
 *     <section className="facts">
 *       <span className="title">FACT NAME</span>
 *       <span className="content">FACT VALUE</span>
 *       <span className="title">NEXT FACT NAME</span>
 *       <span className="content">NEXT FACT VALUE</span>
 *     </section>
 *     <section className="photos">
 *       <img src=IMAGE_URL alt=SOMETHING_WORTHWHILE />
 *     </section>
 *   </div>
 * </main>
 *
 * The different facts look like this: title, dated, images, primaryimageurl, description, culture, style,
 * technique, medium, dimensions, people, department, division, contact, creditline
 *
 * The <Searchable /> ones are: culture, technique, medium (first toLowerCase it), and person.displayname (one for each PEOPLE)
 *
 * NOTE: people and images are likely to be arrays, and will need to be mapped over if they exist
 *
 * This component should be exported as default.
 */
const Feature = (props) => {
  const featuredResult = props.featuredResult;
  const setIsLoading = props.setIsLoading;
  const setSearchResults = props.setSearchResults;
  console.log("Featured result: ", props.featuredResult);

  let result = <></>;

  if (props.featuredResult === null) {
    result = <main id="feature"></main>;
  } else {
    // console.log("images: ", featuredResult.images);
    // console.log("People: ", featuredResult.people);
    result = (
      <main id="feature">
        <div className="object-feature">
          <header>
            <h3>{featuredResult.title}</h3>
            <h4>{featuredResult.dated}</h4>
          </header>
          <section className="facts">
            {featuredResult?.description ? (
              <span className="title">
                Description: {featuredResult.description}
              </span>
            ) : null}

            {featuredResult?.style ? (
              <span className="style">Style: {featuredResult.style}</span>
            ) : null}

            {featuredResult?.dimensions ? (
              <span className="dimension">
                Dimensions: {featuredResult.dimensions}
              </span>
            ) : null}

            {featuredResult?.department ? (
              <span className="department">
                Department: {featuredResult.department}
              </span>
            ) : null}

            <span className="culture">
              <Searchable
                searchTerm={"culture"}
                searchValue={featuredResult.culture}
                setIsLoading={setIsLoading}
                setSearchResults={setSearchResults}
              />
            </span>
          </section>
          <section className="photos">
            <img
              src={featuredResult.primaryimageurl}
              alt={featuredResult.description}
            />
          </section>
        </div>
      </main>
    );
  }

  return result;
};

export default Feature;
