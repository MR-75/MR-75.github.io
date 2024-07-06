// Function to fetch subjects from JSON file
async function fetchSubjects() {
    try {
        const response = await fetch('subjects.json');
        const subjects = await response.json();
        return subjects;
    } catch (error) {
        console.error('Error fetching subjects:', error);
        return [];
    }
}

        // Function to generate the dropdown content for each subject
        function generateSubjectDropdown(subject) {
            // Create a new <div> element to serve as the container for the dropdown menu
            const dropdownContent = document.createElement('div');
            // Add a CSS class to the dropdown container to style it
            dropdownContent.classList.add('dropdown-content');
            
            // Iterate over each link associated with the subject
            subject.links.forEach(link => {
                // Create a new <a> (anchor) element for each link
                const anchor = document.createElement('a');
                // Set the href attribute of the anchor element to the URL specified in the link object
                anchor.href = link.url;
                // Set the text content of the anchor element to the label specified in the link object
                anchor.textContent = link.label;
                // Append the anchor element to the dropdown container
                dropdownContent.appendChild(anchor);
            });
            // Return the dropdown container with all the links
            return dropdownContent;
        }

        // Function to generate subject items and their dropdowns
        async function generateSubjectItems() {
            // Get the <ul> element with the ID 'subjectList'
            const subjectList = document.getElementById('subjectList');
            // Fetch subjects data asynchronously and wait for the response
            const subjects = await fetchSubjects();

            // Iterate over each subject retrieved from the fetchSubjects function
            subjects.forEach(subject => {
                // Create a new <li> element for each subject
                const subjectCard = document.createElement('span');
                // Add a CSS class to the <li> element for styling purposes
                subjectCard.classList.add('subject-card');
                // Create a new <a> (anchor) element for the subject link
                const subjectName = document.createElement('span');
                subjectName.classList.add('subject-name');

                const subjectIconSpan = document.createElement('span');
                subjectIconSpan.classList.add('subject-icon-span');
                const subjectIcon = document.createElement('img');
                subjectIcon.classList.add('subject-icon');
                const subjectBoard = document.createElement('div');
                subjectBoard.classList.add('subject-board');
                const subjectInfo = document.createElement('div');
                subjectInfo.classList.add('subject-info');
                const subjectCode = document.createElement('span');
                subjectCode.classList.add('subject-code');
                const subjectLevel = document.createElement('span');
                subjectLevel.classList.add('subject-level');
                // Add a CSS class to the anchor element for styling purposes
                subjectName.classList.add('subject-name');
                // Set the text content of the anchor element to the subject name
                subjectName.textContent = subject.name;
                subjectBoard.textContent = subject.board;
                subjectCode.textContent = subject.code;
                subjectLevel.textContent = subject.level;
                subjectIcon.src = subject.icon;

                if (subject.level.toUpperCase() === 'AS') {
                    subjectLevel.style.backgroundColor = '#8809a1'; // Purple color for AS level
                } else if (subject.level.toUpperCase() === 'A2') {
                    subjectLevel.style.backgroundColor = '#057a40'; // Green color for A2 level
                } else {
                    subjectLevel.style.backgroundColor = '#AF0000';
                    // Handle other cases if needed
                }
                if (subject.board.toUpperCase() === 'CAIE'){
                    subjectBoard.style.backgroundColor = '#4CAF50';
                } else if (subject.board.toUpperCase() === 'UKMT'){
                    subjectBoard.style.backgroundColor = '#F00050';

                } else {

                }
                

                // Generate the dropdown menu for the subject and append it to the <li> element
                subjectCard.appendChild(subjectBoard);
                subjectIconSpan.appendChild(subjectIcon)
                subjectCard.appendChild(subjectIconSpan);
                subjectCard.appendChild(subjectName);
                subjectCard.appendChild(subjectInfo);
                subjectInfo.appendChild(subjectCode);
                subjectInfo.appendChild(subjectLevel);
                // Generate the dropdown menu for the subject and append it to the <li> element
                subjectCard.appendChild(generateSubjectDropdown(subject));

                // Append the <li> element (subject item with dropdown) to the <ul> element
                subjectList.appendChild(subjectCard);
            });
        }

        // Call the function to generate subject items and their dropdowns
        generateSubjectItems();
// Function to filter subjects based on user input
function filterSubjects() {
    const input = document.getElementById('searchInput').value.toUpperCase();
    const subjects = document.querySelectorAll('.subject-card');

    subjects.forEach(subject => {
        const subjectName = subject.querySelector('.subject-name').textContent.toUpperCase();
        const subjectCode = subject.querySelector('.subject-code').textContent.toUpperCase();

        console.log("Subject Name:", subjectName);
        console.log("Subject Code:", subjectCode);

        if (subjectName.includes(input) || subjectCode.includes(input)) {
            console.log("Match found for:", input);
            subject.style.display = 'inline-block'; // Show the subject card
        } else {
            console.log("No match found for:", input);
            subject.style.display = 'none'; // Hide the subject card if the name or code doesn't match
        }
    });
}



 
// Event listener for input changes in the search bar
document.getElementById('searchInput').addEventListener('input', filterSubjects);

//http://127.0.0.1:5500/Notess/index.html