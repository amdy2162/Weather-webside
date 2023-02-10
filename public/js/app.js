console.log('Clicnt side javascript file is loaded');



const weatherFrom = document.querySelector('.weatherFrom');
const search = document.querySelector('.weatherInput');
const MessageOne = document.querySelector('.MessageOne');
const MessageTwo = document.querySelector('.MessageTwo');
// Msg.textContent = 'From JavaScript';

console.log(search.value);
weatherFrom.addEventListener('submit', (e) => {
    e.preventDefault();
    MessageOne.textContent = 'Loading...';
    MessageTwo.textContent= '';
    const location = search.value;
    fetch('http://localhost:3000/weather?address='+ location ).then((res) => {
    res.json().then((data) => {
        if(data.error) {
            // console.log(data.error);
            MessageOne.textContent = data.error;
        } else {
         
            MessageOne.textContent = data[0].forecast;
            MessageTwo.textContent = data[0].loaction;
            console.log(data[0].forecast);
            console.log(data[0].loaction);
        }
        
    })
})
})