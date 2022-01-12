document.getElementById("formList").addEventListener("submit",crear);

function crear(e){
    codigo = document.getElementById("productCode").value;
    nombre = document.getElementById("product").value;
    cantidad = document.getElementById("qty").value;
    precio = document.getElementById("perPrice").value;

    let producto = {
        codigo,
        nombre,
        cantidad,
        precio
    }


    if (localStorage.getItem("Datos")=== null){
        let productos = [];
        productos.push(producto);
        localStorage.setItem("Datos", JSON.stringify(productos));
    }else{
        let productos = JSON.parse(localStorage.getItem("Datos"));
        productos.push(producto);
        localStorage.setItem("Datos",JSON.stringify(productos));
    }

    leer();
    document.getElementById("formList").reset();
    e.preventDefault();

}

function leer(){
    let productos = JSON.parse(localStorage.getItem("Datos"));
    document.getElementById("tbody").innerHTML = ""
    for(let i=0; i<productos.length; i++){
        let codigo = productos[i].codigo
        let nombre = productos[i].nombre
        let cantidad = productos[i].cantidad
        let precio = productos[i].precio

        document.getElementById("tbody").innerHTML +=
        `<tr>
            <td>${codigo}</td>
            <td>${nombre}</td>
            <td>${cantidad}</td>
            <td>${precio}</td>

            <td> <button class="eliminar" onClick ="eliminar('${codigo}')"> Eliminar</button></td>
            <td> <button class="editar" onClick ="editar('${codigo}')"> Editar</button></td>

        
        </tr>`

    }
}

function editar(codigo){
    let productos= JSON.parse(localStorage.getItem("Datos"));
    for (let i=0; i<productos.length; i++){
        if(productos[i].codigo === codigo){
            document.getElementById("container").innerHTML=
            ` <tr>
            <td>
                <form autocomplete="off" onsubmit="onFormSubmit()" id="formList">
                    <div>
                        <label for="productCode">Codigo del Producto</label>
                        <input type="text" name="productCode" id="newproductCode">
                    </div>
                    <div>
                        <label for="product">Nombre del Producto</label>
                        <input type="text" name="product" id="newproduct">
                    </div>
                    <div>
                        <label for="qty">Cantidad del Producto</label>
                        <input type="number" name="qty" id="newqty">
                    </div>
                    <div>
                        <label for="perPrice">Precio por Producto</label>
                        <input type="number" name="perPrice" id="newperPrice">
                    </div>
                </form>

                <button class="actualizar" type="submit" onClick ="actualizar('${i}')"> Actualizar </button>
                <button class="cancelar" type="submit" onClick ="vista()"> Cancelar </button>

                <td>
                    <table class="list" id="storeList">
                        <thead>
                            <tr>
                                <th>Codigo del Producto</th>
                                <th>Nombre del Producto</th>
                                <th>Cantidad del Producto</th>
                                <th>Precio por Producto</th>
                            </tr>
                        </thead>
                        <tbody id="tbody">

                        </tbody>
                    </table>
                </td>
            </td>
        </tr>`
        }
    }
}

function actualizar(i){
    let productos = JSON.parse(localStorage.getItem("Datos"));
    productos[i].codigo = document.getElementById("newproductCode").value;
    productos[i].nombre = document.getElementById("newproduct").value;
    productos[i].cantidad = document.getElementById("newqty").value;
    productos[i].precio = document.getElementById("newperPrice").value;
    if(productos[i].codigo==""){
        alert("Ingrese un codigo del producto");
    }else{
        if(productos[i].nombre == ""){
            alert("Ingrese un mobre del producto");
        }else{
            if(productos[i].cantidad==""){
                alert("Ingrese la cantidad del producto");
            }else{
                if(productos[i].precio==""){
                    alert("Ingrese un precio del producto");
                }else{
                    localStorage.setItem("Datos", JSON.stringify(productos));
                }

            }
        }
    }
    localStorage.setItem("Datos",JSON.stringify(productos));
    vista();
}

function eliminar(codigo){
    let productos = JSON.parse(localStorage.getItem("Datos"));
    for(let i=0; i<productos.length; i++){
        if(productos[i].codigo===codigo){
            productos.splice(i,1);
        }
    }
    localStorage.setItem("Datos", JSON.stringify(productos));
    leer();
}

function vista(){
    document.getElementById("container").innerHTML = 
    `<tr>
    <td>
        <form autocomplete="off" onsubmit="onFormSubmit()" id="formList">
            <div>
                <label for="productCode">Codigo del Producto</label>
                <input type="text" name="productCode" id="productCode">
            </div>
            <div>
                <label for="product">Nombre del Producto</label>
                <input type="text" name="product" id="product">
            </div>
            <div>
                <label for="qty">Cantidad del Producto</label>
                <input type="number" name="qty" id="qty">
            </div>
            <div>
                <label for="perPrice">Precio por Producto</label>
                <input type="number" name="perPrice" id="perPrice">
            </div>

            <div class="form_action--button">
                <input type="submit" value="enviar" id="enviar">
                <input type="reset" value="reiniciar" id="reiniciar">
            </div>
        </form>
        <td>
            <table class="list" id="storeList">
                <thead>
                    <tr>
                        <th>Codigo del Producto</th>
                        <th>Nombre del Producto</th>
                        <th>Cantidad del Producto</th>
                        <th>Precio por Producto</th>
                    </tr>
                </thead>
                <tbody id="tbody">

                </tbody>
            </table>
        </td>
    </td>
</tr>`
leer();
}

leer();

function limpiar(){
    document.getElementById('productCode').value = '';
    document.getElementById('product').value = '';
    document.getElementById('qty').value = '';
    document.getElementById('perPrice').value = '';
}