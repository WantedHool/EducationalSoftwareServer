using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;

namespace EducationalSoftwareServer
{
    public class DapperContext
    {
        private string _connectionString = "Data Source=.;Initial Catalog=EducationalSoftware;Integrated Security=True";
        public DapperContext(/*IConfiguration configuration*/)
        {
            //OnConfiguring();
            //_configuration = configuration;
            //_connectionString = _configuration.GetConnectionString("SqlConnection");
        }
        //protected void OnConfiguring()
        //{
        //    IConfigurationRoot configuration = new ConfigurationBuilder()
        //        .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
        //        .AddJsonFile("appsettings.json")
        //        .Build();
        //    _connectionString = configuration.GetConnectionString("DefaultConnection");
        //}
        public IDbConnection CreateConnection()
            => new SqlConnection(_connectionString);
    }
}