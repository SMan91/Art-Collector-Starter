import React, { useState } from "react";
import ReactDOM from "react-dom";

import Title from "./components/Title.js";
import Search from "./components/Search.js";
import Preview from "./components/Preview.js";
import Feature from "./components/Feature.js";
import Loading from "./components/Loading.js";

// These imports won't work until you fix ./components/index.js
// import { Feature, Loading, Preview, Search, Title } from "./components";

const App = () => {
  /**
   * This App component is our TOP LEVEL component. Any state which needs to be shared between immediate children should
   * be made here, so create state pairs using the useState() hook for the following:
   *
   * searchResults, setSearchResults (default should be this object:  {info: {}, records: []} )
   * featuredResult, setFeaturedResult (default should be null)
   * isLoading, setIsLoading (default should be false)
   */
  const [searchResults, setSearchResults] = useState({ info: {}, records: [] });
  const [featuredResult, setFeaturedResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // * FOR THE FOLLOWING CODE, COMMENT YOUR COMPONENTS IN, AS YOU WORK ON THEM TO AVOID ERRORS BREAKING YOUR CODE!
  return (
    <div className="app">
      {/* The following Title component is static, doesn't need any props */}
      <Title />
      {/* The following Search component needs props for setIsLoading and setSearchResults (trigger <Loading /> on search start/end, and transfer results to preview) */}
      <Search setIsLoading={setIsLoading} setSearchResults={setSearchResults} />
      {/* The following Preview component needs props for searchResults, setIsLoading and setSearchResults (clicking prev/next buttons), and setFeaturedResult (clicking a preview) */}
      {
        <Preview
          searchResults={searchResults}
          setIsLoading={setIsLoading}
          setSearchResults={setSearchResults}
          setFeaturedResult={setFeaturedResult}
        />
      }
      {/* The following Feature component needs props for featuredResult, as well as setIsLoading and setSearchResults (clicking on searchable properties) */}
      {
        <Feature
          featuredResult={featuredResult}
          setIsLoading={setIsLoading}
          setSearchResults={setSearchResults}
        />
      }
      {/* The following Loading component is static, but should only render when isLoading is true */}
      {/* <Loading /> use a ternary and render null if isLoading is false */}
      {isLoading ? <Loading /> : null}
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
