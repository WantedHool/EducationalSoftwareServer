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

            var questionAnswersQuery = @"INSERT INTO QUESTIONANSWERS
                          OUTPUT  inserted.*
                          VALUES(@QuestionId,@Answer,@IsRight)";

            using (var connection = _context.CreateConnection())
            {
                var createdTest = connection.Query<Test>(testQuery, new { Description = test.Description, ChapterId = test.ChapterId, Class = test.Class, Active = test.Active }).FirstOrDefault();
                foreach(var question in test.Questions)
                {
                    var createdQuestion = connection.Query<Question>(questionsQuery, new {Description = question.Description, TestId = createdTest.TestId, Type = question.Type, Category = question.Category}).FirstOrDefault();
                    foreach(var questionAnswer in question.QuestionAnswers)
                    {
                        connection.Query<QuestionAnswer>(questionAnswersQuery, new {QuestionId = createdQuestion.QuestionId, Answer = questionAnswer.Answer, IsRight = questionAnswer.IsRight });
                    }
                }
            }
        }

        public static List<Test> GetTestsByTeacherId(int teacherId)
        {
            var testQuery = @"SELECT * FROM TESTS WHERE TeacherId = @TeacherId";
            using (var connection = _context.CreateConnection())
            {
                return connection.Query<Test>(testQuery, new { TeacherId = teacherId}).ToList();
            }
        }
        #endregion

        public static Test GetTestById(int testId)
        {
            var testQuery = @"SELECT * FROM TESTS WHERE TestId = @TestId";

            var questionsQuery = @"SELECT * FROM QUESTIONS WHERE TestId = @TestId";

            var questionAnswersQuery = @"SELECT * FROM QUESTIONANSWERS WHERE QuestionId = @QuestionId";

            var test = new Test();

            using (var connection = _context.CreateConnection())
            {
                test = connection.Query<Test>(testQuery, new {TestId = testId}).FirstOrDefault();
                
                test.Questions = connection.Query<Question>(questionsQuery, new { TestId = testId }).ToList();

                foreach (var question in test.Questions)
                {
                    question.QuestionAnswers = connection.Query<QuestionAnswer>(questionAnswersQuery, new {QuestionId = question.QuestionId}).ToList();
                }               
            }
            return test;
        }
        #region StudentOperations
        public static List<Test> GetTestsByClass(int studentClass)
        {
            var testQuery = @"SELECT * FROM TESTS WHERE Class = @Class AND Active = 'true'";
            using (var connection = _context.CreateConnection())
            {
               return connection.Query<Test>(testQuery, new { Class = studentClass }).ToList();
            }
        }

        public static TestResult AnswerTest(List<StudentAnswer> studentAnswers)
        {
            var answersQuery = @"INSERT INTO STUDENTANSWERS
                          OUTPUT  inserted.*
                          VALUES(@TestId,@StudentId,@QuestionId,@StudentResult)";

            var testResultQuery = @"INSERT INTO TESTRESULTS
                          OUTPUT  inserted.*
                          VALUES(@StudentId,@TestId,@TotalGrade)";

            using (var connection = _context.CreateConnection())
            {
                var test = GetTestById(studentAnswers[0].TestId);
                var rightAnswers = new List<StudentAnswer>();
                var wrongAnswers = new List<StudentAnswer>();
                foreach (var studentAnswer in studentAnswers)
                {
                    var question = test.Questions.Where(x => x.QuestionId == studentAnswer.QuestionId).FirstOrDefault();
                    if (question.QuestionAnswers.Any(x => x.Answer == studentAnswer.StudentResult && x.IsRight))
                        rightAnswers.Add(studentAnswer);
                    else
                        wrongAnswers.Add(studentAnswer);

                    connection.Query<StudentAnswer>(answersQuery,
                    new { TestId = studentAnswer.TestId, StudentId = studentAnswer.StudentId, QuestionId = studentAnswer.QuestionId, StudentResult = studentAnswer.StudentResult})
                        .ToList();
                }

                float totalGrade = (rightAnswers.Count() * 100) / studentAnswers.Count();

                return connection.Query<TestResult>(testResultQuery,
                       new { StudentId = studentAnswers[0].StudentId, TestId = studentAnswers[0].TestId,  TotalGrade = totalGrade }).FirstOrDefault();
            }
        }
        #endregion
        private static void CheckIfStudentTest(List<StudentAnswer> wrongAnswers, List<StudentAnswer> rightAnswers , List<Question> questions)
        {
            var wrongAnswersExtra = wrongAnswers.Join(questions, wrongAnswer => wrongAnswer.QuestionId, question => question.QuestionId, (wrongAnswer, question) => question);

            var rightAnswersExtra = rightAnswers.Join(questions, rightAnswer => rightAnswer.QuestionId, question => question.QuestionId, (rightAnswer, question) => question);

            var kati = wrongAnswersExtra.GroupBy(x => x.Category).ToList();

            var kati2 = rightAnswersExtra.GroupBy(x => x.Category).ToList();


            kati.ForEach(x =>
            {
                bool needHelp;
                var kamposa = kati2.Where(y => y.Key == x.Key).FirstOrDefault();

                var athroisma = x.Count() + kamposa.Count();
                if (x.Count() * 100 / athroisma > 50)
                    needHelp = true;
                    //todo Insert to table in which Student needs help

            });
        }
    }
}
