async function getPrototypes() {
    let url = 'api/prototypes.json';

    try {
        let response = await fetch(url);
        return await response.json();
    } catch(error) {
        console.log(error);
    }
}

async function renderPrototypes() {
    let prototypes = await getPrototypes();
    let html = '';
    prototypes.prototypes.forEach(prototype => {
        let htmlSegment = `<li>${prototype.name}</li>`;
        html += htmlSegment;
    });

    let prototypesContainer = document.querySelector('.prototypesContainer');
    prototypesContainer.innerHTML = html;
}

renderPrototypes();