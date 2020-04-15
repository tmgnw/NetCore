using API.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.RepositoryContext
{
    public class myContext : IdentityDbContext
    {
        public myContext(DbContextOptions<myContext> options) : base(options) { }

        public DbSet<Department> department { get; set; }
        public DbSet<Employee> employee { get; set; }
    }
}
