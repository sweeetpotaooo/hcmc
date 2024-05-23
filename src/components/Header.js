import styles from "./Header.scss";
import store from "../Redux/store";

const Header = () => {
  const handleLogout = async () => {
    try {
      await dispatch(logOutUser({ userToken }));
      navigator("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.header}>
      <div className={styles.headerChild}>
        <div className={styles.div}>
          <div className={styles.div1}>
            <div className={styles.div2}></div>
            {isLoggedIn && <div className={styles.div3}>마이페이지</div>}
            <div className={styles.div4}>룸메이트 구해요</div>
          </div>
        </div>
        <b className={styles.kummate}>KUMMATE</b>
        <img className={styles.noticeIcon} alt="" src={Notice} />
      </div>
    </div>
  );
};

export default Header;
