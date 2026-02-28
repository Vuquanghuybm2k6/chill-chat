
module.exports = async(io) =>{
  _io.on('connection',(socket)=>{
    console.log('a user connected', socket.id)
  })
}