#Meghna - Project Phase 2

1. Worked on searching the list of movies/series/episodes based on Genre
2. Displayed the fetched data
3. We can add pagination for viewing all the results of 'ByGenre'. For pagination, we can do following:

    a. Add buttons in 'renderloop' function for NEXT & PREV
    b. Add next page and prev page logic

    data = await getByGenre(search.replaceAll(" ", ""), currentPage);

    for NEXT page:
    currentPage++;
    for PREV page:
    if (currentPage > 1) {
    currentPage--;
    }
    and then call for the data fetch function

4. made a few improvements to CSS.