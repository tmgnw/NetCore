﻿$(document).ready(function () {
    table = $('#Department').dataTable({
        "ajax": {
            url: "/Department/LoadDepartment",
            type: "GET",
            dataType : "json"
        },
        "columnDefs": [{
            "targets": [3],
            "orderable": false
        }],
        //dom: 'Bfrtip',
        //buttons: [
        //    'csv', 'excel', 'pdf'
        //],
        "columns": [
            { "data": "name","name" : "name"},
            {
                "data": "CreateDate", "render": function (data) {
                    return moment(data).format('DD MMMM YYYY, h:mm a');
                }
            },
            {
                "data": "updateDate", "render": function (data) {
                    var dateupdate = "Not Updated Yet";
                    var nulldate = null;
                    if (data == nulldate) {
                        return dateupdate;
                    } else {
                        return moment(data).format('DD MMMM YYYY, h:mm a');
                    }
                }
            },
            {
                data: null, render: function (data, type, row) {
                    return " <td><button type='button' class='btn btn-warning' id='Update' onclick=GetById('" + row.id + "');>Edit</button> <button type='button' class='btn btn-danger' id='Delete' onclick=Delete('" + row.id + "');>Delete</button ></td >";
                }
            },
        ]
    });
});
//------------------------------------------------------------//
document.getElementById("Add").addEventListener("click", function () {
    $('#Id').val('');
    $('#Name').val('');
    $('#Save').show();
    $('#Update').hide();
});
//------------------------------------------------------------//
function GetById(Id) {
    $.ajax({
        url: "/Department/GetById/" + Id,
        type: "GET",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (result) {
            //const obj = JSON.parse(result);
            $('#Id').val(result.id);
            $('#Name').val(result.name);
            $('#myModal').modal('show');
            $('#Update').show();
            $('#Save').hide();
        },
        error: function (errormessage) {
            alert(errormessage.responseText)
        }
    });
}
//------------------------------------------------------------//
function Save() {
    $.fn.dataTable.ext.errMode = 'none';
    var table = $('#Department').DataTable({
        "ajax": {
            url: "/Department/LoadDepartment"
        }
    });
    var Department = new Object();
    Department.Name = $('#Name').val();
    if ($('#Name').val() == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Name Cannot be Empty',
        })
        return false;
    } else {
        $.ajax({
            type: 'POST',
            url: '/Department/InsertOrUpdate',
            data: Department,
        }).then((result) => {
            if (result.statusCode == 201) {
                Swal.fire({
                    icon: 'success',
                    potition: 'center',
                    title: 'Department Add Successfully',
                    timer: 2000
                }).then(function () {
                    table.ajax.reload();
                    $('#myModal').modal('hide');
                    $('#Id').val('');
                    $('#Name').val('');
                });
            }
            else {
                Swal.fire('Error', 'Failed to Add', 'error');
            }
        })
    }
}
//------------------------------------------------------------//
function Edit() {
    $.fn.dataTable.ext.errMode = 'none';
    var table = $('#Department').DataTable({
        "ajax": {
            url: "/Department/LoadDepartment"
        }
    });
    var Department = new Object();
    Department.Id = $('#Id').val();
    Department.Name = $('#Name').val();
    $.ajax({
        type: 'POST',
        url: '/Department/InsertOrUpdate',
        data: Department
    }).then((result) => {
        if (result.statusCode == 200) {
            Swal.fire({
                icon: 'success',
                potition: 'center',
                title: 'Department Update Successfully',
                timer: 2500
            }).then(function () {
                table.ajax.reload();
                $('#myModal').modal('hide');
                $('#Id').val('');
                $('#Name').val('');
            });
        } else {
            Swal.fire('Error', 'Failed to Update', 'error');
        }
    })
}
//------------------------------------------------------------//
function Delete(Id) {
    $.fn.dataTable.ext.errMode = 'none';
    var table = $('#Department').DataTable({
        "ajax": {
            url: "/Department/LoadDepartment"
        }
    });
    Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!"
    }).then((result) => {
        if (result.value) {
            $.ajax({
                url: "/Department/Delete/",
                data: { Id: Id }
            }).then((result) => {
                if (result.statusCode == 200) {
                    Swal.fire({
                        icon: 'success',
                        position: 'center',
                        title: 'Delete Successfully',
                        timer: 2000
                    }).then(function () {
                        table.ajax.reload();
                        $('#myModal').modal('hide');
                        $('#Id').val('');
                        $('#Name').val('');
                    });
                }
                else {
                    Swal.fire({
                        icon: 'error',
                        title: 'error',
                        text: 'Failed to Delete',
                    })
                }
            })
        }
    });
}