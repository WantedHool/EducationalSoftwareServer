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
        [HttpGet]
        [Route("{studentId}")]
        public IActionResult GetTestResultsByStudentId(int studentId)
        {
            return Ok(TestRepository.GetTestResultsByStudentId(studentId));
        }
        [HttpGet]
        [Route("{class}")]
        public IActionResult GetStudentsGrades(string schoolClass)
        {
            return Ok(TestRepository.GetStudentGrades(schoolClass));
        }
        [HttpGet]
        [Route("{class}")]
        public IActionResult GetAnsweredTests (string schoolClass)
        {
            return Ok(TestRepository.GetStudentGrades(schoolClass));
        }
        [HttpGet]
        [Route("{studentId}")]
        public IActionResult GetAllTestsFiltered(int studentId)
        {
            return Ok(TestRepository.GetAllTestsFiltered(studentId));
        }

        [HttpGet]
        [Route("{testId}")]
        public IActionResult GetTestById(int testId)
        {
            return Ok(TestRepository.GetTestById(testId));
        }
    }
}
