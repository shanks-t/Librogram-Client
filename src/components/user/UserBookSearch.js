import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const UserBookSearch = ({ handleSearch }) => {

    return (
    
    <fieldset className="search">
    <label htmlFor="q">Search My Books</label>
    <input name="q" type="text" onSubmit={handleSearch} />
    </fieldset>

    )
}