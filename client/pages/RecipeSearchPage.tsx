import {
    Dispatch,
    SetStateAction,
    createContext,
    useContext,
    useState,
    useEffect,
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
    Fab,
    Zoom,
} from '@mui/material';

import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

import { SelectedRecipesContext } from '../App/SelectedRecipesContextProvider';
import RecipeDialog from './dialog';
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
            ShowRecipeButton - button
                Reveals RecipeDialog
    ScrollToTopButton
*/

/*
----- COMPONENT DEFINITIONS -----
*/

export default function RecipeSearchPage() {
    const filterRecipe = (recipe: Recipe, appliedFilters: AppliedFilters) => {
        for (const applied of Object.values(appliedFilters)) {
            if (
                !applied.filter.recipeMeetsCriterion(recipe, applied.criterion)
            ) {
                return false;
            }
        }
        return true;
    };

    const { recipes } = useContext(AllRecipesContext);
    const AFState = useState<AppliedFilters>({});
    const SOState = useState<SortOption>({} as SortOption);
    const contextValue: SearchPageContextValue = {
        appliedFilters: AFState[0],
        setAppliedFilters: AFState[1],
        sortOption: SOState[0],
        setSortOption: SOState[1],
        filteredRecipes: Object.values(recipes)
            .filter((recipe) => filterRecipe(recipe, AFState[0]))
            .sort(SOState[0].sortFunction),
    };

    return (
        <div id="RecipeSearchPage" style={{ margin: 50 }}>
            <SearchPageContext.Provider value={contextValue}>
                <IntroHeader />
                <SearchDiv />
                <SearchResults />
                <ScrollToTopButton />
            </SearchPageContext.Provider>
        </div>
    );
}

function IntroHeader() {
    return (
        <Box
            id="IntroHeader"
            sx={{
                textAlign: 'center',
                marginBottom: '75px',
            }}
        >
            <h1 style={{ fontFamily: 'Rokkitt' }}>Search for Recipes</h1>
            <p style={{ fontFamily: 'Montserrat' }}>
                Find your next great meal!
            </p>
        </Box>
    );
}

function SearchDiv() {
    return (
        <Box
            id="SearchDiv"
            sx={{
                p: 2,
                bgcolor: '#E4E2DC',
                border: '5px solid #201C1C',
                borderRadius: 5,
                margin: 'auto',
                padding: 0,
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
        <form id="SearchForm" action="/my-handling-form-page" method="post">
            <Grid2
                container
                spacing={4}
                marginBottom={1}
                padding={2}
                alignItems={'center'}
            >
                <SearchBar />
                <Filters />
            </Grid2>
        </form>
    );
}

function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const { appliedFilters, setAppliedFilters } = useContext(SearchPageContext);
    const handleClick = () => {
        if (!searchQuery || searchQuery.trim() === '') {
            setSearchQuery('');
            return;
        }

        const sq = 'sq:';
        const filt = {
            name: 'Includes',
            value: 'search',
            onlyOneCritAtATime: false,
            criteria: [
                {
                    name: `"${searchQuery}"`,
                    value: sq + searchQuery,
                },
            ],
            recipeMeetsCriterion: (recipe: Recipe, criterion: Criterion) => {
                return recipe.name
                    .toLowerCase()
                    .includes(criterion.value.slice(sq.length).toLowerCase());
            },
        } as Filter;

        const newFilters = { ...appliedFilters };
        newFilters[
            filt.onlyOneCritAtATime ? filt.value : filt.criteria[0].value
        ] = {
            filter: filt,
            criterion: filt.criteria[0],
        };
        setAppliedFilters(newFilters);

        console.log('Search query: ', searchQuery);
        setSearchQuery('');
    };

    return (
        <Grid2
            id="SearchBar"
            container
            spacing={4}
            size={6}
            alignItems={'center'}
        >
            <SearchInput
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
            />
            <Grid2 size={4}>
                <Button
                    endIcon={<SearchIcon />}
                    variant="contained"
                    id="search-button"
                    onClick={handleClick}
                >
                    Search
                </Button>
            </Grid2>
        </Grid2>
    );
}

function SearchInput(p: {
    searchQuery: string;
    setSearchQuery: (value: string) => void;
}) {
    const handleChange = (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    ) => {
        p.setSearchQuery(e.target.value);
    };
    const handleXClick = () => {
        p.setSearchQuery('');
    };
    return (
        <Grid2 id="SearchInput" size={8} alignItems={'center'}>
            <TextField
                sx={{ bgcolor: '#F4F2EC', width: '100%' }}
                label="Search for recipes..."
                variant="outlined"
                name="search-input"
                id="search-input"
                value={p.searchQuery}
                onChange={(e) => handleChange(e)}
            />
            <ClearXButton onClick={handleXClick} />
        </Grid2>
    );
}

function ClearXButton({ onClick }: { onClick: () => void }) {
    return (
        <IconButton
            sx={{ marginTop: 1.25, marginLeft: -4.5 }}
            onClick={onClick}
            size="small"
        >
            <ClearIcon />
        </IconButton>
    );
}

function Filters() {
    const filters: Filters = {
        diff: {
            name: 'Difficulty',
            value: 'diff',
            onlyOneCritAtATime: true,
            criteria: [
                { name: 'Easy', value: 'Easy' },
                { name: 'Intermediate', value: 'Intermediate' },
                { name: 'Expert', value: 'Expert' },
            ],
            recipeMeetsCriterion: (recipe: Recipe, criterion: Criterion) => {
                return recipe.difficulty === criterion.value;
            },
        },
        time: {
            name: 'Total time',
            value: 'time',
            onlyOneCritAtATime: true,
            criteria: [
                { name: '≤ 15 min', value: '15' },
                { name: '≤ 30 min', value: '30' },
                { name: '≤ 1 hr', value: '60' },
                { name: '≤ 2 hr', value: '120' },
            ],
            recipeMeetsCriterion: (recipe: Recipe, criterion: Criterion) => {
                return (
                    recipe.prepTimeMin + recipe.cookTimeMin <=
                    Number(criterion.value)
                );
            },
        },
        tags: {
            name: 'Tag (N/A)',
            value: 'tags',
            onlyOneCritAtATime: false,
            criteria: [
                { name: 'Tag1', value: 'Tag1' },
                { name: 'Tag2', value: 'Tag2' },
                { name: 'Tag3', value: 'Tag3' },
            ],
            recipeMeetsCriterion: (recipe: Recipe, criterion: Criterion) => {
                // TODO: Implement
                if (recipe && criterion) {
                }
                return true;
            },
        },
        rate: {
            name: 'Rating (N/A)',
            value: 'rate',
            onlyOneCritAtATime: true,
            criteria: [
                { name: '≥2 stars', value: '2' },
                { name: '≥3 stars', value: '3' },
                { name: '≥4 stars', value: '4' },
                { name: '5 stars', value: '5' },
            ],
            recipeMeetsCriterion: (recipe: Recipe, criterion: Criterion) => {
                // TODO: Implement
                if (recipe && criterion) {
                }
                return true;
            },
        },
    };

    const [selectedFilter, setSelectedFilter] = useState('none');
    const [selectedCriterion, setSelectedCriterion] = useState('none');
    const { appliedFilters, setAppliedFilters } = useContext(SearchPageContext);

    const applyFilter = () => {
        console.log('Applying filter: ', selectedFilter, selectedCriterion);
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
            filters[selectedFilter].onlyOneCritAtATime
                ? selectedFilter
                : selectedCriterion
        ] = {
            filter: filters[selectedFilter],
            criterion: crit,
        };
        setAppliedFilters(newFilters);
    };

    return (
        <Grid2
            id="Filters"
            container
            spacing={4}
            size={6}
            alignItems={'center'}
        >
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
                >
                    Apply
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
        <Grid2 id="FilterByDropdown" size={4}>
            <Box sx={{ minWidth: 120, maxWidth: 200, bgcolor: '#F4F2EC' }}>
                <FormControl fullWidth>
                    <InputLabel>{thisName}</InputLabel>
                    <Select
                        id="filter-by-dropdown"
                        value={thisValue}
                        onChange={handleChange}
                        label={thisName}
                    >
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
        <Grid2 id="CriteriaDropdown" size={4}>
            <Box sx={{ minWidth: 120, maxWidth: 200, bgcolor: '#F4F2EC' }}>
                <FormControl fullWidth disabled={!p.activeFilter}>
                    <InputLabel>{thisName}</InputLabel>
                    <Select
                        id="criteria-dropdown"
                        value={thisValue}
                        onChange={handleChange}
                        label={thisName}
                    >
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
        <Box
            id="FiltersStrip"
            sx={{
                maxWidth: 'auto',
                margin: 'auto',
                bgcolor: '#D4D2CC',
                padding: 2,
                borderRadius: 4,
            }}
        >
            <Grid2 container spacing={4} alignItems={'center'}>
                <ActiveFiltersWrapper />
                <SortByDropdown />
            </Grid2>
        </Box>
    );
}

function ActiveFiltersWrapper() {
    const { appliedFilters, setAppliedFilters } = useContext(SearchPageContext);

    const removeFilter = (filter: string) => {
        // remove filter from applied
        const newFilters = { ...appliedFilters };
        delete newFilters[filter];
        setAppliedFilters(newFilters);
    };

    if (Object.keys(appliedFilters).length === 0) {
        return (
            <Grid2 id="ActiveFiltersWrapper" size={10}>
                <p style={{ fontFamily: 'Montserrat', margin: 'auto' }}>
                    No Active Filters
                </p>
            </Grid2>
        );
    }

    return (
        <Grid2 id="ActiveFiltersWrapper" container spacing={0} size={10}>
            <Grid2 size={2}>
                <p
                    style={{
                        fontFamily: 'Montserrat',
                        margin: 'auto',
                        marginTop: 6,
                    }}
                >
                    Active Filters:
                </p>
            </Grid2>
            <Grid2 container size={10}>
                {Object.keys(appliedFilters).map((filter) => (
                    <AppliedFilterChip
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

function AppliedFilterChip(p: AppliedFilterFlierProps) {
    const yuh = p.appliedFilters[p.filter];
    const handleClick = () => {
        p.removeFilter(p.filter);
    };
    return (
        <Grid2 margin={0} padding={0}>
            <Chip
                sx={{ margin: 'auto', marginRight: 1 }}
                label={`${yuh.filter.name}: ${yuh.criterion.name}`}
                onDelete={handleClick}
            ></Chip>
        </Grid2>
    );
}

function SortByDropdown() {
    const foo = { Easy: 1, Intermediate: 2, Expert: 3 }; // as { [value: RecipeDifficulty]: number };
    const sortOptions: SortOptions = {
        alph: {
            name: 'Alphabetical',
            value: 'alph',
            sortFunction: (a, b) => a.name.localeCompare(b.name),
        },
        diff: {
            name: 'Difficulty',
            value: 'diff',
            sortFunction: (a, b) => foo[a.difficulty] - foo[b.difficulty],
        },
        time: {
            name: 'Time',
            value: 'time',
            sortFunction: (a, b) =>
                a.prepTimeMin + a.cookTimeMin - (b.prepTimeMin + b.cookTimeMin),
        },
        rate: {
            name: 'Rating (N/A)',
            value: 'rate',
            sortFunction: () => 0, // TODO: Implement
        },
    };

    const [thisValue, setThisValue] = useState('');
    const { setSortOption } = useContext(SearchPageContext);
    const handleChange = (e: SelectChangeEvent) => {
        setSortOption(sortOptions[e.target.value]);
        setThisValue(e.target.value);
    };
    const thisName = 'Sort by...';

    return (
        <Grid2 id="SortByDropdown" size={2}>
            <Box sx={{ minWidth: 120, maxWidth: 200, bgcolor: '#F4F2EC' }}>
                <FormControl fullWidth size="small">
                    <InputLabel>{thisName}</InputLabel>
                    <Select
                        id="sort-by-dropdown"
                        value={thisValue}
                        onChange={handleChange}
                        label={thisName}
                    >
                        {Object.values(sortOptions).map((option) => (
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

function SearchResults() {
    const { filteredRecipes } = useContext(SearchPageContext);

    return (
        <Grid2
            container
            spacing={6}
            sx={{
                maxWidth: '1000px',
                margin: 'auto',
                marginTop: 6,
                border: '5px solid #201C1C',
                borderRadius: 5,
                padding: 3,
                bgcolor: '#E8C3A2',
            }}
        >
            {Object.values(filteredRecipes).map((r, index) => (
                <RecipeCard key={index} index={index} recipe={r} />
            ))}
        </Grid2>
    );
}

function RecipeCard(p: { recipe: Recipe; index: number }) {
    // TODO: Implement tags (restore the commented code below)
    // let tags: string = p.recipe.tags.join(', ');
    // tags = tags.charAt(0).toUpperCase() + tags.slice(1).toLowerCase();
    // const tagCutOff = 18;
    // if (tags.length > tagCutOff) {
    //     tags = tags.substring(0, tagCutOff - 3) + '...';
    // }

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <Grid2
            key={p.index}
            size={4}
            style={{ position: 'relative', cursor: 'pointer' }}
        >
            <Box
                onClick={() => setIsDialogOpen(true)}
                sx={{
                    border: '4px solid #BA1F11',
                    borderRadius: 3,
                    bgcolor: '#F4F2EC',
                    fontFamily: 'Montserrat',
                    paddingX: 3,
                }}
            >
                <h2
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontFamily: 'Rokkitt',
                    }}
                >
                    {p.recipe.name}
                </h2>
                <p>Difficulty: {p.recipe.difficulty}</p>
                <p>Time: {p.recipe.prepTimeMin + p.recipe.cookTimeMin} min</p>
                <Box mb={2}></Box>
            </Box>
            <RecipeDialog
                open={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                recipe={p.recipe}
            />
            <div style={{ position: 'absolute', top: 16, right: 16 }}>
                <AddToShoppingListButton recipe={p.recipe} />
            </div>
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

        recipeIsIncluded = !recipeIsIncluded;
    };

    let recipeIsIncluded = selectedRecipes.includes(p.recipe);

    return (
        <IconButton
            color={recipeIsIncluded ? 'error' : 'primary'}
            onClick={() => handleClick(p.recipe)}
        >
            {recipeIsIncluded ? <RemoveIcon /> : <AddIcon />}
        </IconButton>
    );
}

function ScrollToTopButton() {
    const [isVisible, setIsVisible] = useState(false);
    const handleScroll = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <Zoom in={isVisible}>
            <Fab
                onClick={scrollToTop}
                color="primary"
                style={{
                    position: 'fixed',
                    bottom: '50px',
                    right: '50px',
                }}
            >
                <ArrowUpwardIcon />
            </Fab>
        </Zoom>
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
    onlyOneCritAtATime: boolean;
    criteria: Criterion[];
    recipeMeetsCriterion: (recipe: Recipe, criterion: Criterion) => boolean;
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

interface SortOption {
    name: string;
    value: string;
    sortFunction: (a: Recipe, b: Recipe) => number;
}

interface SortOptions {
    [value: string]: SortOption;
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

interface SearchPageContextValue {
    appliedFilters: AppliedFilters;
    setAppliedFilters: Dispatch<SetStateAction<AppliedFilters>>;
    sortOption: SortOption;
    setSortOption: Dispatch<SetStateAction<SortOption>>;
    filteredRecipes: Recipe[];
}

const SearchPageContext = createContext<SearchPageContextValue>({
    appliedFilters: {},
    setAppliedFilters: () => null,
    sortOption: { name: '', value: '', sortFunction: () => 0 },
    setSortOption: () => null,
    filteredRecipes: [],
});
