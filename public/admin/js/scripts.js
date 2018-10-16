window.onload = () => {
    function getQuery() {
      var result = {};
      var keyValuePairs = location.search.slice(1).split("&");
  
      if (keyValuePairs[0] !== "") {
        keyValuePairs.forEach(valuePair => {
          valuePair = valuePair.split("=");
          result[decodeURIComponent(valuePair[0])] = decodeURIComponent(
            valuePair[1]
          );
        });
  
        return result;
      } else {
        return null;
      }
    }

    function login(user) {
        getUserByLogin(user.login)
        .then( data => {
            console.log(data);
            // argon2.verify(data.password, user.password).then(match => {
            //     if (match) {
            //       // password match
            //     } else {
            //       // password did not match
            //     }
            //   }).catch(err => {
            //     // internal failure
            //   }); 
        })
        .catch(console.error);
    }




// como utilizar funcoes async
  //  getProductById(1)
  //   .then(product => { /* o que fazer com o resultado */ })
  //   .catch(error => { /* o que fazer com o erro */ })
    function listProducts(products) {

        const li = document.getElementById("list-product");

        products.forEach(product => {
            const a = document.createElement("a");
            a.setAttribute("href", "#");
            a.setAttribute("class", "list-group-item list-group-item-action product-name");
            a.appendChild(document.createTextNode(product.name));
            a.addEventListener("click", function (e) {
                    e.preventDefault();
                    productPage(product.pid); //NOT DEFINED
                });
            
            const editButton = document.createElement("button");
            const deleteButton = document.createElement("button");

            editButton.setAttribute("class", "btn btn-secondary btn-sm product-btn-edit");
            editButton.appendChild(document.createTextNode("Editar"));

            deleteButton.setAttribute("class", "btn btn-secondary btn-sm product-btn-delete");
            deleteButton.appendChild(document.createTextNode("Excluir"));

            li.appendChild(a);
            li.appendChild(editButton);
            li.appendChild(deleteButton);
        });


    }

    getProducts()
    .then(products => {
        console.log("Produtos", products);
        listProducts(products);
    })
    .catch((err) => {
        console.log(err);
    });



};
  