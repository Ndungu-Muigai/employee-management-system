import { Routes, Route } from "react-router-dom"
import { useState } from "react";

import Countries from "./Home/Page";
import AddCountryModal from "./New/Add";
import CountryDetails from "./Country/Page";

import ErrorPage from "../../../Error Page/Page"

const CountriesLayout = () =>
{
    const [countries, setCountries] = useState([])

    return ( 
        <>
            <Routes>
                <Route path="/" element={<Countries countries={countries}/>}></Route>
                <Route path="/new" element={<AddCountryModal countries={countries} setCountries={setCountries}/>}></Route>
                <Route path="/:id" element={<CountryDetails/>}></Route>
                <Route path="*" element={<ErrorPage/>}></Route>
            </Routes>
        </>
     );
}
 
export default CountriesLayout;