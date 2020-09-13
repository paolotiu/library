let myLibrary = JSON.parse(localStorage.getItem('myLibrary'));


//dont show table if no books
function hideTable(){
    let table = document.querySelector('table')
    
    if(myLibrary.length == 0){
        
        table.style.display = 'none'
    }
    else{
        table.style.display = 'table'
    }
}

function Book(title,author,pages,read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        return `${title} by ${author}, ${pages} pages, ${(read==true) ? 'not read yet' : 'has been read'}`
    }
}

function addBookToLibrary(){
    let title = document.getElementById('title').value;
    let author = document.getElementById('author').value;
    let pages = document.getElementById('pages').value;
    let read = document.getElementsByName('read');

    read.forEach((item) => {
        if (item.checked){
            read = item.value;

            if (read == 'notRead'){
                read = 'No';
            }
            else if (read == 'read'){
                read = 'Yes';
            }
        }   
    })

    if(typeof(read) == 'object'){
        read = '';
    }
    

    if(checkIfComplete(title, author, pages, read)){
        return;
    }
    

    

    let book = new Book(title, author, pages, read)
    myLibrary.push(book)
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    hideTable();
    render();

    clearForm();
    
}

function checkIfComplete(title, author, pages, read){
    if(title == '' || author == '' || pages == '' || read == ''){
        
        alert ('please fill in')
        return true;
    }
    return false;
    
}

function showForm(){
    let form = document.querySelector('.form')
    if(form.style.display == 'none'){
        form.style.display = 'block';
    }
    else{
        form.style.display = 'none';
    }
    
}

function clearForm(){
    let form = document.querySelector('.form');
    form.reset();
    form.style.display = 'none' 
}

function render(){
    let table = document.querySelector('.tablebody')
    table.innerHTML = ''
    
    let counter = 1;
    myLibrary.forEach((item) => {
        console.log(item)
        let count = counter;
        let data = item;
        //checkbox
        let check = document.createElement('INPUT');
        check.type = 'checkbox';
        check.onclick = () => changeRead(data);
        if (item.read == 'Yes'){
            check.checked = true;
        }

        //delete button
        let deleteButton = document.createElement('BUTTON');
        deleteButton.innerText = 'Delete'
        deleteButton.onclick = () => deleteFromTable(count);


        //adding rows and cells
        let row = table.insertRow(0)
        row.id = counter;
        let title = row.insertCell(0);
        let author = row.insertCell(1);
        let pages = row.insertCell(2);
        title.innerHTML = item.title;
        author.innerHTML = item.author;
        pages.innerHTML = item.pages;
        row.appendChild(document.createElement('td'))
        row.appendChild(document.createElement('td'))
        row.cells[3].appendChild(check)

        row.cells[4].appendChild(deleteButton)
        counter++;
    })

    
}

function deleteFromTable(counter){
    let row = document.getElementById(counter);
    row.parentNode.removeChild(row);
    myLibrary.splice(counter-1,1);
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    hideTable();
}

function changeRead(item){
    if(item.read == 'Yes'){
        item.read = 'No';
    }
    else{
        item.read = "Yes";
    }

    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}
// let testBook = new Book('hey', 'test', 100, true)
// myLibrary.push(testBook)
render();
hideTable();



