const socket = io()

function addProduct(data) {
  const product = {
    title: document.getElementById('title').value,
    price: document.getElementById('price').value,
    thumbnail: "http://localhost:8080/img/1669216236775-shampoo.jpg",
  }

  socket.emit('new-product', product)
  return
}

socket.on('products', (data) => {
  console.log(data)
  const table = `<tr class="grid grid-cols-3 gap-x-12 gap-y-8">
  <th>Titulo</th>
  <th>Precio</th>
  <th>Foto</th>
</tr>`
  const productList = data.map(product => {
    return `
    <tr class="mt-4 grid grid-cols-3 gap-x-12 gap-y-12 bg-red-100 p-3 justify-items-center items-center">
      <td> ${product.title} </td>
      <td> ${product.price} </td>
      <td> <img class="w-12 h-12" src="${product.thumbnail}" alt="${product.title}"> </td>
    </tr>`
  })
    .join(' ')
console.log(productList)
  document.getElementById('products').innerHTML = table + productList
})

function addMessage(data) {
  console.log(data)
  const message = {
    email: document.getElementById('username').value,
    text: document.getElementById('text').value,
    date: Date.now()
  }

  socket.emit('new-message', message)
  return
}

socket.on('messages', (data) => {
  const messagesList = data.map(msj => {
    return `<div>
    <div class="flex items-center">
      <strong class="pr-2 text-lg">${msj.email}</strong>
      <p class="font-extralight text-sm">${msj.date}</p>
    </div>
    <em>${msj.text}</em>
    </div>`
  })
    .join(' ')

  document.getElementById('messages').innerHTML = messagesList
})