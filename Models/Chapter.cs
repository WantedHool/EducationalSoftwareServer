using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EducationalSoftwareServer.Models
{
    public class Chapter
    {
        public int ChapterId { get; set; }
        public string Description { get; set; }
        public string PdfLink { get; set; }
        public string PhotoLink { get; set; }

    }
}
