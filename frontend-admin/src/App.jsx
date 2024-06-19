import {
  Admin,
  Resource
} from "react-admin";
import appDataProvider from "./providers/dataProvider";
import authProvider from "./providers/authProvider";
import { Login } from "./pages/Login";
import MyLayout from "./components/Layout/Layout";
import { SidebarProvider } from "./components/Layout/SidebarContext";

import { UserCreate, UserEdit, UserList, UserShow } from "./resources/user";
import { FaqCreate, FaqEdit, FaqList, FaqShow } from "./resources/faqs";
import { NewsCreate, NewsEdit, NewsList, NewsShow } from "./resources/news";
import { ContactCreate, ContactList, ContactShow } from "./resources/contacts";
import { MailTemplateCreate, MailTemplateEdit, MailTemplateList, MailTemplateShow } from "./resources/mail_templates";
import { ForumCategoryCreate, ForumCategoryEdit, ForumCategoryList, ForumCategoryShow } from "./resources/forum/forum_categories";
import { ForumThreadCreate, ForumThreadEdit, ForumThreadList, ForumThreadShow } from "./resources/forum/forum_threads";
import { ForumPostCreate, ForumPostEdit, ForumPostList, ForumPostShow } from "./resources/forum/forum_posts";
import { SysConfigCreate, SysConfigEdit, SysConfigList, SysConfigShow } from "./resources/sys_configs";
import { JournalCreate, JournalEdit, JournalList, JournalShow } from "./resources/journals";
import { QuestionTopicCreate, QuestionTopicEdit, QuestionTopicList, QuestionTopicShow } from "./resources/question_topics";
import { QuestionTypeCreate, QuestionTypeEdit, QuestionTypeList, QuestionTypeShow } from "./resources/question_types";
import { QuestionCreate, QuestionEdit, QuestionList, QuestionShow } from "./resources/questions";


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
                name="mail_templates"
                list={MailTemplateList}
                show={MailTemplateShow}
                edit={MailTemplateEdit}
                create={MailTemplateCreate}
            />
            <Resource
                name="sys_configs"
                list={SysConfigList}
                show={SysConfigShow}
                edit={SysConfigEdit}
                create={SysConfigCreate}
            />
        </Admin>
    </SidebarProvider>
  
);
