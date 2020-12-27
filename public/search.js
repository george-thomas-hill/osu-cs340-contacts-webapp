// This function effects a search on the /contacts page by manipulating the URL. It is called by clicking the "Search" button.

function search() {
    let searchFirst = document.getElementById("searchFirstName").value;
    let searchLast = document.getElementById("searchLastName").value;

    searchFirst = (searchFirst == "") ? "~" : searchFirst; // If searchFirst is empty, then do a LIKE search using the ~ as a placeholder for a wildcard.
    searchLast = (searchLast == "") ? "~" : searchLast; // If searchLast is empty, then do a LIKE search using the ~ as a placeholder for a wildcard.

    window.location.href = "../" + searchFirst + "/" + searchLast;
}