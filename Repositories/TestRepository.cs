using Dapper;
using EducationalSoftwareServer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EducationalSoftwareServer
{
    public static class TestRepository
    {
        private static DapperContext _context = new DapperContext();

        #region TeacherOperations
        public static void CreateTest(Test test)
        {
            var testQuery = @"INSERT INTO TESTS
                          OUTPUT  inserted.*
                          VALUES(@Description,@ChapterId,@Class,@Active)";

            var questionsQuery = @"INSERT INTO QUESTIONS
                          OUTPUT  inserted.*
                          VALUES(@Description,@TestId,@Type,@Category)";

            var questionAnswersQuery = @"INSERT INTO QUESTIONS
                          OUTPUT  inserted.*
                          VALUES(@Description,@QuestionId,@Answer,@IsRight)";

            using (var connection = _context.CreateConnection())
            {
                var createdTest = connection.Query<Test>(testQuery, new { Description = test.Description, ChapterId = test.ChapterId, Class = test.Class, Active = test.Active }).FirstOrDefault();
                foreach(var question in test.Questions)
                {
                    var createdQuestion = connection.Query<Question>(questionsQuery, new {Description = question.Description, TestId = createdTest.TeacherId, Type = question.Type, Category = question.Category}).FirstOrDefault();
                    foreach(var questionAnswer in question.QuestionAnswers)
                    {
                        connection.Query<QuestionAnswer>(questionAnswersQuery, new { Description = questionAnswer.Answer, QuestionId = createdQuestion.QuestionId, Answer = questionAnswer.Answer, IsRight = questionAnswer.IsRight });
                    }
                }
            }
        }
        #endregion

        //public static GetTestById(int testId)
        //{
        //    var testQuery = @"SELECT * FROM TESTS WHERE TestId = @TestId";

        //    var questionsQuery = @"SELECT * FROM QUESTIONS WHERE TestId = @TestId";

        //    var questionAnswersQuery = @"SELECT * FROM QUESTIONANSWERS WHERE QuestionId = @QuestionId";
        //}
    }
}
