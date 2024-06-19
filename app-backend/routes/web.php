<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\FaqController;
use App\Http\Controllers\ForumCategoryController;
use App\Http\Controllers\ForumPostController;
use App\Http\Controllers\ForumThreadController;
use App\Http\Controllers\JournalController;
use App\Http\Controllers\MailTemplateController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\QuestionController;
use App\Http\Controllers\QuestionOptionController;
use App\Http\Controllers\QuestionTopicController;
use App\Http\Controllers\QuestionTypeController;
use App\Http\Controllers\SysConfigController;
use App\Http\Controllers\UserController;
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

    Route::get('storage/images/{filename}', [MediaController::class, 'showImage']);

    $router->get('/journals/autoUpdate', [JournalController::class, 'autoUpdateJournalData']);

    $router->post('questions/{id}', [QuestionController::class, 'update']);

    $router->resources([
        'users'             => UserController::class,
        'faqs'              => FaqController::class,
        'news'              => NewsController::class,
        'contacts'          => ContactController::class,
        'mail_templates'    => MailTemplateController::class,
        'forum_categories'  => ForumCategoryController::class, 
        'forum_threads'     => ForumThreadController::class,
        'forum_posts'       => ForumPostController::class,
        'sys_configs'       => SysConfigController::class,
        'journals'          => JournalController::class,
        'question_topics'   => QuestionTopicController::class,
        'question_types'    => QuestionTypeController::class,
        'questions'         => QuestionController::class,
        'question_options'  => QuestionOptionController::class,
    ]);

    $router->post('/admin/login', [AuthController::class , 'adminLogin']);

    
});

Route::redirect('/', '/backend');
