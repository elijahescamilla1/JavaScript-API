document.addEventListener("DOMContentLoaded", () => {
    const gallery = document.getElementById("gallery");
    const modal = document.getElementById("artModal");
    const closeModal = document.getElementsByClassName("close")[0];
    const artTitle = document.getElementById("artTitle");
    const artDescription = document.getElementById("artDescription");
    const artArtist = document.getElementById("artArtist");
    const artDate = document.getElementById("artDate");

    closeModal.onclick = () => {
        modal.style.display = "none";
    }

    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    const images = [
        "images/image1.jpg",
        "images/image2.jpg",
        "images/image3.jpg"
    ];

    const artworkUrls = [
        "https://api.artic.edu/api/v1/artworks/87479",
        "https://api.artic.edu/api/v1/artworks/21311",
        "https://api.artic.edu/api/v1/artworks/75644"
    ];

    // Function to fetch art data from the Chicago Art Institute API
    async function fetchArtData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data.data;
    }

    // Function to display art data
    async function displayArt() {
        for (let i = 0; i < artworkUrls.length; i++) {
            const art = await fetchArtData(artworkUrls[i]);
            const artDiv = document.createElement("div");
            artDiv.className = "art-piece";
            artDiv.innerHTML = `
                <img src="${images[i]}" alt="${art.title}">
                <h3>${art.title}</h3>
            `;
            artDiv.onclick = () => {
                artTitle.textContent = art.title;
                artDescription.textContent = art.thumbnail?.alt_text || "No description available.";
                artArtist.textContent = art.artist_title || "Unknown artist";
                artDate.textContent = art.date_display || "Unknown date";
                modal.style.display = "block";
            };
            gallery.appendChild(artDiv);
        }
    }

    // Fetch and display art data
    displayArt();
});
