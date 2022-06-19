using EducationalSoftwareServer.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EducationalSoftwareServer.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpPost]
        public IActionResult CreateTest([FromBody] Test test)
        {
            TestRepository.CreateTest(test);
            return Ok(test);
        }
        [HttpPost]
        public IActionResult AnswerTest([FromBody] List<StudentAnswer> studentAnswers)
        {
            var testResult = TestRepository.AnswerTest(studentAnswers);
            return Ok(testResult);
        }
        [HttpGet]
        [Route("{studentClass}")]
        public IActionResult GetTestsByClass(int studentClass)
        {
            return Ok(TestRepository.GetTestsByClass(studentClass));
        }
        [HttpGet]
        [Route("{teacherId}")]
        public IActionResult GetTestsByTeacherId(int teacherId)
        {
            return Ok(TestRepository.GetTestsByTeacherId(teacherId));
        }


    }
}
