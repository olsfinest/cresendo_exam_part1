import Head from 'next/head'
import styles from '../styles/Home.module.css'
import SingleRecipe from '../components/SingleRecipe';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Single Recipe</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"></link>
      </Head>


      <main className={styles.main}>
    
      <div>
        
            <SingleRecipe />
      </div>

     
      </main>


    </div>
  )
}
