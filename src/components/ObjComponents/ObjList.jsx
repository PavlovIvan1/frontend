import styles from './Obj.module.scss';

export function ObjList({ title, description, img, width }) {
  return (
    <>
      <div className={styles.title}>
        <h2 className={styles.ref_title}>{title}</h2>
        <p>{description}</p>
      </div>
      <div className={styles.Fr_link}>
        <div className={styles.Fr_reward}>
          <img src={img} className={styles.person} alt="" width={width} />
          <div className={styles.obj_text}>
            <h4>Text</h4>
            <p>About abou t abo u t about</p>
          </div>
        </div>
        <div className={styles.Fr_reward}>
          <img src={img} className={styles.person} alt="" width={width} />
          <div className={styles.obj_text}>
            <h4>Text</h4>
            <p>About abou t abo u t about</p>
          </div>
        </div>
        <div className={styles.Fr_reward}>
          <img src={img} className={styles.person} alt="" width={width} />
          <div className={styles.obj_text}>
            <h4>Text</h4>
            <p>About abou t abo u t about</p>
          </div>
        </div>
      </div>
    </>
  );
}
