using API.Models;
using API.RepositoryContext;
using Dapper;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using System.Configuration;
using System.Data;
using Microsoft.Extensions.Configuration;

namespace API.Repository.Data
{
    public class EmployeeRepository : GeneralRepository<Employee, myContext>
    {
        DynamicParameters parameters = new DynamicParameters();
        IConfiguration _configuration { get; }

        public EmployeeRepository(myContext myContexts, IConfiguration configuration) : base(myContexts)
        {
            _configuration = configuration;
        }

        public async Task<IEnumerable<EmployeeVM>> GetAll()
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("MyNetCoreConnection")))
            {
                var procName = "SP_ViewEmp";
                var employees = await connection.QueryAsync<EmployeeVM>(procName, commandType: CommandType.StoredProcedure);
                return employees;
            }
        }

        public async Task<IEnumerable<EmployeeVM>> GetById(int Id)
        {
            using (var connection = new SqlConnection(_configuration.GetConnectionString("MyNetCoreConnection")))
            {
                var procName = "SP_GetEmpById";
                parameters.Add("@Id", Id);
                var employees = await connection.QueryAsync<EmployeeVM>(procName, parameters, commandType: CommandType.StoredProcedure);
                return employees;
            }
        }
    }
}
