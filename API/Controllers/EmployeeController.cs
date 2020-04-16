﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Base;
using API.Models;
using API.Repository.Data;
using API.RepositoryContext;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : BasesController<Employee, EmployeeRepository>
    {
        private readonly EmployeeRepository _repository;

        public EmployeeController(EmployeeRepository employeeRepository) : base(employeeRepository)
        {
            this._repository = employeeRepository;
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Employee>> Put(int id, Employee entity)
        {
            var put = await _repository.Get(id);
            if (put == null)
            {
                return NotFound();
            }
            put.FirstName = entity.FirstName;
            put.LastName = entity.LastName;
            put.Email = entity.Email;
            put.BirthDate = entity.BirthDate;
            put.PhoneNumber = entity.PhoneNumber;
            put.Address = entity.Address;
            put.UpdateDate = DateTimeOffset.Now;
            await _repository.Put(put);
            return Ok("Update Successfully");
        }
    }
}