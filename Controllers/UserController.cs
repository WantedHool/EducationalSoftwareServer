using EducationalSoftwareServer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Http.Cors;

namespace EducationalSoftwareServer.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [HttpPost]
        public IActionResult Login([FromBody] User user)
        {
            return Ok(UserRepository.Login(user));
        }

        [HttpPost]
        public IActionResult RegisterStudent([FromBody] Student student)
        {
            UserRepository.RegisterStudent(student);
            return Ok(student);
        }

        [HttpGet]
        [Route("{userId}")]
        public IActionResult GetStudentByUserId(int userId)
        {
            return Ok(UserRepository.GetStudentByUserId(userId));
        }

        [HttpGet]
        public IActionResult GetAllStudents(int userId)
        {
            return Ok(UserRepository.GetAllStudents());
        }

        [HttpGet]
        [Route("{userId}")]
        public IActionResult GetTeacherByUserId(int userId)
        {
            return Ok(UserRepository.GetTeacherByUserId(userId));
        }
    }
}
