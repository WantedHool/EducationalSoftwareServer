using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EducationalSoftwareServer.Models
{
    public class StudentAnswer
    {
        public int StudentAnswerId { get; set; }
        public int TestId { get; set; }
        public int StudentId { get; set; }
        public int QuestionId { get; set; }
        public string StudentResult { get; set; }
    }
}
