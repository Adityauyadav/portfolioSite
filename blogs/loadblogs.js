async function loadBlogs() {
    try {
        let response = await fetch("blogs.json");
        let blogs = await response.json();
        
        let table = document.getElementById("blog-list");
        
        blogs.forEach(blog => {
            let row = document.createElement("tr");
            row.innerHTML = `<td>${blog.date}</td><td><a href="posts/${blog.file}">${blog.title}</a></td>`;
            table.appendChild(row);
        });

    

    } catch (error) {
        console.error("Error loading blogs:", error);
    }
}


loadBlogs();


document.addEventListener("DOMContentLoaded", function () {
    const imgElement = document.getElementById("header-image");
    const titleElement = document.getElementById("art-title");
    const artistElement = document.getElementById("art-artist");
    const dateElement = document.getElementById("art-date");
    const creditLink = document.getElementById("art-link");


    const metObjectID = imgElement.getAttribute("data-object-id");

    if (metObjectID) {

        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${metObjectID}`)
            .then(response => response.json())
            .then(data => {
                if (data.primaryImage) {
                    imgElement.src = data.primaryImage;
                    imgElement.alt = data.title || "MET Museum Artwork";
                } else {
                    imgElement.src = "../under-progress/working-img.png"; 
                }

            
                titleElement.innerText = data.title || "Untitled";
                artistElement.innerText = data.artistDisplayName || "Unknown Artist";
                dateElement.innerText = data.objectDate || "Unknown Date";
                creditLink.href = `https://www.metmuseum.org/art/collection/search/${metObjectID}`;
                creditLink.innerHTML = "MET Museum Public Domain &#8599;";
            })
            .catch(error => {
                console.error("Error fetching image from MET Museum API:", error);
                imgElement.src = "../header-images/default.jpg"; 
            });
    } else {
        console.error("No data-object-id found in the header image.");
    }
});