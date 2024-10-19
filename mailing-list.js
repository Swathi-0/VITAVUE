function showDialog() {
    document.getElementById('popup').style.display = 'block';
    document.getElementById('main-container').classList.add('blur');
}

function closeDialog() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('main-container').classList.remove('blur');
}

function addToMailingList() {

    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const aboutYourself = document.getElementById('additional').value;
    const radioButtons = document.querySelectorAll('input[name="radio"]');
    let whereDidYouHearAboutUs = '';
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            whereDidYouHearAboutUs = radioButton.value;
            break;
        }
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Prepare API request body
    const requestBody = {
        name: name,
        email: email,
        phone: phone,
        aboutYourself: aboutYourself,
        whereDidYouHearAboutUs: whereDidYouHearAboutUs
    };

    // Make API call
    fetch('https://api.vitavue.io/api/emails/addToMailingList', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
        .then(response => response.json())
        .then(response => {
            if (response?.message === 'Email already exists') {
                alert('Email already exists in our mailing list.');
                return;
            }
            alert('Form submitted successfully!');
            document.getElementById('myForm').reset(); // Reset the form
            closeDialog(); // Close the dialog after successful submission
            console.log(response);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

// Restrict input to numbers only for phone field

// function toggleNav() {
//     const burger = document.querySelector('.menu-icon');
//     const navlink = document.querySelector('#menu');

//     if (!burger || !navlink) {
//         console.error('Burger or navlink element not found');
//         return;
//     }

//     burger.addEventListener('click', () => {
//         navlink.classList.toggle('active');
//     });
// }

// document.addEventListener('DOMContentLoaded', toggleNav);

let isMenuOpen = false;

document.getElementById('menuIcon').addEventListener('click', toggleNav);
document.getElementById('notifyButton').addEventListener('click', openDialog);

function toggleNav() {
    isMenuOpen = !isMenuOpen;
    const menuIcon = document.getElementById('menuIcon');
    menuIcon.classList.toggle('open');

    const menu = document.getElementById('menu');
    menu.classList.toggle('open');
}

function openDialog() {
    // Implement your dialog opening logic here
    // For simplicity, this example does not include the actual dialog implementation
    console.log('Opening dialog');
}


