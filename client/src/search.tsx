// import { useState } from 'react';
// import CyberChefLogo from '../assets/images/logo/logo_white.png';
// import viteLogo from '/vite.svg';
import './Search.css';

export default function SearchPage() {
    return (
        <main>
            {SearchIntro()}
            {SearchForm()}
            {/* {SearchResults()} */}
        </main>
    );
}

function SearchIntro() {
    return (
        <div className="page-title">
            <h1>Search</h1>
        </div>
    );
}

function SearchForm() {
    return (
        <div className="search-bar">
            <form
                id="search-form"
                action="/my-handling-form-page"
                method="post"
            >
                {SearchBar()}
                {Filters()}
            </form>
            {ActiveFilters()}
        </div>
    );
}

function SearchBar() {
    return (
        <div>
            <input type="text" name="search-input" id="search-input" />
            <input
                type="button"
                id="search-button"
                onClick={updateSearch}
                value="Search"
            />
            {/* <input type="reset" id="reset-button" /> */}
        </div>
    );
}

function Filters() {
    return (
        <div>
            <p>Filter by:</p>
            {/* <label for="tags-filter">Filter by:</label> */}
            <select
                name="filter-select"
                id="filter-select"
                onChange={updateFilterChoice}
            >
                <option value="#none#">Select filter...</option>
                <option value="tags">Tags</option>
                <option value="time">Time</option>
                <option value="difficulty">Difficulty</option>
                <option value="rating">Rating</option>
                <option value="popularity">Popularity</option>
            </select>
            <select name="filter-options" id="filter-options"></select>
            <button onClick={updateSearch}>Apply</button>
        </div>
    );
}

function ActiveFilters() {
    return (
        <div>
            <div>Active Filters:</div>
            <div>
                {/* /* TODO: get & display active filters; allow user to remove */}
            </div>
        </div>
    );
}

function updateSearch() {}

function updateFilterChoice() {
    // const filterSelect = document.getElementById('filter-select');
    // const filterOptions = document.getElementById('filter-options');
    // const filterChoice =
    //     filterSelect!.options[filterSelect.selectedIndex].value;
    // const filterOptionsArray = [
    //     { name: 'tags', options: ['tag1', 'tag2', 'tag3'] },
    //     { name: 'time', options: ['< 1 hr', '1-2 hrs', '2-3 hrs', '> 3 hrs'] },
    //     { name: 'difficulty', options: ['easy', 'medium', 'hard'] },
    //     {
    //         name: 'rating',
    //         options: ['1 star', '2 stars', '3 stars', '4 stars', '5 stars'],
    //     },
    //     { name: 'popularity', options: ['most popular', 'least popular'] },
    // ];
    // const selectedFilter = filterOptionsArray.find(
    //     (filter) => filter.name === filterChoice,
    // );
    // filterOptions.innerHTML = '';
    // selectedFilter.options.forEach((option) => {
    //     const optionElement = document.createElement('option');
    //     optionElement.value = option;
    //     optionElement.innerHTML = option;
    //     filterOptions.appendChild(optionElement);
    // });
}

// function SearchResults() {
//     // return <div className="search-results">/* TODO: Search results */</div>;
// }

// function SearchResult() {
//     // return <div>/* TODO: Search result */</div>;
// }
