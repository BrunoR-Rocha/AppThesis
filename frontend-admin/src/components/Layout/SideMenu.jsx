import * as React from "react";
import { useState } from "react";
import {
  Menu,
  MenuItemLink
} from "react-admin";
import SubMenu from "./SideBarSubMenu";
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PeopleIcon from '@mui/icons-material/People';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import LiveHelpIcon from '@mui/icons-material/LiveHelp';
import FeedIcon from '@mui/icons-material/Feed';
import ArticleIcon from '@mui/icons-material/Article';
import ForumIcon from '@mui/icons-material/Forum';
import CategoryIcon from '@mui/icons-material/Category';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import ThreePIcon from '@mui/icons-material/ThreeP';
import MailIcon from '@mui/icons-material/Mail';
import PermDataSettingIcon from '@mui/icons-material/PermDataSetting';
import QuizIcon from '@mui/icons-material/Quiz';
import TopicIcon from '@mui/icons-material/Topic';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';

const SideMenu = (props) => {
  const [forums, setForums] = useState(true);
  const [quizzes, setQuizzes] = useState(true);
  const [libraries, setLibraries] = useState(true);
  const [adminAccess, setAdminAccess] = useState(true);

  return (
      <Menu {...props}>

        <MenuItemLink
          to="/contacts"
          primaryText="Contacts"
          leftIcon={<ContactSupportIcon />}
        />

        <MenuItemLink
          to="/faqs"
          primaryText="FAQs"
          leftIcon={<LiveHelpIcon />}
        />

        <MenuItemLink
          to="/news"
          primaryText="News"
          leftIcon={<FeedIcon />}
        />

        <MenuItemLink
          to="/journals"
          primaryText="Journals"
          leftIcon={<ArticleIcon />}
        />

        <SubMenu
          handleToggle={() => setForums(!forums)}
          isOpen={forums}
          name="Forums"
          dense={true}
          icon={<ForumIcon />}
        >
          <MenuItemLink
            to="/forum_posts"
            primaryText="Posts"
            leftIcon={<ThreePIcon />}
          />

          <MenuItemLink
            to="/forum_threads"
            primaryText="Threads"
            leftIcon={<ChatBubbleIcon />}
          />

          <MenuItemLink
            to="/forum_categories"
            primaryText="Categories"
            leftIcon={<CategoryIcon />}
          />

        </SubMenu>

        <SubMenu
          handleToggle={() => setQuizzes(!quizzes)}
          isOpen={quizzes}
          name="Quizzes"
          dense={true}
          icon={<QuizIcon />}
        >
          <MenuItemLink
            to="/quizzes"
            primaryText="Quizzes"
            leftIcon={<ChatBubbleIcon />}
          />

          <MenuItemLink
            to="/questions"
            primaryText="Questions"
            leftIcon={<ChatBubbleIcon />}
          />

          <MenuItemLink
            to="/question_options"
            primaryText="Question Options"
            leftIcon={<TopicIcon />}
          />

          <MenuItemLink
            to="/question_topics"
            primaryText="Question Topics"
            leftIcon={<TopicIcon />}
          />

          <MenuItemLink
            to="/question_types"
            primaryText="Question Types"
            leftIcon={<ChatBubbleIcon />}
          />

        </SubMenu>

        <SubMenu
          handleToggle={() => setLibraries(!libraries)}
          isOpen={libraries}
          name="Library"
          dense={true}
          icon={<LibraryBooksIcon />}
        >
            <MenuItemLink
              to="/library_pages"
              primaryText="Library Pages"
              leftIcon={<ArticleIcon />}
            />

            <MenuItemLink
              to="/library_page_modules"
              primaryText="Library Page Modules"
              leftIcon={<ArticleIcon />}
            />

        </SubMenu>

        <SubMenu
          handleToggle={() => setAdminAccess(!adminAccess)}
          isOpen={adminAccess}
          name="Admin Management"
          dense={true}
          icon={<LockPersonIcon />}
        >
            <MenuItemLink
              to="/users"
              primaryText="Users"
              leftIcon={<PeopleIcon />}
            />

            <MenuItemLink
              to="/mail_templates"
              primaryText="Mail Templates"
              leftIcon={<MailIcon />}
            />
          
            <MenuItemLink
              to="/sys_configs"
              primaryText="System Configs"
              leftIcon={<PermDataSettingIcon />}
            />
        </SubMenu>
      </Menu>
  );
};
export default SideMenu;
