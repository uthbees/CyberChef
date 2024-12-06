// This page is being developed by Andy.

// import { useState } from 'react';
// import CyberChefLogo from '../assets/images/logo/logo_white.png';
// import viteLogo from '/vite.svg';
import './Search.css';

interface SearchPageProps {
    recipes: SearchResultProps[];
}

export default function SearchPage(p: SearchPageProps) {
    return (
        <main>
            <IntroHeader pageName="Search" />
            <SearchForm />
            <SearchResults recipes={p.recipes} />
        </main>
    );
}

interface IntroHeaderProps {
    pageName: string;
}

function IntroHeader(p: IntroHeaderProps) {
    return (
        <div className="intro-header">
            <h1>{p.pageName}</h1>
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
                <SearchBar />
                <Filters />
            </form>
            <ActiveFilters />
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
        <>
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
        </>
    );
}

function ActiveFilters() {
    return (
        <>
            <div>Active Filters:</div>
            <div>
                {/* TODO: get & display active filters; allow user to remove */}
            </div>
        </>
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

function SearchResults(p: SearchPageProps) {
    length = p.recipes.length;
    if (length === 0) {
        return <div className="search-results">No results found</div>;
    }
    // let newRecipes: string = "";
    // recipes.forEach((recipe) => {newRecipes += SearchResult(recipe)});
    return (
        <div className="search-results">
            <ul>
                {p.recipes.map((recipe, i) => (
                    <li key={i}>{SearchResult(recipe)}</li>
                ))}
            </ul>
        </div>
    );
}

interface SearchResultProps {
    recipeName: string;
    imgFile: string;
    difficulty: string;
    totalTime: string;
}

function SearchResult(p: SearchResultProps) {
    return (
        <div className="search-result">
            <img src={p.imgFile} alt={'Image of ' + p.recipeName} />
            <h2>{p.recipeName}</h2>
            <p>
                Difficulty: {p.difficulty} | Total time: {p.totalTime}
            </p>
        </div>
    );
}
