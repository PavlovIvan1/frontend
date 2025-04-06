import styles from './components.module.scss';

export function Title({ title, description }) {
  return (
    <>
      <div className={styles.title}>
        <h2 className={styles.ref_title}>{title}</h2>
        <p>{description}</p>
      </div>
    </>
  );
}
