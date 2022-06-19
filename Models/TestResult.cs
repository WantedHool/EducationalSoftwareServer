using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EducationalSoftwareServer.Models
{
    public class TestResult
    {
        public int TestResultId { get; set; }
        public int StudentId { get; set; }
        public int TestId { get; set; }
        public float TotalGrade { get; set; }
    }
}
