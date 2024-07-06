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
    const dropdownContent = $('<div>').addClass('dropdown-content');
    
    subject.links.forEach(link => {
        const anchor = $('<a>').attr('href', link.url).text(link.label);
        dropdownContent.append(anchor);
    });

    return dropdownContent;
}

// Function to generate subject items and their dropdowns
async function generateSubjectItems() {
    const subjectList = $('#subjectList');
    const subjects = await fetchSubjects();

    subjects.forEach(subject => {
        const subjectCard = $('<span>').addClass('subject-card');
        const subjectName = $('<span>').addClass('subject-name').text(subject.name);
        const subjectIcon = $('<img>').addClass('subject-icon').attr('src', subject.icon);
        const subjectBoard = $('<div>').addClass('subject-board').text(subject.board);
        const subjectInfo = $('<div>').addClass('subject-info');
        const subjectCode = $('<span>').addClass('subject-code').text(subject.code);
        const subjectLevel = $('<span>').addClass('subject-level').text(subject.level);

        if (subject.level.toUpperCase() === 'AS') {
            subjectLevel.css('background-color', '#8809a1');
        } else if (subject.level.toUpperCase() === 'A2') {
            subjectLevel.css('background-color', '#057a40');
        } else {
            subjectLevel.css('background-color', '#AF0000');
        }

        if (subject.board.toUpperCase() === 'CAIE') {
            subjectBoard.css('background-color', '#4CAF50');
        } else if (subject.board.toUpperCase() === 'UKMT') {
            subjectBoard.css('background-color', '#F00050');
        }

        subjectCard.append(subjectBoard, subjectIcon, subjectName, subjectInfo);
        subjectInfo.append(subjectCode, subjectLevel, generateSubjectDropdown(subject));

        subjectList.append(subjectCard);
    });
}

// Call the function to generate subject items and their dropdowns
generateSubjectItems();

// Function to filter subjects based on user input
function filterSubjects() {
    const input = $('#searchInput').val().toUpperCase();
    $('.subject-card').each(function() {
        const subjectName = $(this).find('.subject-name').text().toUpperCase();
        const subjectCode = $(this).find('.subject-code').text().toUpperCase();

        if (subjectName.includes(input) || subjectCode.includes(input)) {
            $(this).css('display', 'inline-block');
        } else {
            $(this).css('display', 'none');
        }
    });
}

// Event listener for input changes in the search bar
$('#searchInput').on('input', filterSubjects);
