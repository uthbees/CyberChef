import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useState,
} from 'react';
import {
    Button,
    Grid2,
    Select,
    SelectChangeEvent,
    MenuItem,
    FormControl,
    InputLabel,
    Box,
    IconButton,
    TextField,
    Chip,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { SelectedRecipesContext } from '../App/SelectedRecipesContextProvider';
import { AllRecipesContext } from '../App/AllRecipesContextProvider';
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
    // const { selectedRecipes, setSelectedRecipeUuids } = useContext(
    //     SelectedRecipesContext,
    // );

    // const { recipes } = useContext(AllRecipesContext);

    const AFState = useState<AppliedFilters>({});
    const FRState = useState<Recipe[]>([]);
    const AFValue: AppliedFiltersContextValue = {
        appliedFilters: AFState[0],
        setAppliedFilters: AFState[1],
        filteredRecipes: FRState[0],
        setFilteredRecipes: FRState[1],
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
        <Box
            sx={{
                // margin: 'auto',
                textAlign: 'center',
            }}
        >
            <h1 style={{ fontFamily: 'Rokkitt' }}>
                Stub implementation - Recipe Search
            </h1>
            <p style={{ fontFamily: 'Montserrat' }}>Optional text</p>
        </Box>
    );
}

function SearchDiv() {
    return (
        <Box
            sx={{
                p: 2,
                bgcolor: '#eee',
                border: '5px solid #201C1C',
                borderRadius: 4,
                margin: 'auto',
            }}
            maxWidth={1000}
        >
            <SearchForm />
            <FiltersStrip />
        </Box>
    );
}

function SearchForm() {
    return (
        <form id="search-form" action="/my-handling-form-page" method="post">
            <Grid2 container spacing={4} marginBottom={4}>
                <SearchBar />
                <Filters />
            </Grid2>
        </form>
    );
}

function SearchBar() {
    return (
        <Grid2 container spacing={4} size={6}>
            <SearchInput />
            <Grid2 size={4}>
                <Button
                    endIcon={<SearchIcon />}
                    variant="contained"
                    id="search-button"
                >
                    Search
                </Button>
            </Grid2>
        </Grid2>
    );
}

function SearchInput() {
    const [searchQuery, setSearchQuery] = useState('');
    const handleChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        setSearchQuery(e.target.value);
    };
    const handleClick = () => {
        setSearchQuery('');
    };
    return (
        <Grid2 size={8}>
            <TextField
                label="Search for recipes..."
                variant="outlined"
                name="search-input"
                id="search-input"
                value={searchQuery}
                onChange={(e) => handleChange(e)}
            />
            <ClearXButton onClick={handleClick} />
        </Grid2>
    );
}

function ClearXButton({ onClick }: { onClick: () => void }) {
    //variant="text" id="clear-x-button"
    return (
        <IconButton onClick={onClick} size="small">
            <ClearIcon />
        </IconButton>
    );
}

function Filters() {
    const filters: Filters = {
        tags: {
            name: 'Tag',
            value: 'tags',
            onlyOneFilterAtATime: false,
            criteria: [
                { name: 'Tag1', value: 'tag1' },
                { name: 'Tag2', value: 'tag2' },
                { name: 'Tag3', value: 'tag3' },
            ],
        },
        diff: {
            name: 'Difficulty',
            value: 'diff',
            onlyOneFilterAtATime: true,
            criteria: [
                { name: 'Easy', value: 'easy' },
                { name: 'Intermediate', value: 'medi' },
                { name: 'Expert', value: 'hard' },
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
        <Grid2 container spacing={4} size={6}>
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
            <Grid2 size={4}>
                <Button
                    variant="contained"
                    onClick={applyFilter}
                    endIcon={<FilterAltIcon />}
                    size="small"
                >
                    Apply Filter
                </Button>
            </Grid2>
        </Grid2>
    );
}

function FilterByDropdown(p: FilterByDropdownProps) {
    const [thisValue, setThisValue] = useState('');
    const handleChange = (event: SelectChangeEvent) => {
        p.setSelectedFilter(event.target.value);
        setThisValue(event.target.value);
    };
    const thisName = 'Filter by...';

    return (
        <Grid2 size={4}>
            <Box sx={{ minWidth: 120, maxWidth: 200, bgcolor: '#F4F2EC' }}>
                <FormControl fullWidth>
                    <InputLabel>{thisName}</InputLabel>
                    <Select
                        id="filter-by-dropdown"
                        value={thisValue}
                        onChange={handleChange}
                        label={thisName}
                    >
                        {/* <option selected key="none" value="none">
                                Filter by...
                            </option> */}
                        {Object.keys(p.filters).map(
                            (filter) =>
                                filter != 'none' && (
                                    <MenuItem
                                        key={p.filters[filter].value}
                                        value={p.filters[filter].value}
                                    >
                                        {p.filters[filter].name}
                                    </MenuItem>
                                ),
                        )}
                    </Select>
                </FormControl>
            </Box>
        </Grid2>
    );
}

function CriteriaDropdown(p: CriteriaDropdownProps) {
    const [thisValue, setThisValue] = useState('');
    const handleChange = (e: SelectChangeEvent) => {
        p.setSelectedCriterion(e.target.value);
        setThisValue(e.target.value);
    };

    const availableOptions = p.activeFilter
        ? p.activeFilter.criteria
        : [{ name: 'Choose a filter first!', value: 'nyet' }];

    const thisName = 'Criteria...';

    return (
        <Grid2 size={4}>
            <Box sx={{ minWidth: 120, maxWidth: 200, bgcolor: '#F4F2EC' }}>
                <FormControl fullWidth disabled={!p.activeFilter}>
                    <InputLabel>{thisName}</InputLabel>
                    <Select
                        id="criteria-dropdown"
                        value={thisValue}
                        onChange={handleChange}
                        label={thisName}
                    >
                        {/* <option key="none" value="none">
                                Select criteria...
                            </option> */}
                        {availableOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
        </Grid2>
    );
}

function FiltersStrip() {
    return (
        <Box sx={{ maxWidth: 'auto' }}>
            <Grid2 container spacing={4}>
                <ActiveFiltersWrapper />
                <SortByDropdown />
            </Grid2>
        </Box>
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
        return (
            <Grid2 size={10}>
                <p style={{ fontFamily: 'Montserrat' }}>No Active Filters</p>
            </Grid2>
        );
    }

    return (
        <Grid2
            container
            spacing={0}
            size={10}
            // sx={{
            //     '--Grid-borderWidth': '1px',
            //     borderTop: 'var(--Grid-borderWidth) solid',
            //     borderLeft: 'var(--Grid-borderWidth) solid',
            //     borderColor: 'divider',
            //     '& > div': {
            //         borderRight: 'var(--Grid-borderWidth) solid',
            //         borderBottom: 'var(--Grid-borderWidth) solid',
            //         borderColor: 'divider',
            //     },
            // }}
        >
            <Grid2 size={2}>
                <p style={{ fontFamily: 'Montserrat' }}>Active Filters:</p>
            </Grid2>
            <Grid2 container size={10}>
                {Object.keys(appliedFilters).map((filter) => (
                    <AppliedFilterFlier
                        key={appliedFilters[filter].filter.value}
                        filter={filter}
                        appliedFilters={appliedFilters}
                        removeFilter={removeFilter}
                    />
                ))}
            </Grid2>
        </Grid2>
    );
}

function AppliedFilterFlier(p: AppliedFilterFlierProps) {
    const yuh = p.appliedFilters[p.filter];
    const handleClick = () => {
        p.removeFilter(p.filter);
    };
    return (
        <Grid2 spacing={0} margin={0} padding={0}>
            <Chip
                sx={{ margin: 'auto' }}
                label={`${yuh.filter.name}: ${yuh.criterion.name}`}
                onDelete={handleClick}
            ></Chip>
        </Grid2>
    );
}

function SortByDropdown() {
    const [thisValue, setThisValue] = useState('');
    const handleChange = (event: SelectChangeEvent) => {
        setThisValue(event.target.value);
    };
    const thisName = 'Sort by...';

    return (
        <Box sx={{ minWidth: 120, maxWidth: 200, bgcolor: '#F4F2EC' }}>
            <FormControl fullWidth size="small">
                <InputLabel>{thisName}</InputLabel>
                <Select
                    id="criteria-dropdown"
                    value={thisValue}
                    onChange={handleChange}
                    label={thisName}
                >
                    <MenuItem selected>Sort by...</MenuItem>
                    <MenuItem>Alphabetical</MenuItem>
                    <MenuItem>Difficulty</MenuItem>
                    <MenuItem>Rating</MenuItem>
                    <MenuItem>Time</MenuItem>
                </Select>
            </FormControl>
        </Box>
    );
}

function SearchResults() {
    const {
        recipes, //setSelectedRecipes
    } = useContext(AllRecipesContext);

    return (
        <Grid2 container spacing={4}>
            {Object.values(recipes).map((r, index) => (
                <RecipeCard key={index} index={index} recipe={r} />
            ))}
        </Grid2>
    );
}

function RecipeCard(p: { recipe: Recipe; index: number }) {
    // let tags: string = p.recipe.tags.join(', ');
    // tags = tags.charAt(0).toUpperCase() + tags.slice(1).toLowerCase();
    // const tagCutOff = 18;
    // if (tags.length > tagCutOff) {
    //     tags = tags.substring(0, tagCutOff - 3) + '...';
    // }

    return (
        <Grid2 key={p.index} size={4}>
            {/* <img src="https://placehold.co/200" /> */}
            <h2>{p.recipe.name}</h2>
            <p>Difficulty: {p.recipe.difficulty}</p>
            <p>Total time: {p.recipe.prepTimeMin + p.recipe.cookTimeMin} min</p>
            {/* <p>Tags: {tags}</p> */}
            <AddToShoppingListButton recipe={p.recipe} />
        </Grid2>
    );
}

function AddToShoppingListButton(p: { recipe: Recipe }) {
    const { selectedRecipes, setSelectedRecipeUuids } = useContext(
        SelectedRecipesContext,
    );

    const handleClick = (recipe: Recipe) => {
        const mapped = selectedRecipes.map((recipe) => recipe.uuid);

        // If recipe is already selected, deselect it
        if (selectedRecipes.includes(recipe)) {
            setSelectedRecipeUuids(
                mapped.filter((uuid) => uuid !== recipe.uuid),
            );
        }
        // Else add the recipe to the list
        else {
            setSelectedRecipeUuids([...mapped, recipe.uuid]);
        }

        chosenMessageInd = 1 - chosenMessageInd;
    };

    const message: string[] = [
        'Add to Shopping List',
        'Remove from Shopping List',
    ];
    let chosenMessageInd = selectedRecipes.includes(p.recipe) ? 1 : 0;

    return (
        <Button onClick={() => handleClick(p.recipe)}>
            {message[chosenMessageInd]}
        </Button>
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
    filteredRecipes: Recipe[];
    setFilteredRecipes: Dispatch<SetStateAction<Recipe[]>>;
}

const AppliedFiltersContext = createContext<AppliedFiltersContextValue>({
    appliedFilters: {},
    setAppliedFilters: () => null,
    filteredRecipes: [],
    setFilteredRecipes: () => null,
});
