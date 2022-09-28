using Dapper;
using EducationalSoftwareServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EducationalSoftwareServer
{
    public static class ChapterRepository
    {
        private static DapperContext _context = new DapperContext();

        public static List<Chapter> GetAllChapters()
        {
            var chaptersQuery = @"SELECT * FROM CHAPTERS";

            using (var connection = _context.CreateConnection())
            {
                var chapters = connection.Query<Chapter>(chaptersQuery).ToList();
                return chapters;
            }
           
        }

        public static void CreateNewChapter(Chapter chapter)
        {
            var chapterQuery = @"INSERT INTO CHAPTERS (PdfLink, Description, PhotoLink)
                          OUTPUT  inserted.*
                          VALUES(@PdfLink,@Description,@PhotoLink)";

            using (var connection = _context.CreateConnection())
            {
                connection.Query<Chapter>(chapterQuery,new {PdfLink = chapter.PdfLink, Description = chapter.Description, PhotoLink = chapter.PhotoLink });
            }
        }
    }
}
