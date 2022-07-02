using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EducationalSoftwareServer.Models
{
    public class LearningDifficulty
    {
        public int LearningDifficultyId { get; set; }
        public int StudentId { get; set; }
        public string Category { get; set; }
        public int TestId { get; set; }
    }
}
