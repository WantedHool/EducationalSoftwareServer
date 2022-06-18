using Dapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EducationalSoftwareServer
{
    public static class Repository
    {
        private static DapperContext _context = new DapperContext();
        public static User LoginUser(string username)
        {
            User user = null;
            try
            {

                var query = @"SELECT * FROM  Users  WHERE Username = @Username";
                using (var connection = _context.CreateConnection())
                {
                    var data = connection.Query<User>(query, new { Username = username });
                    user = data.ToList()[0];
                    return user;
                }
            }
            catch (Exception e)
            {
                user = null;
                return user;
            }

        }
        //public static bool RegisterPatient(RegisterPatientModel patient)
        //{
        //    try
        //    {
        //        User user = null;
        //        var query1 = @"
        //                IF NOT EXISTS (SELECT * FROM  Users  WHERE Username = @Username) AND NOT EXISTS (SELECT * FROM  Patients  WHERE AMKA = @AMKA)
        //                BEGIN
        //                    INSERT INTO Users (Username, Role) 
        //                    OUTPUT  inserted.* 
        //                    VALUES(
        //                    @Username,
        //                    @Role)
        //                END";
        //        using (var connection = _context.CreateConnection())
        //        {
        //            var data = connection.Query<User>(query1, new { Username = patient.Username, Role = Role.Patient, AMKA = patient.AMKA });
        //            if (data.ToList().Count == 0)
        //                return false;
        //            user = data.ToList()[0];
        //            patient.UserID = user.Id;
        //        }

        //        var query2 = @" IF NOT EXISTS (SELECT * FROM  Patients  WHERE AMKA = @AMKA)
        //                BEGIN
        //                    INSERT INTO Patients (AMKA, UserID, Name, Surname) 
        //                    OUTPUT  inserted.* 
        //                    values (
        //                    @AMKA,
        //                    @UserID,
        //                    @Name,
        //                    @Surname)
        //                END";
        //        using (var connection = _context.CreateConnection())
        //        {
        //            Patient pat = null;
        //            var data = connection.Query<Patient>(query2, new { AMKA = patient.AMKA, UserID = patient.UserID, Name = patient.Name, Surname = patient.Surname });
        //            if (data.ToList().Count == 0)
        //                return false;
        //            pat = data.ToList()[0];
        //        }
        //        return true;
        //    }
        //    catch (Exception e)
        //    {
        //        return false;
        //    }
        //}
    }
}
