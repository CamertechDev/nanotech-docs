import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './index.module.css';

const projects = [
  {
    number: '01',
    category: 'Pilotage & gestion',
    title: 'GestionBois ERP',
    description: 'Documentation du système ERP GestionBois.',
    to: '/erp/intro',
  },
  {
    number: '02',
    category: 'Plateforme clinique',
    title: 'Cabineris',
    description: 'Documentation du projet Cabineris.',
    to: '/cabineris/intro',
  },
  {
    number: '03',
    category: 'Facturation',
    title: 'Sysfact-Web',
    description: 'Documentation du projet Sysfact-Web.',
    to: '/sysfact/intro',
  },
  {
    number: '04',
    category: 'Voix & terrain',
    title: 'ArtDevis',
    description: 'Application métier devis vocal pour artisans plombiers.',
    to: '/artdevis/intro',
  },
];

function ProjectCard({number, category, title, description, to}) {
  return (
    <Link to={to} className={styles.projectCard} aria-label={`Ouvrir la documentation ${title}`}>
      <span className={styles.projectNumber}>{number}</span>
      <div className={styles.projectContent}>
        <span className={styles.projectCategory}>{category}</span>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
      <span className={styles.projectArrow} aria-hidden="true">-&gt;</span>
    </Link>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description="Documentation centralisée des projets NanoTech">
      <header className={styles.heroBanner}>
        <div className={clsx('container', styles.heroInner)}>
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}>Exfob / Documentation interne</p>
            <Heading as="h1">{siteConfig.title}</Heading>
            <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
            <p className={styles.heroIntro}>
              Un point d'entrée unique pour comprendre, construire et faire évoluer nos produits.
            </p>
          </div>
          <div className={styles.heroSignal} aria-label="Quatre projets documentés">
            <strong>04</strong>
            <span>projets<br />documentés</span>
          </div>
        </div>
      </header>
      <main>
        <section className={styles.projectsSection} aria-labelledby="projects-heading">
          <div className={clsx('container', styles.projectsInner)}>
            <div className={styles.sectionHeading}>
              <div>
                <p className={styles.eyebrow}>Explorer les produits</p>
                <Heading as="h2" id="projects-heading">Choisissez votre espace de travail</Heading>
              </div>
              <p className={styles.sectionNote}>Architecture, métier et exploitation réunis au même endroit.</p>
            </div>
            <div className={styles.projectGrid}>
              {projects.map((props) => (
                <ProjectCard key={props.to} {...props} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}
