import { Admin, Resource } from "react-admin";
import appDataProvider from "./providers/dataProvider";
import authProvider from "./providers/authProvider";
import { Login } from "./pages/Login";
import MyLayout from "./components/Layout/Layout";
import { SidebarProvider } from "./components/Layout/SidebarContext";

import { UserCreate, UserEdit, UserList, UserShow } from "./resources/user";
import { FaqCreate, FaqEdit, FaqList, FaqShow } from "./resources/faqs";
import { NewsCreate, NewsEdit, NewsList, NewsShow } from "./resources/news";
import { ContactCreate, ContactList, ContactShow } from "./resources/contacts";
import {
  MailTemplateCreate,
  MailTemplateEdit,
  MailTemplateList,
  MailTemplateShow,
} from "./resources/mail_templates";
import {
  ForumCategoryCreate,
  ForumCategoryEdit,
  ForumCategoryList,
  ForumCategoryShow,
} from "./resources/forum/forum_categories";
import {
  ForumThreadCreate,
  ForumThreadEdit,
  ForumThreadList,
  ForumThreadShow,
} from "./resources/forum/forum_threads";
import {
  ForumPostCreate,
  ForumPostEdit,
  ForumPostList,
  ForumPostShow,
} from "./resources/forum/forum_posts";
import {
  SysConfigCreate,
  SysConfigEdit,
  SysConfigList,
  SysConfigShow,
} from "./resources/sys_configs";
import {
  StaticCreate,
  StaticEdit,
  StaticList,
  StaticShow,
} from "./resources/statics";
import {
  JournalCreate,
  JournalEdit,
  JournalList,
  JournalShow,
} from "./resources/journals";
import {
  QuestionOptionCreate,
  QuestionOptionEdit,
  QuestionOptionList,
  QuestionOptionShow,
} from "./resources/question_options";
import {
  QuestionTopicCreate,
  QuestionTopicEdit,
  QuestionTopicList,
  QuestionTopicShow,
} from "./resources/question_topics";
import {
  QuestionTypeCreate,
  QuestionTypeEdit,
  QuestionTypeList,
  QuestionTypeShow,
} from "./resources/question_types";
import {
  QuestionCreate,
  QuestionEdit,
  QuestionList,
  QuestionShow,
} from "./resources/questions";
import { QuizCreate, QuizEdit, QuizList, QuizShow } from "./resources/quizzes";
import {
  LibraryPageCreate,
  LibraryPageEdit,
  LibraryPageList,
  LibraryPageShow,
} from "./resources/library";
import {
  LibraryPageModuleCreate,
  LibraryPageModuleEdit,
  LibraryPageModuleList,
  LibraryPageModuleShow,
} from "./resources/library_modules";
import {
  CourseContentTypeEdit,
  CourseContentTypeShow,
  CourseContentTypeList,
  CourseContentTypeCreate,
} from "./resources/course_content_types";
import {
  CourseContentEdit,
  CourseContentShow,
  CourseContentList,
  CourseContentCreate,
} from "./resources/course_contents";
import {
  CourseCreate,
  CourseEdit,
  CourseList,
  CourseShow,
} from "./resources/courses";
import {
  LessonCreate,
  LessonEdit,
  LessonList,
  LessonShow,
} from "./resources/lessons";
import {
  CourseInteractiveElementCreate,
  CourseInteractiveElementEdit,
  CourseInteractiveElementList,
  CourseInteractiveElementShow,
} from "./resources/course_interactive_elements";

import {
  QuestionnaireCreate,
  QuestionnaireEdit,
  QuestionnaireList,
  QuestionnaireShow,
} from "./resources/questionnaires";

import {
  QuestionnaireQuestionCreate,
  QuestionnaireQuestionEdit,
  QuestionnaireQuestionList,
  QuestionnaireQuestionShow,
} from "./resources/questionnaire_questions";

import {
  QuestionnaireSubmissionList,
  QuestionnaireSubmissionShow,
} from "./resources/questionnaire_submissions";

import {
  QuestionnaireAnswerList,
  QuestionnaireAnswerShow,
} from "./resources/questionnaire_answers";
import { ReportList, ReportShow } from "./resources/reports";

export const App = () => (
  <SidebarProvider>
    <Admin
      dataProvider={appDataProvider}
      authProvider={authProvider}
      loginPage={Login}
      layout={MyLayout}
    >
      <Resource
        name="users"
        list={UserList}
        show={UserShow}
        edit={UserEdit}
        create={UserCreate}
      />
      <Resource
        name="faqs"
        list={FaqList}
        show={FaqShow}
        edit={FaqEdit}
        create={FaqCreate}
      />
      <Resource
        name="news"
        list={NewsList}
        show={NewsShow}
        edit={NewsEdit}
        create={NewsCreate}
      />
      <Resource
        name="contacts"
        list={ContactList}
        show={ContactShow}
        create={ContactCreate}
      />

      <Resource
        name="journals"
        list={JournalList}
        show={JournalShow}
        edit={JournalEdit}
        create={JournalCreate}
      />

      <Resource
        name="forum_categories"
        list={ForumCategoryList}
        show={ForumCategoryShow}
        edit={ForumCategoryEdit}
        create={ForumCategoryCreate}
      />
      <Resource
        name="forum_threads"
        list={ForumThreadList}
        show={ForumThreadShow}
        edit={ForumThreadEdit}
        create={ForumThreadCreate}
      />
      <Resource
        name="forum_posts"
        list={ForumPostList}
        show={ForumPostShow}
        edit={ForumPostEdit}
        create={ForumPostCreate}
      />
      <Resource
        name="question_topics"
        list={QuestionTopicList}
        show={QuestionTopicShow}
        edit={QuestionTopicEdit}
        create={QuestionTopicCreate}
      />

      <Resource
        name="question_options"
        list={QuestionOptionList}
        show={QuestionOptionShow}
        edit={QuestionOptionEdit}
        create={QuestionOptionCreate}
      />

      <Resource
        name="question_types"
        list={QuestionTypeList}
        show={QuestionTypeShow}
        edit={QuestionTypeEdit}
        create={QuestionTypeCreate}
      />

      <Resource
        name="questions"
        list={QuestionList}
        show={QuestionShow}
        edit={QuestionEdit}
        create={QuestionCreate}
      />

      <Resource
        name="quizzes"
        list={QuizList}
        show={QuizShow}
        edit={QuizEdit}
        create={QuizCreate}
      />

      <Resource
        name="mail_templates"
        list={MailTemplateList}
        show={MailTemplateShow}
        edit={MailTemplateEdit}
        create={MailTemplateCreate}
      />

      <Resource
        name="statics"
        list={StaticList}
        show={StaticShow}
        edit={StaticEdit}
        create={StaticCreate}
      />

      <Resource
        name="sys_configs"
        list={SysConfigList}
        show={SysConfigShow}
        edit={SysConfigEdit}
        create={SysConfigCreate}
      />

      <Resource
        name="library_pages"
        list={LibraryPageList}
        show={LibraryPageShow}
        edit={LibraryPageEdit}
        create={LibraryPageCreate}
      />

      <Resource
        name="library_page_modules"
        list={LibraryPageModuleList}
        show={LibraryPageModuleShow}
        edit={LibraryPageModuleEdit}
        create={LibraryPageModuleCreate}
      />

      <Resource
        name="courses"
        list={CourseList}
        show={CourseShow}
        edit={CourseEdit}
        create={CourseCreate}
      />

      <Resource
        name="lessons"
        list={LessonList}
        show={LessonShow}
        edit={LessonEdit}
        create={LessonCreate}
      />

      <Resource
        name="course_content_types"
        list={CourseContentTypeList}
        show={CourseContentTypeShow}
        edit={CourseContentTypeEdit}
        create={CourseContentTypeCreate}
      />

      <Resource
        name="course_contents"
        list={CourseContentList}
        show={CourseContentShow}
        edit={CourseContentEdit}
        create={CourseContentCreate}
      />

      <Resource
        name="course_interactive_elements"
        list={CourseInteractiveElementList}
        show={CourseInteractiveElementShow}
        edit={CourseInteractiveElementEdit}
        create={CourseInteractiveElementCreate}
      />

      <Resource
        name="questionnaires"
        list={QuestionnaireList}
        show={QuestionnaireShow}
        edit={QuestionnaireEdit}
        create={QuestionnaireCreate}
      />

      <Resource
        name="questionnaires_questions"
        list={QuestionnaireQuestionList}
        show={QuestionnaireQuestionShow}
        edit={QuestionnaireQuestionEdit}
        create={QuestionnaireQuestionCreate}
      />

      <Resource
        name="questionnaires_submissions"
        list={QuestionnaireSubmissionList}
        show={QuestionnaireSubmissionShow}
      />

      <Resource
        name="questionnaires_answers"
        list={QuestionnaireSubmissionList}
        show={QuestionnaireSubmissionShow}
      />

      <Resource
        name="reports"
        list={ReportList}
        show={ReportShow}
      />

    </Admin>
  </SidebarProvider>
);
