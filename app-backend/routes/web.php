<?php

use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Auth\VerificationController;
use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CourseContentController;
use App\Http\Controllers\CourseContentTypeController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseInteractiveElementController;
use App\Http\Controllers\CourseSubscriptionController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\ForumCategoryController;
use App\Http\Controllers\ForumPostController;
use App\Http\Controllers\ForumThreadController;
use App\Http\Controllers\ForumThreadLikeController;
use App\Http\Controllers\JournalController;
use App\Http\Controllers\LessonController;
use App\Http\Controllers\LibraryPageController;
use App\Http\Controllers\LibraryPageModuleController;
use App\Http\Controllers\MailTemplateController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuestionOptionController;
use App\Http\Controllers\QuestionTopicController;
use App\Http\Controllers\QuestionTypeController;
use App\Http\Controllers\QuizController;
use App\Http\Controllers\ResponseController;
use App\Http\Controllers\SysConfigController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserFavoriteController;
use Illuminate\Routing\Router;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group([
    'prefix' => '/backend',
], function (Router $router) {

    $router->middleware('throttle:auth')->group(function (Router $router) {
        $router->post('/register',                                      [AuthController::class, 'register']);
        $router->post('/login',                                         [AuthController::class, 'login']);
        $router->post('/forgot/email',                                  [ForgotPasswordController::class, 'sendResetLinkEmail']);
        $router->post('/forgot/reset',                                  [ResetPasswordController::class, 'reset']);

        $router->post('/admin/login',                                   [AuthController::class, 'adminLogin']);
    });

    $router->get('storage/{folderName}/{filename}',                     [MediaController::class, 'showMedia']);

    $router->get('/journals/autoUpdate',                                [JournalController::class, 'autoUpdateJournalData']);
    $router->get('/news/autoUpdate',                                    [NewsController::class, 'autoUpdateNews']);

    $router->get('/llm/health',                                         [ChatbotController::class, 'health']);
    $router->get('/llm/topic',                                          [QuestionTopicController::class, 'generate']);
    $router->get('/llm/question',                                       [QuestionController::class, 'generateRandom']);
    $router->post('/chatbot',                                           [ChatbotController::class, 'chat']);

    $router->get('/front/comments/{id}',                                [ForumThreadController::class, 'showComments']);
    $router->post('/front/register',                                    [UserController::class, 'frontRegister']);
    $router->post('/front/contacts',                                    [ContactController::class, 'frontStore']);
    $router->get('/front/faqs',                                         [FaqController::class, 'getAll']);
    $router->get('/front/post/category',                                [ForumCategoryController::class, 'getAll']);
    $router->post('/front/post/create',                                 [ForumThreadController::class, 'frontStore']);
    $router->post('/front/post/comment',                                [ForumPostController::class, 'frontStore']);
    $router->post('/front/quiz/create',                                 [QuizController::class, 'assemble']);

    // Authenticated Routes
    $router->group(['middleware' => 'auth:api'], function (Router $router) {

        $router->post('/logout',                                        [AuthController::class, 'logout']);
        $router->get('/email/verify',                                   [VerificationController::class, 'verify'])->name('verification.verify');
        $router->post('quiz/{id}/submit',                               [QuizController::class, 'evaluateQuiz']);
        $router->post('quiz/{id}/save-progress',                        [QuizController::class, 'saveProgress']);
        $router->post('quiz/{id}/questions',                            [QuizController::class, 'getQuizInfo']);

        $router->get('profile/quizzes',                                 [QuizController::class, 'getUserQuizDashboard']);
        $router->get('profile/favorites',                               [UserFavoriteController::class, 'getFavoritePages']);
        $router->get('profile/courses',                                 [CourseSubscriptionController::class, 'getUserCoursesDashboard']);

        $router->post('questions/{id}',                                 [QuestionController::class, 'update']);
        $router->post('courses/{id}',                                   [CourseController::class, 'update']);

        $router->resources([
            'users' =>                                                  UserController::class,
            'faqs' =>                                                   FaqController::class,
            'news' =>                                                   NewsController::class,
            'contacts' =>                                               ContactController::class,
            'mail_templates' =>                                         MailTemplateController::class,
            'forum_categories' =>                                       ForumCategoryController::class,
            'forum_threads' =>                                          ForumThreadController::class,
            'forum_posts' =>                                            ForumPostController::class,
            'sys_configs' =>                                            SysConfigController::class,
            'journals' =>                                               JournalController::class,
            'question_topics' =>                                        QuestionTopicController::class,
            'question_types' =>                                         QuestionTypeController::class,
            'questions' =>                                              QuestionController::class,
            'question_options' =>                                       QuestionOptionController::class,
            'quizzes' =>                                                QuizController::class,
            'responses' =>                                              ResponseController::class,
            'library_pages' =>                                          LibraryPageController::class,
            'library_page_modules' =>                                   LibraryPageModuleController::class,
            'courses' =>                                                CourseController::class,
            'lessons' =>                                                LessonController::class,
            'course_content_types' =>                                   CourseContentTypeController::class,
            'course_interactive_elements' =>                            CourseInteractiveElementController::class,
            'course_contents' =>                                        CourseContentController::class,
        ]);

        $router->get('front/news',                                      [NewsController::class, 'getAll']);
        $router->get('front/journals',                                  [JournalController::class, 'getAll']);

        $router->get('front/library',                                   [LibraryPageController::class, 'getAll']);
        $router->get('front/library/{id}',                              [LibraryPageController::class, 'showPage']);
        $router->post('library/favorites',                              [UserFavoriteController::class, 'storeLibraryFavorite']);

        $router->post('forum_threads/{thread}/like',                    [ForumThreadLikeController::class, 'like']);
        $router->delete('forum_threads/{thread}/like',                  [ForumThreadLikeController::class, 'unlike']);

        $router->get('/front/courses',                                  [CourseController::class, 'getAll']);
        $router->get('/front/courses/{id}',                             [CourseController::class, 'getContent']);

        $router->post('/front/profile/password',                        [UserController::class, 'changePassword']);
        $router->post('/front/courses/manage/{id}',                     [CourseSubscriptionController::class, 'manageSubscription']);
    });
});

Route::redirect('/', '/backend');
