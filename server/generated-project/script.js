document.addEventListener('DOMContentLoaded', () => {
    const mainButton = document.getElementById('mainButton');

    if (mainButton) {
        mainButton.addEventListener('click', () => {
            alert('You clicked the button! This could trigger more actions.');
            console.log('Main button was clicked.');
            // Example of changing button text after click
            // mainButton.textContent = 'Action Initiated!';
            // mainButton.style.backgroundColor = '#28a745'; // Green
        });
    } else {
        console.error('Error: The main button with ID "mainButton" was not found.');
    }
});
