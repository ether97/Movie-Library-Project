const openFileButton = document.querySelector('.btn-three');
const table = document.querySelector('.table');
const specific_table = document.querySelector('.table1');

window.addEventListener('contextmenu', (event) => {
    event.preventDefault()
});

openFileButton.onclick = async() => {
    const dirHandle = await window.showDirectoryPicker(); 
    let favoriteMovies = [];

    try {
        const response = await fetch("http://localhost:5000/movies");
        const jsonData = await response.json();
        for await (const movie of jsonData) {
            favoriteMovies.push(movie);
        }
    } catch(err) {
        console.error(err.message);
    }
    let movieNames = [];
    for await (const movie of favoriteMovies) {
        movieNames.push(movie.name);
        var newRow = specific_table.insertRow();
        var newCell = newRow.insertCell();
        var newText = document.createTextNode(movie.name);
        newCell.className = 'cell';
        var secondCell = newRow.insertCell();
        var secondText = document.createTextNode(movie.type);
        newCell.appendChild(newText);
        secondCell.appendChild(secondText);
        newCell.addEventListener('contextmenu', async (e) => {
            e.target.style.backgroundImage = 'linear-gradient(to right, black, red)';
                color = false;
                console.log('hi');
                const response = await fetch("http://localhost:5000/movies", {
                    method: "DELETE",
                    headers: {"Content-type":"application/json"},
                    body: JSON.stringify({"name":e.target.innerHTML})
                })
                console.log(e.target.parentElement.rowIndex);
                specific_table.deleteRow(e.target.parentElement.rowIndex);
        })
}
    console.log(movieNames);
        for await (const entry of dirHandle.values()) {
            let color = false;
            if ((entry.name.slice(entry.name.length-3) === ' BR' || entry.name.slice(entry.name.length-3) === 'DVD') && !(movieNames.includes(entry.name.substring(0,entry.name.length-5)))){
                var name = entry.name;
                var newRow = table.insertRow();
                var newCell = newRow.insertCell();
                var newText = document.createTextNode(name.substring(0,name.length-5));
                newCell.className = 'cell';
                var secondCell = newRow.insertCell();
                var secondText = document.createTextNode(name.slice(name.length - 3));
                newCell.appendChild(newText);
                secondCell.appendChild(secondText);
                    newCell.onclick = async function(e) {
                        if (!color) { 
                            color = true;
                            e.target.style.backgroundImage = 'linear-gradient(to right, black, greenyellow)';
                            e.target.style.color = 'white';
                            const response = await fetch("http://localhost:5000/movies", {
                                method: "POST",
                                headers: {"Content-type":"application/json"},
                                body: JSON.stringify({"name":e.target.innerHTML, "type":e.target.parentElement.lastElementChild.innerHTML})
                            });
                            console.log(e.target.parentElement.lastElementChild.innerHTML);
                            table.deleteRow(e.target.parentElement.rowIndex);
                            let row = document.createElement('tr');
                            let html = e.target.innerHTML;
                            let type = e.target.parentElement.lastElementChild.innerHTML;
                            row.innerHTML = '<th style="width: 80%; text-align: left; font-weight: 500">' + html + '</th>' + '<th style="font-weight:500">' + type + '</th>'
                            specific_table.appendChild(row);
                        } 
                    }               
                console.log(entry)
            } else {
                continue;
            }
        }
}