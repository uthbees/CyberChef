import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from 'react';
import { Button } from '@mui/material';
import { SelectedRecipesContext } from '../App/SelectedRecipesContextProvider';
import { Recipe } from '../App/types';

/* Structure:
RecipeSearchPage
    IntroHeader
        Title - h1
        TextOrWhatever - p
    SearchDiv
        SearchForm
            SearchBar
                SearchInput - input
                    ClearXButton - button
                SearchButton - button
            Filters
                FilterByDropdown - select
                    Tags, Time, Difficulty, Rating, etc.
                CriteriaDropdown - select
                    Specific criteria for each filter
                ApplyFilterButton - button
        FiltersStrip
            ActiveFilters
                "Active Filters:" - p
                ActiveFilter
                    FilterCriteria - p
                    RemoveFilterXButton - button
                ClearAllFiltersButton - button
            SortByDropdown - select
    SearchResults
        RecipeCard
            RecipeCardImage - img
            RecipeCardText
                RecipeCardName - h2
                RecipeCardDifficulty - p
                RecipeCardTotalTime - p
                RecipeCardTags - p
            AddToShoppingListButton - button
                Toggles to RemoveFromShoppingListButton
    ScrollToTopButton
*/

/*
----- COMPONENT DEFINITIONS -----
*/

export default function RecipeSearchPage() {
    // const { selectedRecipes, setSelectedRecipes } = useContext(
    //     SelectedRecipesContext,
    // );

    const AFState = useState<AppliedFilters>({});
    const AFValue: AppliedFiltersContextValue = {
        appliedFilters: AFState[0],
        setAppliedFilters: AFState[1],
    };

    return (
        <div>
            <AppliedFiltersContext.Provider value={AFValue}>
                <IntroHeader />
                <SearchDiv />
                <SearchResults />
                {/* <Button onClick={scrollToTop}>Scroll To Top</Button> */}
            </AppliedFiltersContext.Provider>
        </div>
    );
}

function IntroHeader() {
    return (
        <div>
            <h1>stub implementation - recipe search</h1>
            <p>optional text</p>
        </div>
    );
}

function SearchDiv() {
    return (
        <div>
            <SearchForm />
            <FiltersStrip />
        </div>
    );
}

function SearchForm() {
    return (
        <form id="search-form" action="/my-handling-form-page" method="post">
            <SearchBar />
            <Filters />
        </form>
    );
}

function SearchBar() {
    return (
        <div>
            <SearchInput />
            <Button id="search-button">Search</Button>
        </div>
    );
}

function SearchInput() {
    const [searchQuery, setSearchQuery] = useState('');
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };
    const handleClick = () => {
        setSearchQuery('');
    };
    return (
        <div>
            <input
                type="text"
                name="search-input"
                id="search-input"
                value={searchQuery}
                onChange={(e) => handleChange(e)}
            />
            <ClearXButton onClick={handleClick} />
        </div>
    );
}

function ClearXButton({ onClick }: { onClick: () => void }) {
    return (
        <Button id="clear-x-button" onClick={onClick}>
            X
        </Button>
    );
}

function Filters() {
    const filters: Filters = {
        tags: {
            name: 'Tag',
            value: 'tags',
            onlyOneFilterAtATime: false,
            criteria: [
                { name: 'tag1', value: 'tag1' },
                { name: 'tag2', value: 'tag2' },
                { name: 'tag3', value: 'tag3' },
            ],
        },
        diff: {
            name: 'Difficulty',
            value: 'diff',
            onlyOneFilterAtATime: true,
            criteria: [
                { name: 'easy', value: 'easy' },
                { name: 'intermediate', value: 'medi' },
                { name: 'expert', value: 'hard' },
            ],
        },
        rate: {
            name: 'Rating',
            value: 'rate',
            onlyOneFilterAtATime: true,
            criteria: [
                { name: '≥2 stars', value: '2star' },
                { name: '≥3 stars', value: '3star' },
                { name: '≥4 stars', value: '4star' },
                { name: '5 stars', value: '5star' },
            ],
        },
        time: {
            name: 'Total time',
            value: 'time',
            onlyOneFilterAtATime: true,
            criteria: [
                { name: '≤15 min', value: '15min' },
                { name: '≤30 min', value: '30min' },
                { name: '≤1 hr', value: '1hour' },
                { name: '≤2 hr', value: '2hour' },
            ],
        },
    };

    const [selectedFilter, setSelectedFilter] = useState('none');
    const [selectedCriterion, setSelectedCriterion] = useState('none');
    const { appliedFilters, setAppliedFilters } = useContext(
        AppliedFiltersContext,
    );

    const applyFilter = () => {
        if (
            // Cases to prevent applying a filter
            selectedFilter === 'none' ||
            selectedCriterion === 'none' ||
            !filters[selectedFilter] ||
            selectedCriterion === 'nyet'
        ) {
            return;
        }

        const newFilters = { ...appliedFilters };
        const crit = filters[selectedFilter].criteria.find(
            (c) => c.value === selectedCriterion,
        );
        if (!crit) {
            return;
        }
        newFilters[
            filters[selectedFilter].onlyOneFilterAtATime
                ? selectedFilter
                : selectedCriterion
        ] = {
            filter: filters[selectedFilter],
            criterion: crit,
        };
        setAppliedFilters(newFilters);
    };

    return (
        <div>
            <FilterByDropdown
                filters={filters}
                selectedFilter={selectedFilter}
                setSelectedFilter={setSelectedFilter}
            />
            <CriteriaDropdown
                activeFilter={filters[selectedFilter]}
                selectedCriterion={selectedCriterion}
                setSelectedCriterion={setSelectedCriterion}
            />
            <Button onClick={applyFilter}>Apply Filter</Button>
        </div>
    );
}

function FilterByDropdown(p: FilterByDropdownProps) {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        p.setSelectedFilter(event.target.value);
    };

    return (
        <select
            id="filter-by-dropdown"
            value={p.selectedFilter}
            onChange={handleChange}
        >
            <option selected key="none" value="none">
                Filter by...
            </option>

            {Object.keys(p.filters).map(
                (filter) =>
                    filter != 'none' && (
                        <option
                            key={p.filters[filter].value}
                            value={p.filters[filter].value}
                        >
                            {p.filters[filter].name}
                        </option>
                    ),
            )}
        </select>
    );
}

function CriteriaDropdown(p: CriteriaDropdownProps) {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        p.setSelectedCriterion(e.target.value);
    };

    const availableOptions = p.activeFilter
        ? p.activeFilter.criteria
        : [{ name: 'Choose a filter first!', value: 'nyet' }];

    return (
        <select
            id="criteria-dropdown"
            value={p.selectedCriterion}
            onChange={handleChange}
        >
            <option key="none" value="none">
                Select criteria...
            </option>
            {availableOptions.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            ))}
        </select>
    );
}

function FiltersStrip() {
    return (
        <div>
            <ActiveFiltersWrapper />
            <SortByDropdown />
        </div>
    );
}

function ActiveFiltersWrapper() {
    const { appliedFilters, setAppliedFilters } = useContext(
        AppliedFiltersContext,
    );

    const removeFilter = (filter: string) => {
        // remove filter from applied
        const newFilters = { ...appliedFilters };
        delete newFilters[filter];
        setAppliedFilters(newFilters);
    };

    if (Object.keys(appliedFilters).length === 0) {
        return <p>No Active Filters</p>;
    }

    return (
        <div>
            <p>Active Filters:</p>
            <div>
                {Object.keys(appliedFilters).map((filter) => (
                    <AppliedFilterFlier
                        key={appliedFilters[filter].filter.value}
                        filter={filter}
                        appliedFilters={appliedFilters}
                        removeFilter={removeFilter}
                    />
                ))}
            </div>
        </div>
    );
}

function AppliedFilterFlier(p: AppliedFilterFlierProps) {
    const yuh = p.appliedFilters[p.filter];
    const handleClick = () => {
        p.removeFilter(p.filter);
    };
    return (
        <div>
            <p>
                {yuh.filter.name}: {yuh.criterion.name}
            </p>
            <ClearXButton onClick={handleClick} />
        </div>
    );
}

function SortByDropdown() {
    return (
        <select id="sort-by-dropdown">
            <option selected>Sort by...</option>
            <option>Alphabetical</option>
            <option>Difficulty</option>
            <option>Rating</option>
            <option>Time</option>
        </select>
    );
}

function SearchResults() {
    const {
        selectedRecipes, //setSelectedRecipes
    } = useContext(SelectedRecipesContext);

    return (
        <div>
            {selectedRecipes.map((recipe) => (
                <RecipeCard key={recipe.name} recipe={recipe} />
            ))}
        </div>
    );
}

function RecipeCard(p: { recipe: Recipe }) {
    return (
        <div>
            <img src="https://placehold.co/200" />
            <h2>{p.recipe.name}</h2>
            {/* <AddToShoppingListButton /> */}
        </div>
    );
}

/*
----- INTERFACE DEFINITIONS -----
*/

interface Criterion {
    name: string;
    value: string;
}

interface Filter {
    name: string;
    value: string;
    onlyOneFilterAtATime: boolean;
    criteria: Criterion[];
}

interface Filters {
    [value: string]: Filter;
}

interface AppliedFilter {
    filter: Filter;
    criterion: Criterion;
}

interface AppliedFilters {
    [value: string]: AppliedFilter;
}

interface AppliedFilterFlierProps {
    appliedFilters: AppliedFilters;
    filter: string;
    removeFilter: (filter: string) => void;
}

interface FilterByDropdownProps {
    filters: Filters;
    selectedFilter: string;
    setSelectedFilter: (value: string) => void;
}

interface CriteriaDropdownProps {
    activeFilter: Filter;
    selectedCriterion: string;
    setSelectedCriterion: (value: string) => void;
}

/*
----- APPLIED FILTERS CONTEXT -----
*/

interface AppliedFiltersContextValue {
    appliedFilters: AppliedFilters;
    setAppliedFilters: Dispatch<SetStateAction<AppliedFilters>>;
}

const AppliedFiltersContext = createContext<AppliedFiltersContextValue>({
    appliedFilters: {},
    setAppliedFilters: () => null,
});
