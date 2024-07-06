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

function generateSubjectDropdown(subject) {
    const dropdownContent = $('<div>').addClass('dropdown-content');
    subject.links.forEach(link => {
        const anchor = $('<a>').attr('href', link.url).text(link.label);
        dropdownContent.append(anchor);
    });
    return dropdownContent;
}

async function generateSubjectItems() {
    const subjectList = $('#subjectList');
    const subjects = await fetchSubjects();
    subjects.forEach(subject => {
        const subjectCard = $('<span>').addClass('subject-card');
        const subjectName = $('<span>').addClass('subject-name').text(subject.name);
        const subjectIconSpan = $('<span>').addClass('subject-icon-span');
        const subjectIcon = $('<img>').addClass('subject-icon').attr('src', subject.icon);
        const subjectBoard = $('<div>').addClass('subject-board').text(subject.board);
        const subjectInfo = $('<div>').addClass('subject-info');
        const subjectCode = $('<span>').addClass('subject-code').text(subject.code);
        const subjectLevel = $('<span>').addClass('subject-level').text(subject.level);
        
        if (subject.level.toUpperCase() === 'AS') {
            subjectLevel.css('background-color', '#8809a1'); // Purple color for AS level
        } else if (subject.level.toUpperCase() === 'A2') {
            subjectLevel.css('background-color', '#057a40'); // Green color for A2 level
        } else {
            subjectLevel.css('background-color', '#AF0000');
        }
        if (subject.board.toUpperCase() === 'CAIE') {
            subjectBoard.css('background-color', '#4CAF50');
        } else if (subject.board.toUpperCase() === 'UKMT') {
            subjectBoard.css('background-color', '#F00050');
        }

        subjectCard.append(subjectBoard);
        subjectIconSpan.append(subjectIcon);
        subjectCard.append(subjectIconSpan);
        subjectCard.append(subjectName);
        subjectCard.append(subjectInfo);
        subjectInfo.append(subjectCode);
        subjectInfo.append(subjectLevel);
        subjectCard.append(generateSubjectDropdown(subject));
        subjectList.append(subjectCard);
    });
}

generateSubjectItems();

function filterSubjects() {
    const input = $('#searchInput').val().toUpperCase();
    const subjects = $('.subject-card');

    subjects.each(function() {
        const subjectName = $(this).find('.subject-name').text().toUpperCase();
        const subjectCode = $(this).find('.subject-code').text().toUpperCase();

        console.log("Subject Name:", subjectName);
        console.log("Subject Code:", subjectCode);

        if (subjectName.includes(input) || subjectCode.includes(input)) {
            console.log("Match found for:", input);
            $(this).css('display', 'inline-block'); // Show the subject card
        } else {
            console.log("No match found for:", input);
            $(this).css('display', 'none');
        }
    });
}

$('#searchInput').on('input', filterSubjects);
