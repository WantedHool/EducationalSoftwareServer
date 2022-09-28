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

        public static List<StudentGrade> GetStudentGrades(string schoolClass)
        {
            var resultsQuery = @"SELECT * FROM TESTRESULTS";
            var studentGrades = new List<StudentGrade>();
            using (var connection = _context.CreateConnection())
            {
                var results = connection.Query<TestResult>(resultsQuery).GroupBy(x => x.StudentId).ToList();
                results.ForEach(x =>
                {
                    studentGrades.Add(new StudentGrade() {StudentId = x.Key, TotalGrade = x.Sum(i => i.TotalGrade) / x.Count()});
                });
                return studentGrades;
            }
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

        public static List<TestResult> GetTestResultsByStudentId(int studentId)
        {
            var resultsQuery = @"SELECT * FROM TESTRESULTS WHERE StudentId = @StudentId";
            using (var connection = _context.CreateConnection())
            {
                return connection.Query<TestResult>(resultsQuery, new { StudentId = studentId }).ToList();
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
                CheckIfStudentTest(wrongAnswers, rightAnswers, test.Questions);

                return connection.Query<TestResult>(testResultQuery,
                       new { StudentId = studentAnswers[0].StudentId, TestId = studentAnswers[0].TestId,  TotalGrade = totalGrade }).FirstOrDefault();
            }
        }

        public static List<Test> GetAllTestsFiltered(int studentId)
        {
            var tests = GetTestsByClass(1);
            var answeredTestIds = GetTestResultsByStudentId(studentId).Select(x => x.TestId).ToList();
            return tests.Where(x => !answeredTestIds.Contains(x.TestId) && x.Active).ToList();
        }
        #endregion
        public static Test GenerateLearningDifficultyTest(int testId, string category)
        {
            var questions = GetQuestionsByCategory(category);

            var test = GetTestById(testId);

            test.Questions = questions.Take(10).ToList();
            return test;

        }
        public static List<Question> GetQuestionsByCategory(string category)
        {
            var questionsQuery = @"SELECT * FROM QUESTIONS WHERE Category = @Category";

            var questionAnswersQuery = @"SELECT * FROM QUESTIONANSWERS WHERE QuestionId = @QuestionId";

            using (var connection = _context.CreateConnection())
            {
                var questions =  connection.Query<Question>(questionsQuery,
                       new { Category = category}).Where(y => y.TestId == null).ToList();

                questions.ForEach(q =>
                {
                    q.QuestionAnswers = connection.Query<QuestionAnswer>(questionAnswersQuery,
                       new { QuestionId = q.QuestionId}).ToList();
                });
                return questions;
            }
        }
        private static void CheckIfStudentTest(List<StudentAnswer> wrongAnswers, List<StudentAnswer> rightAnswers , List<Question> questions)
        {
            var wrongAnswersExtra = wrongAnswers.Join(questions, wrongAnswer => wrongAnswer.QuestionId, question => question.QuestionId, (wrongAnswer, question) => question);

            var rightAnswersExtra = rightAnswers.Join(questions, rightAnswer => rightAnswer.QuestionId, question => question.QuestionId, (rightAnswer, question) => question);

            var categories = new List<string>() { "A", "B", "C" };

            categories.ForEach(c =>
            {
                var catWrongAnswers = wrongAnswersExtra.Where(x => x.Category == c);
                var catRightAnswers = rightAnswersExtra.Where(x => x.Category == c);

                if(catWrongAnswers.Count() > catRightAnswers.Count())
                {
                    var learningDifficultiesQuery = @"INSERT INTO LEARNINGDIFFICULTIES
                          OUTPUT  inserted.*
                          VALUES(@StudentId,@Category,@TestId)";

                    var learningDifficultyTestQuery = @"INSERT INTO TESTS (Description,Active,StudentId) 
                          OUTPUT  inserted.*
                          VALUES(@Description,@Active,@StudentId)";
                    using (var connection = _context.CreateConnection())
                    {
                        var test = connection.Query<Test>(learningDifficultyTestQuery,
                        new { Description = "kati", Active = true, StudentId = rightAnswers[0].StudentId }).FirstOrDefault();

                        connection.Query<LearningDifficulty>(learningDifficultiesQuery,
                        new { StudentId = rightAnswers[0].StudentId, Category = c, TestId = test.TestId });

                        
                    }

                }
            });

        }
    }
}
