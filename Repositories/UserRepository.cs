using Dapper;
using EducationalSoftwareServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EducationalSoftwareServer
{
    public static class UserRepository
    {
        private static DapperContext _context = new DapperContext();
        public static User Login(User user)
        {
            var existingUser = GetByUsername(user.Username);
            if (existingUser != null)
            {
                AddToLoginCount(existingUser);
                return user.Password == existingUser.Password ? existingUser : throw new Exception("Username or password is wrong!");
            }

            throw new Exception("Username or password is wrong!");
        }

        public static void RegisterStudent(Student student)
        {
            if (GetByUsername(student.Username) != null)
                throw new Exception("User already exists!");

            var userQuery = @"INSERT INTO USERS
                          OUTPUT  inserted.*
                          VALUES(@Username,@Password,@UserType)";

            var studentQuery = @"INSERT INTO STUDENTS
                          OUTPUT  inserted.*
                          VALUES(@UserId,@FirstName,@LastName,@Class)";

            using (var connection = _context.CreateConnection())
            {
                var user = connection.Query<User>(userQuery, new { Username = student.Username, Password = student.Password, UserType = UserType.Student }).FirstOrDefault();
                student.UserId = user.UserId;
                connection.Query<Student>(studentQuery, new { UserId = user.UserId, FirstName = student.FirstName,LastName = student.LastName, Class = student.Class}).FirstOrDefault();
            }
        }

        public static Student GetStudentByUserId(int userId)
        {
            var query = @"SELECT * FROM USERS 
                          INNER JOIN STUDENTS ON Users.UserId = Students.UserId
                          WHERE Students.UserId = @UserId";

            using (var connection = _context.CreateConnection())
            {
                return connection.Query<Student>(query, new { UserId = userId }).FirstOrDefault();
            }
        }

        public static List<Student> GetAllStudents()
        {
            var query = @"SELECT * FROM STUDENTS";
            using (var connection = _context.CreateConnection())
            {
                return connection.Query<Student>(query).ToList();
            }

        }

        public static Teacher GetTeacherByUserId(int userId)
        {
            var query = @"SELECT * FROM USERS 
                          INNER JOIN TEACHERS ON Users.UserId = Teachers.UserId
                          WHERE UserId = @UserId";

            using (var connection = _context.CreateConnection())
            {
                return connection.Query<Teacher>(query, new { UserId = userId }).FirstOrDefault();
            }
        }

        private static User GetByUsername(string username)
        {          
            var query = @"SELECT * FROM  Users  WHERE Username = @Username";
            var data = new User();

            using (var connection = _context.CreateConnection())
            {
                data = connection.Query<User>(query, new { Username = username }).FirstOrDefault();                  
            }
            return data != null ? data : null;
        }

        private static void AddToLoginCount(User user)
        {
            var query = "Update Users Set LoginsCount = @LoginsCount Where UserId = @UserId";
            using (var connection = _context.CreateConnection())
            {
                connection.Query<User>(query, new {LoginsCount = user.LoginsCount + 1 ,UserId = user.UserId}).FirstOrDefault();
            }

        }
    }
}
