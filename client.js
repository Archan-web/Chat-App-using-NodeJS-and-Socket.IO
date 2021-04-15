const socket=io('http://localhost:8000',{ transports: ['websocket', 'polling', 'flashsocket'] });

const form=document.getElementById('inputForm');
const messageInp=document.getElementById('text');
const messageCont=document.getElementById('container');
const audio= new Audio('ping.mp3');

const name=prompt("Enter your name to join !");

socket.emit('new-user-joined',name);

const append=(message,position)=>{
    const newMessage=document.createElement('h4');
    newMessage.innerText=message;
    newMessage.classList.add('messages');
    newMessage.classList.add(position);
    messageCont.append(newMessage);
    if(position==="received" || position=="center") audio.play();
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    const entMsg=messageInp.value;
    if(entMsg!=""){
        append(`You: ${messageInp.value}`,"mine");
        messageInp.value="";
        socket.emit('send',entMsg);
    }
})

socket.on('user-joined',name=>{
    append(`${name} joined the chat.`,"center");
})

socket.on('receive',data=>{
    append(`${data.name}: ${data.message}`,"received");
})

socket.on('left',name=>{
    append(`${name} left the chat.`,'center')
})