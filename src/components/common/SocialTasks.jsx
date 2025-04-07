import styles from '../pages/Frens/frens.module.scss'

export function SocialTasks({ description, title, img }) {
  return (
    <>
      <div className={styles.title}>
        <h2 className={styles.ref_title}>{title}</h2>
        <p>{description}</p>
      </div>
      <div className={styles.Fr_link}>
        <div className={styles.Fr_reward}>
          <img src={img} className={styles.person} alt="" width={50} />
          <div className={styles.obj_text}>
            <h4>Text</h4>
            <p>About abou t abo u t about</p>
          </div>
        </div>
        <div className={styles.Fr_reward}>
          <img src={img} className={styles.person} alt="" width={50} />
          <div className={styles.obj_text}>
            <h4>Text</h4>
            <p>About abou t abo u t about</p>
          </div>
        </div>
        <div className={styles.Fr_reward}>
          <img src={img} className={styles.person} alt="" width={50} />
          <div className={styles.obj_text}>
            <h4>Text</h4>
            <p>About abou t abo u t about</p>
          </div>
        </div>
      </div>
      <button className="button-gradient">Button</button>
    </>
  );
}
