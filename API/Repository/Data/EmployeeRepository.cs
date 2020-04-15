using API.Models;
using API.RepositoryContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Repository.Data
{
    public class EmployeeRepository : GeneralRepository<Employee, myContext>
    {
        public EmployeeRepository(myContext myContexts) : base(myContexts)
        {

        }
    }
}
