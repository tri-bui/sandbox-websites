// Original data
const tableData = data;

// Table element on web page
var tbody = d3.select("tbody");


/**
 * Clear the table currently being displayed on the page and display the data 
 * that is passed in.
 * @param {arr[obj]} data - data to display in the table
 */
function displayTable(data) {
    tbody.html(""); // clear the table

    // Iterate through every object in the data
    data.forEach(dataObj => {
        let row = tbody.append("tr"); // add a row to the table

        // Fill row with data
        Object.entries(dataObj).forEach(([key, val]) => {

            // Title-case cities
            if (key == 'city') {
                val = val.split(' ').map(w => w[0].toUpperCase() + w.slice(1)).join(' ');
            }

            // Uppercase states and countries
            if (['state', 'country'].includes(key)) {
                val = val.toUpperCase();
            }

            // Add value to cell
            row.append("td").text(val)
        });
    });
}


/**
 * This function filters the data based on user input.
 * @param {arr[obj]} data - data to filter
 * @return {arrr[obj]} filtered data
 */
function filterData(data) {
    let filtered = data;

    // Input types on the page
    let inputTypes = ["input", "select"];

    // For each input type
    inputTypes.forEach(inputType => {

        // For each input of the current type
        d3.selectAll(inputType).nodes().forEach(input => {

            // Input ID and value
            let inputId = input.id;
            let inputVal = input.value.toLowerCase();

            // Filter data if there was an input
            if (inputVal) {
                filtered = filtered.filter(row => row[inputId] === inputVal);
            };
        });
    });

    return filtered;
}


/**
 * This function defines what happens when the filter button is clicked. The 
 * data is filtered based on the selected date and this filtered data is then 
 * displayed in the table on the page.
 */
function filterButtonHandler() {
    // Initialize the filtered data to full data
    let filteredData = tableData;

    // Filter data
    filteredData = filterData(filteredData);

    // Display the filtered data on the page
    displayTable(filteredData);
}


// When the filter button is clicked, call its handler
d3.select("#filter-btn").on("click", filterButtonHandler);

// Display full table on load
displayTable(tableData);