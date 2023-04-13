import "./App.css";
import profile from "./Profile";
import React, { useEffect, useState } from "react";

const App = () => {
  const [filteredProfile, setFilteredProfile] = new useState(profile);
const [query, setQuery] = useState("")
  const profileLists = filteredProfile.map((person) => (
    <li key={person.id} className="profile">
      <img src={person.picture} alt={person.firstName + "'s picture"} />
      <div className="personProfile">
        <span className="personID">{person.id}</span>
        <span className="personName">
          {person.title + " " + person.firstName + " " + person.lastName}
        </span>
      </div>
    </li>
  ));

  const filterBySearch = (e) => {
    // const query = e.target.value // create variable as state
        if(query.length < 1 && e.target.value.trim().length < 1) return; //the input needs a validation that prevents the user from starting the search value with a space
    setQuery(e.target.value)
  };

  useEffect(()=>{
    let updatedList = [...profile];
    updatedList = updatedList.filter((person) => {
      return (
        person.firstName.toLowerCase().startsWith(query.toLowerCase()) || // remember that you are searching for a name, meaning the search value has to be the begiining of the name, startsWith is more effective than includes at this point
        person.lastName.toLowerCase().startsWith(query.toLowerCase()) 
        // person.id.toLowerCase().indexOf(query.toLowerCase()) !== -1 || the assignment did not include id as a parameter
        // person.title.toLowerCase().indexOf(query.toLowerCase()) !== -1 the assignment did not include title as a parameter
      );
    });
    setFilteredProfile(updatedList);
  }, [query])
  return (
    <div className="container">
      {/* I see atleast three different components here, try separating  */}
      <form className="profileSearchBar">
        <input placeholder="Search by name..." value={query} onChange={(e) => filterBySearch(e)} />  {/* Your input should have a value attribute */}
      </form>

      <ul className="profileContainer">{profileLists}</ul>
    </div>
  );
};

export default App;

/**
 * Pseudocode
 *
 * Step 1 - create a function for the list of arrays (const profile = [{......}])
 * Step 2 - create a react useState function that assigns the profile function to a prop(const [filteredProfile, setFilteredProfile] = new useState(profile))
 * Step 3- create a function that render the arrays in a list (const profileLists = filteredProfile.map((person) => (<li>......</li>))
 * Step 4 - create a function that filters the list when the value of the input box changes (const filteredSearch = (e) => {})
 * Step 4b - In the filteredSearch function, create a variable that gets the value of the input (const query = e.target.value)
 * Step 4c - create another variable and duplicate the array(profile) using the spread syntax (let updatedLists = [...profile])
 * Step 4d - Filter through the updatedLists variable and return the conditions you require (updatedLists = updatedLists.filter(person) => {return (person.firstName.toLowercase().indexOf(query.toLowerCase) !== -1) || ....})
 * Step 4e - Update your useState with the updatedLists variable (setFilteredProfile(updatedLists))
 * Step 5 - create an input JSX and pass the filteredSearch function as a prop (<input onChange={filteredSearch}/>)
 * Step 6 - create a ul JSX and pass the profileLists function into it. This renders the array as a list on the browser.
 */