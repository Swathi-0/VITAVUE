
const icon = [
    {
        image: 'https://vitavue.io/images/blood-test.png',
        name: 'Blood Glucose'
    },
    {
        image: 'https://vitavue.io/images/blood-pressure.png',
        name: 'Blood Pressure'
    },
    {
        image: 'https://vitavue.io/images/oxygen-saturation.png',
        name: 'Oxygen*'
    },
    {
        image: 'https://vitavue.io/images/heart-rate.png',
        name: 'Heart rate'
    },
];

const containerr = document.getElementById('primary-section-container');

icon.forEach(item => {
    const div = document.createElement('div');
    div.className = 'primary-section';

    const img = document.createElement('img');
    img.src = item.image;
    img.alt = 'icon-img';

    const h5 = document.createElement('h5');
    h5.textContent = item.name;

    div.appendChild(img);
    div.appendChild(h5);

    containerr.appendChild(div);
});
