//GET

function getDatosRoom() {
    $.ajax({
    url: "https://g04f0fd84bc0ce0-db202109251901.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room",
      type: "GET", //tipo de accion
    datatype: "JSON",
    success: function (respuesta) {
        console.log(respuesta);
        pintarRespuestaRoom(respuesta.items);
    },
    });
}

function pintarRespuestaRoom(items) {
    let myTable = "<table>"; //let es un tipo variable y crear tabla
    for (i = 0; i < items.length; i++) {
    myTable += "<tr>"; //crear fila
    myTable += "<td>" + items[i].id + "</td>"; // tabla room
    myTable += "<td>" + items[i].room + "</td>";
    myTable += "<td>" + items[i].stars + "</td>";
    myTable += "<td>" + items[i].category_id + "</td>";
    myTable += "<td>" + items[i].description + "</td>";
    myTable +=
        "<td> <button onclick='borrarRoom(" + items[i].id + ")'>Borrar</button>";
    myTable +=
        "<td><button onclick='obtenerItemEspecificoroom(" +
        items[i].id +
        ")'>Cargar</button></td>";
      myTable += "</tr>"; //cerrar fila
    }
    myTable += "</table>"; //cerrar tabla
    $("#resultadoRoom").append(myTable);
}

function guardarRoom() {
    let myData = {
    id: $("#id").val(),
    room: $("#room").val(),
    stars: $("#stars").val(),
    category_id: $("#category_id").val(),
    description: $("#description").val(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
    url: "https://g04f0fd84bc0ce0-db202109251901.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room",
    type: "POST",
    data: myData,
    datatype: "JSON",
    success: function (respuesta) {
        $("#resultadoRoom").empty();
        $("#id").val("");
        $("#room").val("");
        $("#stars").val("");
        $("#category_id").val("");
        $("#description").val("");
        getDatosRoom();
        alert("se ha guardado el dato");
    },
    });
}

  //PUT

function editarRoom() {
    let myData = {
    id: $("#id").val(),
    room: $("#room").val(),
    stars: $("#stars").val(),
    category_id: $("#category_id").val(),
    description: $("#description").val(),
    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
    url: "https://g04f0fd84bc0ce0-db202109251901.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room",
    type: "PUT",
    data: dataToSend,
    contentType: "application/JSON",
    datatype: "JSON",
    success: function (respuesta) {
        $("#resultadoRoom").empty();
        $("#id").val("");
        $("#room").val("");
        $("#stars").val("");
        $("#category_id").val("");
        $("#description").val("");
        getDatosRoom();
        alert("se ha actualizado");
    },
    });
}

  //DELETE

function borrarRoom(idElemento) {
    let myData = {
    id: idElemento,
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
    url: "https://g04f0fd84bc0ce0-db202109251901.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room",
    type: "DELETE",
    data: dataToSend,
    contentType: "application/JSON",
    datatype: "JSON",
    success: function (respuesta) {
        $("#resultadoRoom").empty();
        getDatosRoom();
        alert("Se ha Eliminado.");
    },
    });
}

function obtenerItemEspecificoroom(items) {
    console.log("---- obtenerItemEspecificoroom items:", items);
    $.ajax({
    dataType: "json",
    url: "https://g04f0fd84bc0ce0-db202109251901.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/room/room/" + items,
    type: "GET",
    success: function (response) {
        console.log("---- obtenerItemEspecificoroom", response);
        var item = response.items[0];
        $("#id").val(item.id);
        $("#room").val(item.room);
        $("#stars").val(item.stars);
        $("#category_id").val(item.category_id);
        $("#description").val(item.description);
    },

    error: function (jqXHR, textStatus, errorThrown) {},
    });
}
