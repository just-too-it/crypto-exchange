import { Form } from 'components/Form';

import styles from './Home.module.scss';

export const Home = () => {
  return (
    <main>
      <h1 className={styles.title}>Crypto Exchange</h1>
      <h2 className={styles.subtitle}>Exchange fast and easy</h2>
      <Form />
    </main>
  );
};
