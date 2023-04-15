import {
  LineStyle,
  PermIdentity,
  // eslint-disable-next-line
  DynamicFeed,
  // eslint-disable-next-line
  Report,
} from "@material-ui/icons";
import { NavLink as Link } from "react-router-dom";
import EqualizerIcon from '@mui/icons-material/Equalizer';
import BookIcon from "@mui/icons-material/Book";
// import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import CategoryIcon from "@mui/icons-material/Category";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/staff/" className="link">
              {
                (({isActive}) => <li className={`sidebarListItem ${isActive=== true ? "active" : ""}`}>
                  <LineStyle className="sidebarIcon" />
                    Home
                </li>)
              }
            
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Yêu cầu</h3>
          <ul className="sidebarList">
            <Link to="/staff/request" className="link">
                {
                  (({isActive}) => <li className={`sidebarListItem ${isActive=== true ? "active" : ""}`}>
                  <EqualizerIcon className="sidebarIcon" />
                    Mượn / trả sách
                </li>)
                }
              
            </Link>
            
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Phản hồi</h3>
          <ul className="sidebarList">
            <Link to="/staff/feedback/message" className="link">
              {
                (({isActive}) => <li className={`sidebarListItem ${isActive=== true ? "active" : ""}`}>
                  <PermIdentity className="sidebarIcon" />
                    Tin nhắn
                </li>)
              }
            </Link>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Manage book</h3>
          <ul className="sidebarList">
            <Link to="/staff/books" className="link">
              {({ isActive }) => (
                <li
                  className={`sidebarListItem ${
                    isActive === true ? "active" : ""
                  }`}
                >
                  <BookIcon className="sidebarIcon" />
                  Books
                </li>
              )}
            </Link>
            <li className="sidebarListItem">
              <Link to="/staff/category" className="link">
                {({ isActive }) => (
                  <li
                    className={`sidebarListItem ${
                      isActive === true ? "active" : ""
                    }`}
                  >
                    <CategoryIcon className="sidebarIcon" />
                    Categories
                  </li>
                )}
              </Link>
            </li>
          </ul>
        </div>
        {/* <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quản lý sách</h3>
          <ul className="sidebarList">
            <li className="sidebarListItem">
              <BookIcon className="sidebarIcon" />
                Sách
            </li>
            <li className="sidebarListItem">
              <AddIcon className="sidebarIcon" />
                Thêm sách
            </li>
            <li className="sidebarListItem">
              <Link to="/admin/category" className="link">
                {
                  (({isActive}) => <li className={`sidebarListItem ${isActive=== true ? "active" : ""}`}>
                  <CategoryIcon className="sidebarIcon" />
                    Danh mục
                  </li>)
                }
              </Link>
              
            </li>
          </ul>
        </div> */}
      </div>
    </div>
  );
}
