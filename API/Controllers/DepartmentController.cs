using System;
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
    public class DepartmentController : BasesController<Department, DepartmentRepository>
    {
        private readonly DepartmentRepository _repository;
        public DepartmentController(DepartmentRepository departmentRepository) : base (departmentRepository)
        {
            this._repository = departmentRepository;
        }

        [HttpGet]
        public async Task<ActionResult<Department>> Get()
        {
            var get = await _repository.Get();
            return Ok(new { data = get });
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Department>> Put(int id, Department entity)
        {
            //if (id != entity.Id)
            //{
            //    return BadRequest();
            //}
            var put = await _repository.Get(id);
            if (put == null)
            {
                return NotFound();
            }
            put.Name = entity.Name;
            put.UpdateDate = DateTimeOffset.Now;
            await _repository.Put(put);
            return Ok("Update Successfully");
        }
    }
}