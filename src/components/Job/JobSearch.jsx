import React, { useState } from 'react';
import axios from 'axios';
import './searchBox.css'; // Import the CSS file

const JobSearch = ({ setJobs }) => {
    const [search, setSearch] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`http://localhost:4000/api/jobs?search=${search}`);
            setJobs(response.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Search jobs"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>
    );
};

export default JobSearch;
