<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ChatbotController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\CourseContentController;
use App\Http\Controllers\CourseContentTypeController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\CourseInteractiveElementController;
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
use App\Models\ForumCategory;
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
    // 'middleware' => 'auth'
], function (Router $router) {

    Route::get('storage/{folderName}/{filename}',   [MediaController::class, 'showMedia']);

    $router->get('/journals/autoUpdate',            [JournalController::class, 'autoUpdateJournalData']);
    // $router->get('/question/topics/generate',            [QuestionTopicController::class, 'generate']);

    $router->post('questions/{id}',                 [QuestionController::class, 'update']);
    $router->post('courses/{id}',                   [CourseController::class, 'update']);

    $router->resources([
        'users'                         => UserController::class,
        'faqs'                          => FaqController::class,
        'news'                          => NewsController::class,
        'contacts'                      => ContactController::class,
        'mail_templates'                => MailTemplateController::class,
        'forum_categories'              => ForumCategoryController::class,
        'forum_threads'                 => ForumThreadController::class,
        'forum_posts'                   => ForumPostController::class,
        'sys_configs'                   => SysConfigController::class,
        'journals'                      => JournalController::class,
        'question_topics'               => QuestionTopicController::class,
        'question_types'                => QuestionTypeController::class,
        'questions'                     => QuestionController::class,
        'question_options'              => QuestionOptionController::class,
        'quizzes'                       => QuizController::class,
        'responses'                     => ResponseController::class,
        'library_pages'                 => LibraryPageController::class,
        'library_page_modules'          => LibraryPageModuleController::class,
        'courses'                       => CourseController::class,
        'lessons'                       => LessonController::class,
        'course_content_types'          => CourseContentTypeController::class,
        'course_interactive_elements'   => CourseInteractiveElementController::class,
        'course_contents'               => CourseContentController::class,
    ]);

    $router->post('/admin/login',                   [AuthController::class, 'adminLogin']);

    $router->post('forum_threads/{thread}/like',    [ForumThreadLikeController::class, 'like']);
    $router->delete('forum_threads/{thread}/like',  [ForumThreadLikeController::class, 'unlike']);

    // HEALTHCHECK
    $router->get('/llm/health',                     [ChatbotController::class, 'health']);
    $router->get('/llm/topic',                      [QuestionTopicController::class, 'generate']);
    $router->get('/llm/question',                   [QuestionController::class, 'generateRandom']);
    
    // FRONTEND ROUTES
    $router->post('/chatbot',                       [ChatbotController::class, 'chat']);

    $router->get('/front/comments/{id}',            [ForumThreadController::class, 'showComments']);
    $router->post('/front/register',                [UserController::class, 'frontRegister']);
    $router->post('/front/contacts',                [ContactController::class, 'frontStore']);
    $router->get('/front/post/category',            [ForumCategoryController::class, 'getAll']);
    $router->post('/front/post/create',             [ForumThreadController::class, 'frontStore']);
    $router->post('/front/post/comment',            [ForumPostController::class, 'frontStore']);

    $router->get('/params/questions',               [QuestionController::class, 'params']);
});

Route::redirect('/', '/backend');
