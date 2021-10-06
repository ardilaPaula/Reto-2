//GET

function getDatosMessage() {
    $.ajax({
        url: "https://g04f0fd84bc0ce0-db202109251901.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type: "GET", //tipo de accion
        datatype: "JSON",
        success: function (respuesta) {
        console.log(respuesta);
        pintarRespuestaMessage(respuesta.items);
        },
    });
}

function pintarRespuestaMessage(items) {
    let myTable = "<table>"; //let es un tipo variable y crear tabla
    for (i = 0; i < items.length; i++) {
        myTable += "<tr>"; //crear fila
        myTable += "<td>" + items[i].id + "</td>"; // tabla room
        myTable += "<td>" + items[i].messagetext + "</td>";
        myTable +="<td> <button onclick='borrarMessage(" + items[i].id + ")'>Borrar</button>";
        myTable +="<td><button onclick='obtenerItemEspecificoMessage(" +items[i].id +")'>Cargar</button></td>";
        myTable += "</tr>"; //cerrar fila
    }
    myTable += "</table>"; //cerrar tabla
    $("#resultadoMessage").append(myTable);
}

function guardarMessage() {
    let myData = {
        id: $("#id_message").val(),
        messagetext: $("#messagetext").val(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "https://g04f0fd84bc0ce0-db202109251901.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type: "POST",
        data: myData,
        datatype: "JSON",
        success: function (respuesta) {
        $("#resultadoMessage").empty();
        $("#id_message").val("");
        $("#messagetext").val("");
        getDatosMessage();
        alert("se ha guardado el dato");
        },
    });
}

  //PUT

function editarMessage() {
    let myData = {
        id: $("#id_message").val(),
        messagetext: $("#messagetext").val(),
    };
    console.log(myData);
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "https://g04f0fd84bc0ce0-db202109251901.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type: "PUT",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
        $("#resultadoMessage").empty();
        $("#id_message").val("");
        $("#messagetext").val("");
        
        
        alert("se ha actualizado");
        },
    });
}

  //DELETE

function borrarMessage(idElemento) {
    let myData = {
        id: idElemento,
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
        url: "https://g04f0fd84bc0ce0-db202109251901.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message",
        type: "DELETE",
        data: dataToSend,
        contentType: "application/JSON",
        datatype: "JSON",
        success: function (respuesta) {
        $("#resultadoMessage").empty();
        getDatosMessage();
        alert("Se ha Eliminado.");
        },
    });
}

function obtenerItemEspecificoMessage(items) {
    console.log("---- obtenerItemEspecificoMessage items:", items);
    $.ajax({
        dataType: "json",
        url: "https://g04f0fd84bc0ce0-db202109251901.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message/" + items,
        type: "GET",
        success: function (response) {
        console.log("---- obtenerItemEspecificoMessage", response);
        var item = response.items[0];
        $("#id_message").val(item.id);
        $("#messagetext").val(item.messagetext);
        },

        error: function (jqXHR, textStatus, errorThrown) {},
    });
}