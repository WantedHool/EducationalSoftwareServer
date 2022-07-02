using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EducationalSoftwareServer.Models
{
    public class Question
    {
        public int QuestionId { get; set; }
        public int? TestId { get; set; }
        public string Description { get; set; }
        public string Type { get; set; }
        public string Category { get; set; }
        public List<QuestionAnswer> QuestionAnswers { get; set; }

    }
}
