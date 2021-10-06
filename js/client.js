 //GET

function getDatosClient() {
    $.ajax({
        url: "https://g04f0fd84bc0ce0-db202109251901.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type: "GET", //tipo de accion
        datatype: "JSON",
        success: function (respuesta) {
        console.log(respuesta);
        pintarRespuestaClient(respuesta.items);
        },
    });
}

function pintarRespuestaClient(items) {
    let myTable = "<table>"; //let es un tipo variable y crear tabla
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>"; //crear fila
        myTable += "<td>" + items[i].id + "</td>"; // tabla room
        myTable += "<td>" + items[i].name + "</td>";
        myTable += "<td>" + items[i].email + "</td>";
        myTable += "<td>" + items[i].age + "</td>";
        myTable +="<td> <button onclick='borrarClient(" + items[i].id + ")'>Borrar</button>";
        myTable +="<td><button onclick='obtenerItemEspecificoClient(" +items[i].id +")'>Cargar</button></td>";
        myTable += "</tr>"; //cerrar fila
    }
    myTable += "</table>"; //cerrar tabla
    $("#resultadoClient").append(myTable);
}

function guardarClient() {
    let myData = {
        id: $("#id_client").val(),
        name: $("#name").val(),
        email: $("#email").val(),
        age: $("#age").val(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "https://g04f0fd84bc0ce0-db202109251901.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type: "POST",
        data: myData,
        datatype: "JSON",
        success: function (respuesta) {
        $("#resultadoClient").empty();
        $("#id").val("");
        $("#name").val("");
        $("#email").val("");
        $("#age").val("");
        getDatosClient();
        alert("se ha guardado el dato");
        },
    });
}

  //PUT

function editarClient() {
    let myData = {
        id: $("#id_client").val(),
        name: $("#name").val(),
        email: $("#email").val(),
        age: $("#age").val(),
    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "https://g04f0fd84bc0ce0-db202109251901.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
        $("#resultadoRoom").empty();
        $("#id_client").val("");
        $("#name").val("");
        $("#email").val("");
        $("#age").val("");
        
        alert("se ha actualizado");
        },
    });
}

  //DELETE

function borrarClient(idElemento) {
    let myData = {
        id: idElemento,
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "https://g04f0fd84bc0ce0-db202109251901.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client",
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
        $("#resultadoClient").empty();
        getDatosClient();
        alert("Se ha Eliminado.");
        },
    });
}

function obtenerItemEspecificoClient(items) {
    console.log("---- obtenerItemEspecificoClient items:", items);
    $.ajax({
        dataType: "json",
        url: "https://g04f0fd84bc0ce0-db202109251901.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client/" + items,
        type: "GET",
        success: function (response) {
        console.log("---- obtenerItemEspecificoclient", response);
        var item = response.items[0];
        $("#id_client").val(item.id);
        $("#name").val(item.name);
        $("#email").val(item.email);
        $("#age").val(item.age);
        },

        error: function (jqXHR, textStatus, errorThrown) {},
    });
}
