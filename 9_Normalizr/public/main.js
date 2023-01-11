const socket = io();

const handleTime = (savedTime, savedDate) => {
  const actualTime = Date.now();
  const secondDiff = Math.floor(Math.abs(actualTime - savedTime) / 1000);

  if (secondDiff > 60 * 60 * 60) return `${savedDate}`;

  if (secondDiff < 60) {
    return `${secondDiff}s`;
  } else if (secondDiff < 60 * 60) {
    return `${Math.floor(secondDiff / 60)}m`;
  } else {
    return `${Math.floor(secondDiff / (60 * 60))}h`;
  }
};

function addProduct() {
  const product = {
    title: document.getElementById("title").value,
    price: document.getElementById("price").value,
    thumbnail: "http://localhost:8080/img/1669216236775-shampoo.jpg",
  };

  socket.emit("new-product", product);
  return;
}

socket.on("products", (data) => {
  const table = `
  <tr class="grid grid-cols-3 gap-x-12 gap-y-8">
    <th>Titulo</th>
    <th>Precio</th>
    <th>Foto</th>
  </tr>`;

  const productList = data
    .map((product) => {
      return `
    <tr class="mt-4 grid grid-cols-3 gap-x-12 gap-y-12 bg-red-100 p-3 justify-items-center items-center">
      <td> ${product.title} </td>
      <td> ${product.price} </td>
      <td> <img class="w-12 h-12" src="${product.thumbnail}" alt="${product.title}"> </td>
    </tr>`;
    })
    .join(" ");

  document.getElementById("products").innerHTML = table + productList;
});

function addMessage(data) {
  console.log(data);
  const message = {
    email: document.getElementById("username").value,
    text: document.getElementById("text").value,
    name: "example name",
    lastname: "example lastname",
    age: "24",
    alias: "example alias",
    avatar: "example avatar",
    date: Date.now(),
  };

  socket.emit("new-message", message);
  return;
}

socket.on("messages", (dataNorm) => {
  const data = denormalize(dataNorm);
  document.getElementById("compression").innerText = dataNorm.compression;
  const messagesList = data
    .map((msj) => {
      const savedTime = new Date(msj.date);
      const savedDate = `${savedTime.getDate()}/${savedTime.getMonth()}`;
      const dinamicTime = handleTime(savedTime, savedDate);

      return `
    <div>
      <div class="flex items-center">
        <strong class="pr-2 text-lg">${msj.email}</strong>
        <p class="font-extralight text-sm">${dinamicTime}</p>
      </div>
      <em>${msj.text}</em>
    </div>`;
    })
    .join(" ");

  document.getElementById("messages").innerHTML = messagesList;
});

function denormalize(data) {
  const authorSchema = new normalizr.schema.Entity(
    "author",
    {},
    { idAttribute: "mail" }
  );

  const messageSchema = new normalizr.schema.Entity("message", {
    author: authorSchema,
  });

  const messagesSchema = new normalizr.schema.Entity("messages", {
    messages: [messageSchema],
  });

  return normalizr.denormalize(
    data.normalized.result,
    messagesSchema,
    data.normalized.entities
  );
}
