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
    public class ChapterController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAllChapters()
        {
            return Ok(ChapterRepository.GetAllChapters());
        }
        [HttpPost]
        public IActionResult CreateNewTest([FromBody] Chapter chapter)
        {
            ChapterRepository.CreateNewChapter(chapter);
            return Ok();
        }
    }
}
