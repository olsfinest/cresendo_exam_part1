import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Recipe from '../components/Recipe';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Exam</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"></link>
      </Head>

      <main className={styles.main}>

    
      <div className="container">
        <div className="row">

        <div className="col-sm-12">
          <h1 class="main-list">Main list</h1>
        </div>

          <div className="col-sm-12">
            <Recipe />
          </div>

         
          
        </div>
      </div>
     
      </main>


    </div>
  )
}
