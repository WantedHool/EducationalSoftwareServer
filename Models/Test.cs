using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EducationalSoftwareServer.Models
{
    public class Test
    {
        public int TestId { get; set; }
        public int ChapterId { get; set; }
        public int TeacherId { get; set; }
        public string Description { get; set; }
        public int Class { get; set; }
        public bool Active { get; set; }
        public List<Question> Questions { get; set; }
    }
}
