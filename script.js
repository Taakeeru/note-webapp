
function newStyle() {
    document.getElementById('searchbarBtn').classList.add('newStyle');
    document.getElementById('searchbar').classList.add('newStyle');
    console.log('added')
}

function oldStyle() {
    document.getElementById('searchbarBtn').classList.remove('newStyle');
    document.getElementById('searchbar').classList.remove('newStyle');
    console.log('removed')
}