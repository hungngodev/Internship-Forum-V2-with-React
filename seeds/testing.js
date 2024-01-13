function getStateFromLocation(location) {
    // Regular expression to match state abbreviations
    const stateAbbreviationRegex = /\b([A-Za-z]{2})\b/;

    // Extract state abbreviation from the location string
    const match = location.match(stateAbbreviationRegex);

    // Check if a match is found
    if (match && match[1]) {
        // If found, return the state abbreviation in uppercase
        return match[1].toUpperCase();
    } else {
        // If not found, return null or any default value as needed
        return null;
    }
}

// Example usage:
const locationString = "San Jose, CA";
const stateAbbreviation = getStateFromLocation(locationString);

if (stateAbbreviation !== null) {
    console.log(`The state abbreviation for '${locationString}' is '${stateAbbreviation}'.`);
} else {
    console.log(`No state abbreviation found in '${locationString}'.`);
}

