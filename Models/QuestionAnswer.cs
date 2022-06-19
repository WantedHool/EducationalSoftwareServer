using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EducationalSoftwareServer.Models
{
    public class QuestionAnswer
    {
        public int QuestionAnswerId { get; set; }
        public int QuestionId { get; set; }
        public string Answer { get; set; }
        public bool IsRight { get; set; }

    }
}
