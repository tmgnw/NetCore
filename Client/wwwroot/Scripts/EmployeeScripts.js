$(document).ready(function () {
    table = $('#Employee').dataTable({
        "ajax": {
            url: "/Employee/LoadEmployee",
            type: "GET",
            dataType: "json"
        },
        "columnDefs": [{
            "targets": [8],
            "orderable": false
        }],
        dom: 'Bfrtip',
        buttons: [
            'csv', 'excel', 'pdf'
        ],
        "columns": [
            //{ "data": "FullName" },
            { "data": "firstName" },
            { "data": "lastName" },
            { "data": "email" },
            {
                "data": "birthDate", "render": function (data) {
                    return moment(data).format('DD MMMM YYYY');
                }
            },
            { "data": "phoneNumber" },
            { "data": "address" },
            {
                "data": "createDate", "render": function (data) {
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
        url: "/Employee/GetById/" + Id,
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
    var table = $('#Employee').DataTable({
        "ajax": {
            url: "/Employee/LoadEmployee"
        }
    });
    var Employee = new Object();
    Employee.FirstName = $('#FirstName').val();
    Employee.LastName = $('#LastName').val();
    Employee.Email = $('#Email').val();
    Employee.BirthDate = $('#BirthDate').val();
    Employee.PhoneNumber = $('#PhoneNumber').val();
    Employee.Address = $('#Address').val();
    if ($('#FirstName').val() == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'FirstName Cannot be Empty',
        })
        return false;
    }
    else if ($('#LastName').val() == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'LastName Cannot be Empty',
        })
        return false;
    }
    else if ($('#Email').val() == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Email Cannot be Empty',
        })
        return false;
    }
    else if ($('#BirthDate').val() == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'BirthDate Cannot be Empty',
        })
        return false;
    }
    else if ($('#PhoneNumber').val() == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'PhoneNumber Cannot be Empty',
        })
        return false;
    }
    else if ($('#Address').val() == "") {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Address Cannot be Empty',
        })
        return false;
    } else {
        $.ajax({
            type: 'POST',
            url: '/Employee/InsertOrUpdate',
            data: Employee,
        }).then((result) => {
            if (result.statusCode == 201) {
                Swal.fire({
                    icon: 'success',
                    potition: 'center',
                    title: 'Employee Add Successfully',
                    timer: 2000
                }).then(function () {
                    table.ajax.reload();
                    $('#myModal').modal('hide');
                    $('#Id').val('');
                    $('#FirstName').val('');
                    $('#LastName').val();
                    $('#Email').val();
                    $('#BirthDate').val();
                    $('#PhoneNumber').val();
                    $('#Address').val();
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