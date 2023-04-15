import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DetailProfile from './DetailProfile';

export default function WidgetSm(props) {
  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New users</span>
      <ul className="widgetSmList">
        {props?.data?.map((item, key) => (
          <li key={key} className="widgetSmListItem">
            <AccountCircleIcon style={{width: 40, height: 40}} />
            <div className="widgetSmUser">
              <span className="widgetSmUsername">{item?.user_name}</span>
              <span className="widgetSmUserTitle">{item?.user_phone}</span>
            </div>
            <DetailProfile {...item} />
          </li>
        ))}
      </ul>
    </div>
  );
}
