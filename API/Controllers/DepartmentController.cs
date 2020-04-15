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
        public DepartmentController(DepartmentRepository departmentRepository) : base (departmentRepository)
        {
                
        }
    }
}